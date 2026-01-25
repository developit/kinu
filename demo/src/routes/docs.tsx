import {Card, TabList, Tab, TabPanel} from 'pui';
import {DocsLayout} from '../app';
import {getEntryBySlug, loadDocContent, loadExample} from '../docs-data';
import {useRoute} from 'preact-iso';
import {lazy} from 'preact-iso';
import {marked} from 'marked';
import {markedHighlight} from 'marked-highlight';
import {hljs} from '../highlight';
import type {ComponentType, JSX} from 'preact';
import {CodeBlock} from '../code-block';
import {useState} from 'preact/hooks';

interface Data {
  markdown: string;
  html: string;
  intro: string;
  remainder: string;
  example: {Demo: () => JSX.Element; code: string} | null;
}

function normalizeLanguage(lang?: string) {
  if (!lang) return undefined;
  const value = lang.toLowerCase();
  return hljs.getLanguage(value) ? value : undefined;
}

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code: string, language?: string) {
      const lang = normalizeLanguage(language);
      if (lang) return hljs.highlight(code, {language: lang}).value;
      return hljs.highlightAuto(code).value;
    },
  }),
);

function splitDocSections(html: string) {
  if (!html) return {intro: '', remainder: ''};

  const headingEnd = html.indexOf('</h1>');
  if (headingEnd === -1) {
    return {intro: html, remainder: ''};
  }

  const firstParagraphStart = html.indexOf('<p', headingEnd);
  if (firstParagraphStart === -1) {
    return {intro: html, remainder: ''};
  }

  const firstParagraphEnd = html.indexOf('</p>', firstParagraphStart);
  if (firstParagraphEnd === -1) {
    return {intro: html, remainder: ''};
  }

  const intro = html.slice(0, firstParagraphEnd + 4);
  const remainder = html.slice(firstParagraphEnd + 4).trimStart();
  return {intro, remainder};
}

function ComponentContent({slug, data}: {slug: string; data: Data}) {
  const entry = getEntryBySlug(slug);
  const isRecipe = entry?.category === 'Recipes';
  const [activeTab, setActiveTab] = useState<'result' | 'code'>('result');

  return (
    <section id={slug}>
      <div dangerouslySetInnerHTML={{__html: data.intro}} />
      {data.example && isRecipe ? (
        <div class="my-6">
          <TabList>
            <Tab
              aria-selected={activeTab === 'result'}
              onClick={() => setActiveTab('result')}
            >
              Result
            </Tab>
            <Tab
              aria-selected={activeTab === 'code'}
              onClick={() => setActiveTab('code')}
            >
              Code
            </Tab>
          </TabList>
          {activeTab === 'result' && (
            <TabPanel>
              <Card class="example-demo">
                <data.example.Demo />
              </Card>
            </TabPanel>
          )}
          {activeTab === 'code' && (
            <TabPanel>
              <CodeBlock code={data.example.code} />
            </TabPanel>
          )}
        </div>
      ) : data.example ? (
        <Card class="example-demo">
          <data.example.Demo />
        </Card>
      ) : null}
      <div dangerouslySetInnerHTML={{__html: data.remainder}} />
    </section>
  );
}

async function load(slug: string): Promise<Data | null> {
  const entry = getEntryBySlug(slug);
  if (!entry) return null;

  const [markdown, example] = await Promise.all([
    loadDocContent(entry.file),
    loadExample(entry.slug),
  ]);

  const html = marked.parse(markdown) ?? '';

  return {
    markdown,
    html,
    intro: splitDocSections(html).intro,
    remainder: splitDocSections(html).remainder,
    example,
  };
}

const lazyComponents = new Map<string, ComponentType>();

function createLazyComponent(slug: string) {
  const cached = lazyComponents.get(slug);
  if (cached) return cached;
  const LazyComponent = lazy(async () => {
    const data = await load(slug);
    if (!data) return null;
    return {
      default: () => <ComponentContent slug={slug} data={data} />,
    };
  });
  lazyComponents.set(slug, LazyComponent);
  return LazyComponent;
}

export default function Docs() {
  const route = useRoute();
  const slug = route.params?.slug || 'overview';
  const DocsContent = createLazyComponent(slug);
  return (
    <DocsLayout>
      <DocsContent />
    </DocsLayout>
  );
}
