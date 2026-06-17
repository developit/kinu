import {brotliCompressSync, constants, gzipSync} from 'node:zlib';
import {mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import {resolve, relative} from 'node:path';
import {build} from 'vite';

const rootDir = process.cwd();
const outputRoot = resolve(rootDir, 'benchmarks/size/.tmp');
const casesDir = resolve(outputRoot, 'cases');
const resultsDir = resolve(rootDir, 'benchmarks/size/results');
const componentsRoot = resolve(rootDir, 'src/components');

// Per-component builds write to isolated outDirs, so they don't collide;
// concurrency just trims wall-clock time. `BENCH_QUICK=1 pnpm bench:size`
// (or `--quick`) skips the 60+ per-component builds for fast local iteration —
// CI runs the full matrix so per-component size regressions surface on PRs.
const COMPONENT_CONCURRENCY = Number(process.env.BENCH_CONCURRENCY) || 4;
const QUICK = process.env.BENCH_QUICK === '1' || process.argv.includes('--quick');

const scenarios = [
  {
    id: 'one-component',
    label: 'One component (Button)',
    entry: resolve(rootDir, 'benchmarks/size/cases/one-component.ts'),
  },
  {
    id: 'few-components',
    label: 'A few components (Button + Input + Dialog + Popover + Tabs)',
    entry: resolve(rootDir, 'benchmarks/size/cases/few-components.ts'),
  },
  {
    id: 'nearly-all-components',
    label: 'Nearly all components (namespace import)',
    entry: resolve(rootDir, 'benchmarks/size/cases/nearly-all-components.ts'),
  },
];

async function listFiles(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  const files = [];

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
      continue;
    }
    files.push(fullPath);
  }

  return files;
}

function toKiB(bytes) {
  return Number((bytes / 1024).toFixed(2));
}

function bundleSizes(buffer) {
  return {
    raw: buffer.byteLength,
    gzip: gzipSync(buffer, {level: 9}).byteLength,
    brotli: brotliCompressSync(buffer, {
      params: {[constants.BROTLI_PARAM_QUALITY]: 11},
    }).byteLength,
  };
}

const emptyGroup = () => ({raw: 0, gzip: 0, brotli: 0});

function addInto(group, sizes) {
  group.raw += sizes.raw;
  group.gzip += sizes.gzip;
  group.brotli += sizes.brotli;
}

async function buildEntry(entry, outDir) {
  await build({
    configFile: false,
    logLevel: 'silent',
    build: {
      outDir,
      emptyOutDir: true,
      minify: 'esbuild',
      cssMinify: true,
      target: 'es2019',
      lib: {
        entry,
        formats: ['es'],
        fileName: 'bundle',
      },
      rollupOptions: {
        external: ['preact', 'preact/hooks', 'preact/jsx-runtime'],
      },
    },
  });
}

// Measure JS and CSS outputs separately so reports (and the CI size action)
// can attribute the runtime cost and the style cost independently.
async function measureOutput(outDir) {
  const files = (await listFiles(outDir)).filter((file) =>
    /\.(js|css)$/.test(file),
  );

  const js = emptyGroup();
  const css = emptyGroup();

  for (const file of files) {
    const sizes = bundleSizes(await readFile(file));
    addInto(file.endsWith('.css') ? css : js, sizes);
  }

  return {
    js,
    css,
    total: {
      raw: js.raw + css.raw,
      gzip: js.gzip + css.gzip,
      brotli: js.brotli + css.brotli,
    },
  };
}

async function runScenario(scenario) {
  const outDir = resolve(outputRoot, scenario.id);
  await buildEntry(scenario.entry, outDir);
  return measureOutput(outDir);
}

async function listComponentDirs() {
  const entries = await readdir(componentsRoot, {withFileTypes: true});
  const names = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    // Skip folders without an importable entry (e.g. `toast`, whose
    // implementation lives in src/lib and is only re-exported here).
    const files = await readdir(resolve(componentsRoot, entry.name));
    if (files.includes('index.ts') || files.includes('index.tsx')) {
      names.push(entry.name);
    }
  }

  return names.sort();
}

// Generate a tiny entry that pulls in a single component (and the side-effect
// `style.css` its index imports), mirroring the `void` idiom of the
// hand-written case files.
async function writeComponentCase(name) {
  const entry = resolve(casesDir, `${name}.ts`);
  let importPath = relative(casesDir, resolve(componentsRoot, name)).split('\\').join('/');
  if (!importPath.startsWith('.')) importPath = `./${importPath}`;
  await writeFile(
    entry,
    `import * as Component from '${importPath}';\n\nvoid Component;\n`,
    'utf8',
  );
  return entry;
}

async function runComponent(name) {
  const entry = await writeComponentCase(name);
  const outDir = resolve(outputRoot, 'components', name);
  await buildEntry(entry, outDir);
  const sizes = await measureOutput(outDir);
  return {id: name, label: name, ...sizes};
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  }

  await Promise.all(
    Array.from({length: Math.min(limit, items.length)}, worker),
  );

  return results;
}

function splitTable(firstColumn, rows) {
  const header = [
    `| ${firstColumn} | JS raw (KiB) | JS gzip (KiB) | CSS raw (KiB) | CSS gzip (KiB) | Total gzip (KiB) |`,
    '| --- | ---: | ---: | ---: | ---: | ---: |',
  ];

  const body = rows.map(
    (row) =>
      `| ${row.label} | ${toKiB(row.js.raw)} | ${toKiB(row.js.gzip)} | ${toKiB(row.css.raw)} | ${toKiB(row.css.gzip)} | ${toKiB(row.total.gzip)} |`,
  );

  return [...header, ...body].join('\n');
}

async function main() {
  await rm(outputRoot, {recursive: true, force: true});
  await mkdir(outputRoot, {recursive: true});
  await mkdir(casesDir, {recursive: true});
  await mkdir(resultsDir, {recursive: true});

  const results = [];
  for (const scenario of scenarios) {
    const sizes = await runScenario(scenario);
    results.push({id: scenario.id, label: scenario.label, ...sizes});
  }

  let components = [];
  if (!QUICK) {
    const names = await listComponentDirs();
    components = await mapWithConcurrency(
      names,
      COMPONENT_CONCURRENCY,
      runComponent,
    );
    components.sort((a, b) => b.total.gzip - a.total.gzip);
  }

  const generatedAt = new Date().toISOString();
  const payload = {generatedAt, results, components};

  await writeFile(
    resolve(resultsDir, 'latest.json'),
    `${JSON.stringify(payload, null, 2)}\n`,
    'utf8',
  );

  const sections = [
    '# Kinu size benchmarks',
    '',
    `Generated at: ${generatedAt}`,
    '',
    '## Aggregate scenarios',
    '',
    splitTable('Scenario', results),
    '',
  ];

  if (!QUICK) {
    sections.push(
      '## Per-component (isolated import)',
      '',
      'Each row is one component built in isolation — its JS plus the CSS its `style.css` pulls in. Use it to attribute size regressions and to check a component against its budget in `ROADMAP.md`. Run with `BENCH_QUICK=1` to skip this matrix.',
      '',
      splitTable('Component', components),
      '',
    );
  }

  const report = sections.join('\n');
  await writeFile(resolve(resultsDir, 'latest.md'), report, 'utf8');

  console.log(report);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
