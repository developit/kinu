import {brotliCompressSync, constants, gzipSync} from 'node:zlib';
import {mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {build} from 'vite';

const rootDir = process.cwd();
const outputRoot = resolve(rootDir, 'benchmarks/size/.tmp-components');
const entriesDir = resolve(rootDir, 'benchmarks/size/.entries');
const resultsDir = resolve(rootDir, 'benchmarks/size/results');
const sourceIndex = resolve(rootDir, 'src/index.ts');

const EXTERNALS = ['preact', 'preact/hooks', 'preact/jsx-runtime'];
const BASE_IMPORTS = "import '../../../src/base.css';\nimport '../../../src/lib/commands';\n";
const SHARED_COST_TOKENS = [
  'menu',
  'dialog',
  'popover',
  'listbox',
  'combobox',
  'drawer',
  'sheet',
  'sidebar',
  'tabs',
  'accordion',
  'collapsible',
  'select',
];

async function listFiles(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  const files = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
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

function normalizeGroupId(path) {
  return path
    .replace(/^\.\//, '')
    .replace(/^components\//, '')
    .replace(/^lib\//, 'lib-')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/gi, '');
}

function parseGroups(indexSource) {
  const groups = new Map();
  const pattern = /export\s+\{([\s\S]*?)\}\s+from\s+'\.\/([^']+)'/gm;

  for (const match of indexSource.matchAll(pattern)) {
    const exports = match[1]
      .split(',')
      .map((item) => item.trim())
      .map((item) => item.replace(/\sas\s.+$/, '').trim())
      .filter(Boolean);

    if (exports.length === 0) continue;

    const modulePath = match[2];
    const id = normalizeGroupId(modulePath);
    groups.set(id, {id, modulePath, exports});
  }

  return [...groups.values()].sort((a, b) => a.id.localeCompare(b.id));
}

async function createEntry(id, body) {
  const entryPath = resolve(entriesDir, `${id}.ts`);
  await writeFile(entryPath, body, 'utf8');
  return entryPath;
}

async function runBuild(id, entry) {
  const outDir = resolve(outputRoot, id);

  const result = await build({
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
        external: EXTERNALS,
      },
    },
  });

  const files = (await listFiles(outDir)).filter((file) => /\.(js|css)$/.test(file));
  const totals = {raw: 0, gzip: 0, brotli: 0};

  for (let i = 0; i < files.length; i++) {
    const content = await readFile(files[i]);
    const sizes = bundleSizes(content);
    totals.raw += sizes.raw;
    totals.gzip += sizes.gzip;
    totals.brotli += sizes.brotli;
  }

  return {totals, moduleRendered: extractModuleRenderedBytes(result)};
}

function withDelta(total, base) {
  return {
    raw: total.raw,
    gzip: total.gzip,
    brotli: total.brotli,
    rawDelta: Math.max(0, total.raw - base.raw),
    gzipDelta: Math.max(0, total.gzip - base.gzip),
    brotliDelta: Math.max(0, total.brotli - base.brotli),
  };
}

function shouldAnalyzeShared(group) {
  for (let i = 0; i < SHARED_COST_TOKENS.length; i++) {
    if (group.id.includes(SHARED_COST_TOKENS[i])) return true;
  }
  return false;
}

function createCombinedEntryBody(groupA, groupB) {
  return `${BASE_IMPORTS}import { ${groupA.exports.join(', ')} } from '../../../src/${groupA.modulePath}';\nimport { ${groupB.exports.join(', ')} } from '../../../src/${groupB.modulePath}';\nconsole.log(${groupA.exports[0]}, ${groupB.exports[0]});\n`;
}

async function measureSharedCosts(candidates, sizeById, baseTotals) {
  const shared = [];

  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const groupA = candidates[i];
      const groupB = candidates[j];
      const id = `shared-${groupA.id}--${groupB.id}`;
      const entry = await createEntry(id, createCombinedEntryBody(groupA, groupB));
      const combinedBuild = await runBuild(id, entry);

      const combined = withDelta(combinedBuild.totals, baseTotals);
      const singleA = sizeById.get(groupA.id);
      const singleB = sizeById.get(groupB.id);
      const rawShared = Math.max(0, singleA.rawDelta + singleB.rawDelta - combined.rawDelta);
      const gzipShared = Math.max(0, singleA.gzipDelta + singleB.gzipDelta - combined.gzipDelta);

      shared.push({
        a: groupA.id,
        b: groupB.id,
        rawShared,
        gzipShared,
        combinedRawDelta: combined.rawDelta,
        combinedGzipDelta: combined.gzipDelta,
      });
    }
  }

  shared.sort((a, b) => b.gzipShared - a.gzipShared || b.rawShared - a.rawShared || `${a.a}-${a.b}`.localeCompare(`${b.a}-${b.b}`));
  return shared;
}

