import {Card} from 'pui';
import {CodeBlock} from '../code-block';
import {DocsLayout} from '../app';
import {
  getEntryBySlug,
  loadDocContent,
  loadExample,
  fallbackEntry,
} from '../docs-data';
import {useRoute} from 'preact-iso';
import {lazy} from 'preact-iso';
import {marked} from 'marked';
import {hljs} from '../highlight';
import type {ComponentType, JSX} from 'preact';

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

marked.setOptions({
  highlight(code: string, language?: string) {
    const lang = normalizeLanguage(language);
    if (lang) return hljs.highlight(code, {language: lang}).value;
    return hljs.highlightAuto(code).value;
  },
  langPrefix: 'hljs language-',
});

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
  return (
    <section id={slug}>
      <Card>
        <div dangerouslySetInnerHTML={{__html: data.intro}} />
        {data.example && (
          <div class="example-demo">
            <data.example.Demo />
          </div>
        )}
        <div dangerouslySetInnerHTML={{__html: data.remainder}} />
        {data.example && <CodeBlock code={data.example.code} />}
      </Card>
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

export default function Component() {
  const route = useRoute();
  const componentSlug = route.params?.component || fallbackEntry?.slug || '';
  const ComponentContent = createLazyComponent(componentSlug);
  return (
    <DocsLayout>
      <ComponentContent />
    </DocsLayout>
  );
}
