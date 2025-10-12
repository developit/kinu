import {useMemo} from 'preact/hooks';
import {marked} from 'marked';
import {Nav} from '../nav';
import manifestData from 'pui-docs/manifest.json' assert {type: 'json'};

const docsContent = import.meta.glob('pui-docs/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

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

interface GroupedEntry {
  name: string;
  entries: ManifestEntry[];
}

interface SectionGroup {
  name: string;
  categories: GroupedEntry[];
}

const sections: SectionGroup[] = (() => {
  const sectionMap = new Map<string, Map<string, ManifestEntry[]>>();
  for (const entry of manifest) {
    if (!sectionMap.has(entry.section)) sectionMap.set(entry.section, new Map());
    const categoryMap = sectionMap.get(entry.section)!;
    if (!categoryMap.has(entry.category)) categoryMap.set(entry.category, []);
    categoryMap.get(entry.category)!.push(entry);
  }
  return Array.from(sectionMap.entries()).map(([name, categories]) => ({
    name,
    categories: Array.from(categories.entries()).map(([categoryName, entries]) => ({
      name: categoryName,
      entries,
    })),
  }));
})();

export default function DocsRoute({params}: RouteProps) {
  const fallback = manifest[0];
  const slug = params?.slug ?? fallback?.slug;
  const entry = manifest.find((item) => item.slug === slug) ?? fallback;
  const contentKey = entry ? `pui-docs/${entry.file}` : undefined;
  const raw =
    (contentKey && docsContent[contentKey]) || '# Document missing';
  const html = useMemo(() => {
    const rendered = marked.parse(raw);
    return typeof rendered === 'string' ? rendered : '';
  }, [raw]);

  return (
    <div class="docs-page">
      <Nav />
      <div class="docs-layout">
        <aside class="docs-sidebar">
          {sections.map((section) => (
            <section key={section.name} class="docs-sidebar-section">
              <h2>{section.name}</h2>
              {section.categories.map((category) => (
                <div key={category.name} class="docs-sidebar-category">
                  <h3>{category.name}</h3>
                  <ul>
                    {category.entries.map((item) => (
                      <li key={item.slug}>
                        <a
                          href={`/docs/${item.slug}`}
                          class={`docs-link${item.slug === entry?.slug ? ' is-active' : ''}`}
                        >
                          <span class="docs-link-title">{item.title}</span>
                          {item.description && (
                            <span class="docs-link-description">{item.description}</span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </aside>
        <article class="docs-content" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </div>
  );
}
