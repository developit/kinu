// Generates llms.txt + components.json from the component metadata so the
// LLM-authoring contract never drifts from the actual components. Run on every
// build. Outputs:
//   - llms.txt          (package root; exported as `kinu/llms.txt`)
//   - components.json   (package root; machine-readable component index)
//   - demo/public/llms.txt (served by the docs site)
import {readFile, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import metadata from '../docs/metadata.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Derive the export identifier from the human title: "App Shell" -> "AppShell",
// "OTP Input" -> "OTPInput", "Number Field" -> "NumberField".
function exportName(title) {
  return title.replace(/[^A-Za-z0-9]/g, '');
}

const components = metadata.filter((entry) => entry.section === 'Components');

// Group by category, preserving first-seen order.
const byCategory = new Map();
for (const entry of components) {
  if (!byCategory.has(entry.category)) byCategory.set(entry.category, []);
  byCategory.get(entry.category).push(entry);
}

let reference = '';
for (const [category, entries] of byCategory) {
  reference += `\n### ${category}\n`;
  entries.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  for (const entry of entries) {
    reference += `\n#### ${exportName(entry.title)}\n`;
    if (entry.description) reference += `${entry.description}\n`;
    if (entry.usage) reference += `\n\`\`\`tsx\n${entry.usage}\n\`\`\`\n`;
    if (entry.notes?.length) {
      reference += `\n${entry.notes.map((note) => `- ${note}`).join('\n')}\n`;
    }
  }
}

const preamble = await readFile(resolve(root, 'scripts/llms-preamble.md'), 'utf8');
const llms = `${preamble.trimEnd()}\n${reference}`;

const machine = components.map((entry) => ({
  name: exportName(entry.title),
  slug: entry.slug,
  category: entry.category,
  description: entry.description ?? '',
  usage: entry.usage ?? '',
  notes: entry.notes ?? [],
}));

await writeFile(resolve(root, 'llms.txt'), llms, 'utf8');
await writeFile(
  resolve(root, 'components.json'),
  `${JSON.stringify(machine, null, 2)}\n`,
  'utf8',
);
await writeFile(resolve(root, 'demo/public/llms.txt'), llms, 'utf8');

console.log(
  `Generated llms.txt + components.json (${components.length} components)`,
);
