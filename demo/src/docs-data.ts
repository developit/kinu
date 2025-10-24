import manifestJson from 'pui-docs/manifest.json' assert {type: 'json'};

const docsModules = import.meta.glob('../../docs/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const docsContent = new Map<string, string>();

for (const [path, value] of Object.entries(docsModules)) {
  const normalizedPath = path.replace(/\\/g, '/');
  const relative = normalizedPath.split('/docs/')[1];
  if (relative) {
    docsContent.set(relative, value);
  }
}

export interface ManifestEntry {
  slug: string;
  title: string;
  section: string;
  category: string;
  order: number;
  file: string;
  description: string;
}

const sortEntries = (a: ManifestEntry, b: ManifestEntry) => {
  if (a.order !== b.order) return a.order - b.order;
  return a.title.localeCompare(b.title);
};

const manifestList = (manifestJson as ManifestEntry[]).slice().sort(sortEntries);

export const manifest = manifestList;
export const fallbackEntry = manifest[0] ?? null;

const manifestMap = new Map(manifest.map((entry) => [entry.slug, entry]));

export const overviewEntries = manifest
  .filter((entry) => entry.section === 'Foundations')
  .map((entry) => entry);

export interface ComponentGroup {
  name: string;
  entries: ManifestEntry[];
  order: number;
}

export const componentGroups: ComponentGroup[] = (() => {
  const categoryMap = new Map<string, ManifestEntry[]>();
  for (const entry of manifest) {
    if (entry.section !== 'Components') continue;
    if (!categoryMap.has(entry.category)) categoryMap.set(entry.category, []);
    categoryMap.get(entry.category)!.push(entry);
  }
  return Array.from(categoryMap.entries())
    .map(([name, entries]) => ({
      name,
      entries: entries.slice().sort(sortEntries),
      order: Math.min(
        ...entries.map((item) => (typeof item.order === 'number' ? item.order : Number.MAX_SAFE_INTEGER)),
      ),
    }))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.name.localeCompare(b.name);
    });
})();

export function getEntryBySlug(slug: string | undefined | null) {
  if (!slug) return undefined;
  return manifestMap.get(slug);
}

export function getDocContent(file: string | undefined) {
  if (!file) return '# Document missing';
  return docsContent.get(file) ?? '# Document missing';
}
