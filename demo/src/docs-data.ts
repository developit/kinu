// import manifestJson from 'kinu-docs/manifest.json' assert {type: 'json'};
import manifestJson from 'kinu-docs/manifest.json';

// Lazy-loaded markdown docs
const docsLoaders = import.meta.glob('../../docs/**/*.md', {
  eager: false,
  import: 'default',
  query: '?raw',
}) as Record<string, () => Promise<string>>;

// Lazy-loaded examples
const exampleLoaders = import.meta.glob('../../docs/examples/*.tsx', {
  eager: false,
  // import: 'Demo',
}) as Record<string, () => Promise<{Demo: () => JSX.Element; code: string}>>;

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

const manifestList = (manifestJson as ManifestEntry[])
  .slice()
  .sort(sortEntries);

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
        ...entries.map((item) =>
          typeof item.order === 'number' ? item.order : Number.MAX_SAFE_INTEGER,
        ),
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

// Lazy load doc content by file path
export async function loadDocContent(
  file: string | undefined,
): Promise<string> {
  if (!file) return '# Document missing';

  const path = `../../docs/${file}`;
  const loader = docsLoaders[path];

  if (!loader) {
    console.warn(`Doc not found: ${path}`);
    return '# Document missing';
  }

  try {
    return await loader();
  } catch (error) {
    console.error(`Failed to load doc: ${path}`, error);
    return '# Error loading document';
  }
}

// Lazy load example by slug
export async function loadExample(
  slug: string | undefined,
): Promise<{Demo: () => JSX.Element; code: string} | null> {
  if (!slug) return null;

  const path = `../../docs/examples/${slug}.tsx`;
  const loader = exampleLoaders[path];

  if (!loader) {
    // Not all docs have examples, so this is okay
    return null;
  }

  try {
    const module = await loader();
    return module as {Demo: () => JSX.Element; code: string};
  } catch (error) {
    console.error(`Failed to load example: ${path}`, error);
    return null;
  }
}

// Deprecated - for backwards compatibility during migration
export function getDocContent(file: string | undefined) {
  console.warn('getDocContent is deprecated, use loadDocContent instead');
  return '# Use loadDocContent instead';
}