function formatSizeTable(base, results) {
  const header = [
    '| Component group | Exports | Raw bytes | Gzip bytes | Raw Δ bytes | Gzip Δ bytes |',
    '| --- | --- | ---: | ---: | ---: | ---: |',
    `| _base (base.css + commands)_ | — | ${base.raw} | ${base.gzip} | 0 | 0 |`,
  ];

  const rows = results.map((result) =>
    `| ${result.id} | ${result.exports.join(', ')} | ${result.raw} | ${result.gzip} | ${result.rawDelta} | ${result.gzipDelta} |`,
  );

  return [...header, ...rows].join('\n');
}

function formatSharedTable(sharedResults, limit = 25) {
  const header = [
    '| Group A | Group B | Estimated shared raw bytes | Estimated shared gzip bytes | Combined raw Δ bytes | Combined gzip Δ bytes |',
    '| --- | --- | ---: | ---: | ---: | ---: |',
  ];

  const rows = sharedResults.slice(0, limit).map((row) =>
    `| ${row.a} | ${row.b} | ${row.rawShared} | ${row.gzipShared} | ${row.combinedRawDelta} | ${row.combinedGzipDelta} |`,
  );

  return [...header, ...rows].join('\n');
}


function extractModuleRenderedBytes(bundle) {
  const totals = new Map();
  const outputs = Array.isArray(bundle) ? bundle : [bundle];
  const files = [];
  for (let i = 0; i < outputs.length; i++) files.push(...(outputs[i].output || Object.values(outputs[i])));
  for (let i = 0; i < files.length; i++) {
    const artifact = files[i];
    if (artifact.type !== 'chunk') continue;
    const modules = artifact.modules || {};
    const ids = Object.keys(modules);
    for (let j = 0; j < ids.length; j++) {
      const id = ids[j];
      const mod = modules[id];
      const rendered = mod.renderedLength || 0;
      totals.set(id, (totals.get(id) || 0) + rendered);
    }
  }
  return totals;
}

function toRepoRelativeModuleId(id) {
  const normalized = id.replace(/\\/g, '/');
  const rootNormalized = rootDir.replace(/\\/g, '/');
  if (normalized.startsWith(rootNormalized + '/')) return normalized.slice(rootNormalized.length + 1);
  return normalized;
}

