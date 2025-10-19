import {useMemo} from 'preact/hooks';
import {marked} from 'marked';
import {Nav} from '../nav';
import manifestData from 'pui-docs/manifest.json' assert {type: 'json'};

const docsModules = import.meta.glob('../../../docs/**/*.md', {
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

interface ManifestEntry {
  slug: string;
  title: string;
  section: string;
  category: string;
  order: number;
  file: string;
  description: string;
}

interface RouteProps {
  params?: {slug?: string};
}

const manifest = manifestData as ManifestEntry[];

const sortEntries = (a: ManifestEntry, b: ManifestEntry) => {
  if (a.order !== b.order) return a.order - b.order;
  return a.title.localeCompare(b.title);
};

const overviewEntries = manifest
  .filter((entry) => entry.section === 'Foundations')
  .sort(sortEntries);

interface ComponentGroup {
  name: string;
  entries: ManifestEntry[];
  order: number;
}

const componentGroups: ComponentGroup[] = (() => {
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
      order: Math.min(...entries.map((item) => item.order ?? Number.MAX_SAFE_INTEGER)),
    }))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.name.localeCompare(b.name);
    });
})();

export default function DocsRoute({params}: RouteProps) {
  const fallback = manifest[0];
  const slug = params?.slug ?? fallback?.slug;
  const entry = manifest.find((item) => item.slug === slug) ?? fallback;
  const raw =
    (entry && docsContent.get(entry.file)) || '# Document missing';
  const html = useMemo(() => {
    const rendered = marked.parse(raw);
    return typeof rendered === 'string' ? rendered : '';
  }, [raw]);

  return (
    <div class="docs-page">
      <Nav />
      <div class="docs-layout">
        <aside class="docs-sidebar">
          {overviewEntries.length > 0 && (
            <section class="docs-sidebar-section">
              <h2>Overview</h2>
              <ul class="docs-sidebar-list">
                {overviewEntries.map((item) => (
                  <li key={item.slug}>
                    <a
                      href={`/docs/${item.slug}`}
                      class={`docs-link${item.slug === entry?.slug ? ' is-active' : ''}`}
                    >
                      <span class="docs-link-title">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {componentGroups.map((group) => (
            <section key={group.name} class="docs-sidebar-section">
              <h2>{group.name}</h2>
              <ul class="docs-sidebar-list">
                {group.entries.map((item) => (
                  <li key={item.slug}>
                    <a
                      href={`/docs/${item.slug}`}
                      class={`docs-link${item.slug === entry?.slug ? ' is-active' : ''}`}
                    >
                      <span class="docs-link-title">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>
        <article class="docs-content" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </div>
  );
}
