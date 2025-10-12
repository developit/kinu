import '../../../src/components/typography/style.css';
import {
  Sidebar,
  SidebarTrigger,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Card,
  ToastContainer,
} from 'pui';
import {useMemo} from 'preact/hooks';
import {CodeBlock} from '../../code-block';
import {COMPONENT_EXAMPLES, type Example} from './examples';
import {Markdown} from './markdown';

type DocSourceMap = Record<string, string>;

type Section = {
  id: string;
  title: string;
  doc: string;
  examples: Example[];
};

const generalDocs = import.meta.glob('../../../docs/*.md', {
  as: 'raw',
  eager: true,
});
const componentDocs = import.meta.glob('../../../docs/components/*.md', {
  as: 'raw',
  eager: true,
});

function createDocMap(modules: Record<string, unknown>): DocSourceMap {
  const entries: DocSourceMap = {};
  for (const [path, value] of Object.entries(modules)) {
    const match = /\/([^/]+)\.md$/i.exec(path);
    if (!match) continue;
    entries[match[1]] = value as string;
  }
  return entries;
}

const DOC_SOURCES: DocSourceMap = {
  ...createDocMap(generalDocs),
  ...createDocMap(componentDocs),
};

const exampleBuckets = new Map<string, Example[]>();
for (const example of COMPONENT_EXAMPLES) {
  const bucket = exampleBuckets.get(example.id);
  if (bucket) bucket.push(example);
  else exampleBuckets.set(example.id, [example]);
}

const ORDER = ['overview', ...COMPONENT_EXAMPLES.map((example) => example.id)];

function extractTitle(doc: string): string {
  const match = /^#\s+(.+)$/m.exec(doc);
  return match ? match[1].trim() : 'Untitled';
}

function createSections(): Section[] {
  const seen = new Set<string>();
  const sections: Section[] = [];

  for (const id of ORDER) {
    const doc = DOC_SOURCES[id];
    if (!doc) continue;
    const examples = exampleBuckets.get(id) ?? [];
    const title = examples[0]?.title ?? extractTitle(doc);
    sections.push({id, title, doc, examples});
    seen.add(id);
  }

  for (const [id, doc] of Object.entries(DOC_SOURCES)) {
    if (seen.has(id)) continue;
    sections.push({
      id,
      doc,
      title: extractTitle(doc),
      examples: exampleBuckets.get(id) ?? [],
    });
  }

  return sections;
}

export default function Components() {
  const sections = useMemo(createSections, []);

  return (
    <div class="components-page">
      <Sidebar id="docs-sidebar" class="components-sidebar">
        <nav class="components-nav">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
      </Sidebar>

      <main class="components-main">
        <NavigationMenu class="components-header demo-header home-nav">
          <SidebarTrigger
            commandFor="docs-sidebar"
            class="demo-sidebar-trigger"
            aria-label="Toggle component list"
          >
            ☰
          </SidebarTrigger>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/getting-started">
                Getting Started
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/components">
                Components
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/linear">
                Linear Demo
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/chat">Chat Demo</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/player">Music Demo</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard">
                Dashboard Demo
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ToastContainer />

        {sections.map((section) => (
          <section id={section.id} class="component-section">
            <article class="component-article">
              <Markdown source={section.doc} />

              {section.examples.length > 0 && (
                <div class="component-examples">
                  <h3>Examples</h3>
                  <div class="component-examples-grid">
                    {section.examples.map((example) => (
                      <Card key={example.title} class="component-example-card">
                        <div class="component-example-demo">
                          <example.Demo />
                        </div>
                        <CodeBlock code={example.code} />
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </section>
        ))}
      </main>
    </div>
  );
}