function buildSankeyData(baseModules, groupModuleMap, groupResults) {
  const moduleToGroups = new Map();
  const groupById = new Map();
  for (let i = 0; i < groupResults.length; i++) groupById.set(groupResults[i].id, groupResults[i]);

  for (const [groupId, modules] of groupModuleMap.entries()) {
    for (const [moduleId, rendered] of modules.entries()) {
      if (!moduleToGroups.has(moduleId)) moduleToGroups.set(moduleId, []);
      moduleToGroups.get(moduleId).push({groupId, rendered});
    }
  }

  const nodes = [{id: 'base', label: 'base.css + commands', type: 'base'}];
  const links = [];

  for (let i = 0; i < groupResults.length; i++) {
    nodes.push({id: `group:${groupResults[i].id}`, label: groupResults[i].id, type: 'group'});
  }

  for (const [moduleId, owners] of moduleToGroups.entries()) {
    const rel = toRepoRelativeModuleId(moduleId);
    const baseRendered = baseModules.get(moduleId) || 0;
    const totalRendered = owners.reduce((acc, o) => acc + o.rendered, 0);
    if (totalRendered <= 0) continue;

    nodes.push({id: `module:${rel}`, label: rel, type: 'module', baseRendered});

    for (let i = 0; i < owners.length; i++) {
      const owner = owners[i];
      const group = groupById.get(owner.groupId);
      const fraction = owner.rendered / totalRendered;
      links.push({
        source: `module:${rel}`,
        target: `group:${owner.groupId}`,
        renderedBytes: owner.rendered,
        estimatedGzipBytes: Math.round(group.gzipDelta * fraction),
        estimatedRawDeltaBytes: Math.round(group.rawDelta * fraction),
      });
    }
  }

  return {nodes, links};
}


function createSeededRng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function shuffleInPlace(values, rng) {
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
  }
}

async function measureShapleyGzip(groups, baseTotals, samples = 96, seed = 42) {
  const rng = createSeededRng(seed);
  const cache = new Map();
  cache.set('', {gzipDelta: 0, rawDelta: 0});

  async function costFor(ids) {
    const sorted = [...ids].sort();
    const key = sorted.join(',');
    if (cache.has(key)) return cache.get(key);

    const imports = [];
    for (let i = 0; i < sorted.length; i++) {
      const g = groups.find((x) => x.id === sorted[i]);
      imports.push(`import { ${g.exports.join(', ')} } from '../../../src/${g.modulePath}';`);
    }
    const refs = sorted.map((id) => {
      const g = groups.find((x) => x.id === id);
      return g.exports[0];
    });

    const entryBody = `${BASE_IMPORTS}${imports.join('\n')}\nconsole.log(${refs.join(', ') || "'none'"});\n`;
    const entry = await createEntry(`shapley-${key.replace(/,/g, '__') || 'none'}`, entryBody);
    const buildResult = await runBuild(`shapley-${key.replace(/,/g, '__') || 'none'}`, entry);
    const deltas = withDelta(buildResult.totals, baseTotals);
    cache.set(key, deltas);
    return deltas;
  }

  const ids = groups.map((g) => g.id);
  const totals = new Map(ids.map((id) => [id, {gzip: 0, raw: 0}]));

  for (let s = 0; s < samples; s++) {
    const perm = [...ids];
    shuffleInPlace(perm, rng);

    const coalition = [];
    let before = await costFor(coalition);

    for (let i = 0; i < perm.length; i++) {
      coalition.push(perm[i]);
      const after = await costFor(coalition);
      const acc = totals.get(perm[i]);
      acc.gzip += Math.max(0, after.gzipDelta - before.gzipDelta);
      acc.raw += Math.max(0, after.rawDelta - before.rawDelta);
      before = after;
    }
  }

  const result = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const acc = totals.get(id);
    result.push({id, shapleyGzip: Math.round(acc.gzip / samples), shapleyRaw: Math.round(acc.raw / samples)});
  }

  result.sort((a, b) => a.shapleyGzip - b.shapleyGzip || a.id.localeCompare(b.id));
  return {samples, seed, values: result, cachedCoalitions: cache.size};
}


function escapeScriptJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function createViewerHtml(data) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kinu component size report</title>
<style>
  :root{color-scheme:dark light;--bg:#0b0d10;--panel:#141922;--text:#eef3fb;--muted:#9aa7b8;--line:#273244;--a:#7dd3fc;--b:#a78bfa;--c:#34d399;--warn:#fbbf24}*{box-sizing:border-box}body{margin:0;font:14px/1.45 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--text)}main{max-width:1280px;margin:auto;padding:28px}h1{font-size:28px;margin:0 0 6px}h2{margin:30px 0 12px;font-size:18px}.muted{color:var(--muted)}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:20px 0}.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:14px}.metric{font-size:24px;font-weight:700}.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0 12px}.tabs button{border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:999px;padding:8px 12px;cursor:pointer}.tabs button[aria-selected="true"]{background:var(--a);color:#00131d}.view{display:none}.view.active{display:block}table{width:100%;border-collapse:collapse;background:var(--panel);border-radius:14px;overflow:hidden}th,td{padding:9px 10px;border-bottom:1px solid var(--line);text-align:left;white-space:nowrap}th{text-transform:uppercase;letter-spacing:.04em;font-size:11px;color:var(--muted)}td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}.bar{height:9px;background:#223049;border-radius:999px;overflow:hidden;min-width:120px}.bar>i{display:block;height:100%;background:linear-gradient(90deg,var(--a),var(--b));border-radius:inherit}.split{display:grid;grid-template-columns:1fr 1fr;gap:16px}.sankey{width:100%;height:720px;background:var(--panel);border:1px solid var(--line);border-radius:14px}.link{stroke:var(--a);stroke-opacity:.24;fill:none}.node rect{fill:#1f2937;stroke:#334155}.node text{fill:var(--text);font-size:11px}.pill{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:2px 8px;color:var(--muted)}@media (max-width:900px){.grid,.split{grid-template-columns:1fr}main{padding:16px}table{font-size:12px}}
</style>
</head>
<body>
<main>
  <h1>Kinu component size report</h1>
  <div class="muted" id="generated"></div>
  <section class="grid" id="summary"></section>
  <nav class="tabs" aria-label="report views">
    <button data-view="components" aria-selected="true">Components</button>
    <button data-view="shared">Shared cost</button>
    <button data-view="shapley">Shapley</button>
    <button data-view="sankey">Sankey</button>
  </nav>
  <section id="components" class="view active"></section>
  <section id="shared" class="view"></section>
  <section id="shapley" class="view"></section>
  <section id="sankey" class="view"></section>
</main>
<script id="kinu-size-data" type="application/json">${escapeScriptJson(data)}</script>
<script>
const data = JSON.parse(document.getElementById('kinu-size-data').textContent);
const fmt = new Intl.NumberFormat();
const by = (key) => (a,b) => b[key] - a[key];
const td = (v, cls='') => '<td class="'+cls+'">'+v+'</td>';
const bar = (value, max) => '<div class="bar"><i style="width:'+Math.max(2, value / max * 100)+'%"></i></div>';
document.getElementById('generated').textContent = 'Generated at ' + data.report.generatedAt;
document.getElementById('summary').innerHTML = [
  ['Base gzip', data.report.base.gzip + ' B'],
  ['Largest gzip delta', data.report.results.slice().sort(by('gzipDelta'))[0].id],
  ['Shared pairs measured', data.report.sharedAnalysis.pairCount],
  ['Shapley samples', data.shapley.samples]
].map(([k,v]) => '<div class="card"><div class="muted">'+k+'</div><div class="metric">'+v+'</div></div>').join('');
function table(headers, rows){return '<table><thead><tr>'+headers.map(h=>'<th class="'+(h.num?'num':'')+'">'+h.label+'</th>').join('')+'</tr></thead><tbody>'+rows.join('')+'</tbody></table>'}
const maxGzip = Math.max(...data.report.results.map(r=>r.gzipDelta));
document.getElementById('components').innerHTML = '<h2>Component groups</h2>' + table([
  {label:'Group'}, {label:'Exports'}, {label:'Raw Δ', num:true}, {label:'Gzip Δ', num:true}, {label:'Gzip visual'}
], data.report.results.slice().sort(by('gzipDelta')).map(r => '<tr>'+td(r.id)+td(r.exports.join(', '))+td(fmt.format(r.rawDelta),'num')+td(fmt.format(r.gzipDelta),'num')+td(bar(r.gzipDelta,maxGzip))+'</tr>'));
document.getElementById('shared').innerHTML = '<h2>Estimated shared implementation cost</h2><p class="muted">Shared bytes = AΔ + BΔ - combined(A+B)Δ. This catches real gzip dictionary reuse at the pair level.</p>' + table([
  {label:'A'}, {label:'B'}, {label:'Shared raw', num:true}, {label:'Shared gzip', num:true}, {label:'Combined gzip Δ', num:true}
], data.report.sharedAnalysis.topPairs.map(r => '<tr>'+td(r.a)+td(r.b)+td(fmt.format(r.rawShared),'num')+td(fmt.format(r.gzipShared),'num')+td(fmt.format(r.combinedGzipDelta),'num')+'</tr>'));
document.getElementById('shapley').innerHTML = '<h2>Sampled Shapley gzip attribution</h2><p class="muted">Fair marginal-cost attribution over deterministic sampled load orders. This amortizes first-use and reuse gzip effects across consumers.</p>' + table([
  {label:'Group'}, {label:'Shapley raw', num:true}, {label:'Shapley gzip', num:true}
], data.shapley.values.slice().sort(by('shapleyGzip')).map(r => '<tr>'+td(r.id)+td(fmt.format(r.shapleyRaw),'num')+td(fmt.format(r.shapleyGzip),'num')+'</tr>'));
function renderSankey(){
  const root = document.getElementById('sankey');
  const links = data.sankey.links.filter(l => l.estimatedGzipBytes > 10).sort(by('estimatedGzipBytes')).slice(0,140);
  const modules = [...new Set(links.map(l=>l.source))];
  const groups = [...new Set(links.map(l=>l.target))];
  const h = Math.max(720, Math.max(modules.length, groups.length) * 24 + 40), w = 1180;
  const mStep = (h-60)/Math.max(1,modules.length-1), gStep = (h-60)/Math.max(1,groups.length-1);
  const pos = new Map(); modules.forEach((id,i)=>pos.set(id,{x:20,y:30+i*mStep,label:id.replace('module:','')})); groups.forEach((id,i)=>pos.set(id,{x:w-230,y:30+i*gStep,label:id.replace('group:','')}));
  const max = Math.max(...links.map(l=>l.estimatedGzipBytes));
  const paths = links.map(l => { const a=pos.get(l.source), b=pos.get(l.target), sw=Math.max(1,l.estimatedGzipBytes/max*18); return '<path class="link" stroke-width="'+sw.toFixed(2)+'" d="M'+(a.x+190)+' '+a.y+' C 420 '+a.y+', 740 '+b.y+', '+b.x+' '+b.y+'"><title>'+a.label+' → '+b.label+': '+l.estimatedGzipBytes+' gzip B</title></path>'; }).join('');
  const nodes = [...pos.entries()].map(([id,p]) => '<g class="node"><rect x="'+p.x+'" y="'+(p.y-8)+'" width="190" height="16" rx="4"></rect><text x="'+(p.x+6)+'" y="'+(p.y+4)+'">'+p.label.slice(0,38)+'</text></g>').join('');
  root.innerHTML = '<h2>Sankey: module → component group</h2><p class="muted">Top module/group links by estimated gzip allocation. Hover links for exact bytes.</p><svg class="sankey" viewBox="0 0 '+w+' '+h+'">'+paths+nodes+'</svg>';
}
renderSankey();
document.querySelectorAll('.tabs button').forEach(btn => btn.onclick = () => {document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected', b===btn));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active', v.id===btn.dataset.view));});
</script>
</body>
</html>`;
}

async function main() {
  const indexSource = await readFile(sourceIndex, 'utf8');
  const groups = parseGroups(indexSource);

  await rm(outputRoot, {recursive: true, force: true});
  await rm(entriesDir, {recursive: true, force: true});
  await mkdir(outputRoot, {recursive: true});
  await mkdir(entriesDir, {recursive: true});
  await mkdir(resultsDir, {recursive: true});

  const baseEntry = await createEntry('base', `${BASE_IMPORTS}console.log('base');\n`);
  const baseBuild = await runBuild('base', baseEntry);
  const baseTotals = baseBuild.totals;

  const results = [];
  const sizeById = new Map();
  const groupModuleMap = new Map();

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const entryBody = `${BASE_IMPORTS}import { ${group.exports.join(', ')} } from '../../../src/${group.modulePath}';\nconsole.log(${group.exports[0]});\n`;
    const entry = await createEntry(group.id, entryBody);
    const groupBuild = await runBuild(group.id, entry);
    const totals = groupBuild.totals;
    const result = {...group, ...withDelta(totals, baseTotals)};
    groupModuleMap.set(group.id, groupBuild.moduleRendered);
    results.push(result);
    sizeById.set(group.id, result);
  }

  results.sort((a, b) => a.gzipDelta - b.gzipDelta || a.id.localeCompare(b.id));

  const sharedCandidates = groups.filter(shouldAnalyzeShared);
  const sharedResults = await measureSharedCosts(sharedCandidates, sizeById, baseTotals);
  const shapleyTargets = sharedCandidates.filter((group) => ['dropdown-menu', 'context-menu', 'combobox', 'listbox', 'popover', 'dialog', 'alert-dialog', 'sheet'].includes(group.id));
  const shapley = await measureShapleyGzip(shapleyTargets, baseTotals, 24, 42);

  const generatedAt = new Date().toISOString();
  const payload = {
    generatedAt,
    base: {...baseTotals, rawKiB: toKiB(baseTotals.raw), gzipKiB: toKiB(baseTotals.gzip), brotliKiB: toKiB(baseTotals.brotli)},
    sharedAnalysis: {
      candidateCount: sharedCandidates.length,
      pairCount: sharedResults.length,
      topPairs: sharedResults.slice(0, 25),
    },
    shapley,
    results,
  };

  const sankey = buildSankeyData(baseBuild.moduleRendered, groupModuleMap, results);
  const viewerData = {report: payload, sankey, shapley};

  await writeFile(resolve(resultsDir, 'components.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  await writeFile(resolve(resultsDir, 'components.sankey.json'), `${JSON.stringify(sankey, null, 2)}\n`, 'utf8');
  await writeFile(resolve(resultsDir, 'components.shapley.json'), `${JSON.stringify(shapley, null, 2)}\n`, 'utf8');
  await writeFile(resolve(resultsDir, 'components.html'), createViewerHtml(viewerData), 'utf8');

  const report = [
    '# Kinu component size benchmarks',
    '',
    `Generated at: ${generatedAt}`,
    '',
    `Base bundle (base.css + commands): raw ${baseTotals.raw} bytes (${toKiB(baseTotals.raw)} KiB), gzip ${baseTotals.gzip} bytes (${toKiB(baseTotals.gzip)} KiB), brotli ${baseTotals.brotli} bytes (${toKiB(baseTotals.brotli)} KiB).`,
    '',
    '## Per-group size',
    '',
    formatSizeTable(baseTotals, results),
    '',
    `## Estimated shared implementation cost (top 25 by gzip overlap, ${sharedCandidates.length} candidate groups, ${sharedResults.length} pairs)`,
    '',
    '_Method: shared bytes = (A delta + B delta) - (combined A+B delta), clamped to 0._',
    '',
    formatSharedTable(sharedResults),
    '',
    `## Shapley gzip attribution (${shapley.samples} sampled permutations over ${shapley.values.length} groups)`,
    '',
    '| Group | Shapley raw bytes | Shapley gzip bytes |',
    '| --- | ---: | ---: |',
    ...shapley.values.map((row) => `| ${row.id} | ${row.shapleyRaw} | ${row.shapleyGzip} |`),
    '',
    'Viewer: benchmarks/size/results/components.html (standalone HTML with embedded data).',
    'Sankey data: benchmarks/size/results/components.sankey.json (module -> group links with rendered bytes and estimated gzip/raw allocation).',
    '',
  ].join('\n');

  await writeFile(resolve(resultsDir, 'components.md'), report, 'utf8');
  console.log(report);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
