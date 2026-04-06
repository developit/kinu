import {brotliCompressSync, constants, gzipSync} from 'node:zlib';
import {mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import {resolve, relative} from 'node:path';
import {build} from 'vite';

const rootDir = process.cwd();
const outputRoot = resolve(rootDir, 'benchmarks/size/.tmp');
const resultsDir = resolve(rootDir, 'benchmarks/size/results');

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

async function runScenario(scenario) {
  const outDir = resolve(outputRoot, scenario.id);

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
        entry: scenario.entry,
        formats: ['es'],
        fileName: 'bundle',
      },
      rollupOptions: {
        external: ['preact', 'preact/hooks', 'preact/jsx-runtime'],
      },
    },
  });

  const files = (await listFiles(outDir)).filter((file) =>
    /\.(js|css)$/.test(file),
  );

  const assetSizes = [];

  for (const file of files) {
    const content = await readFile(file);
    assetSizes.push({
      file: relative(rootDir, file),
      ...bundleSizes(content),
    });
  }

  return assetSizes.reduce(
    (total, asset) => ({
      raw: total.raw + asset.raw,
      gzip: total.gzip + asset.gzip,
      brotli: total.brotli + asset.brotli,
    }),
    {raw: 0, gzip: 0, brotli: 0},
  );
}

function formatTable(results) {
  const header = [
    '| Scenario | Raw (KiB) | Gzip (KiB) | Brotli (KiB) |',
    '| --- | ---: | ---: | ---: |',
  ];

  const rows = results.map((result) =>
    `| ${result.label} | ${toKiB(result.raw)} | ${toKiB(result.gzip)} | ${toKiB(result.brotli)} |`,
  );

  return [...header, ...rows].join('\n');
}

async function main() {
  await rm(outputRoot, {recursive: true, force: true});
  await mkdir(outputRoot, {recursive: true});
  await mkdir(resultsDir, {recursive: true});

  const results = [];
  for (const scenario of scenarios) {
    const sizes = await runScenario(scenario);
    results.push({
      id: scenario.id,
      label: scenario.label,
      ...sizes,
    });
  }

  const generatedAt = new Date().toISOString();
  const payload = {generatedAt, results};

  await writeFile(
    resolve(resultsDir, 'latest.json'),
    `${JSON.stringify(payload, null, 2)}\n`,
    'utf8',
  );

  const table = formatTable(results);
  const report = [`# Kinu size benchmarks`, '', `Generated at: ${generatedAt}`, '', table, ''].join('\n');

  await writeFile(resolve(resultsDir, 'latest.md'), report, 'utf8');

  console.log(report);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
