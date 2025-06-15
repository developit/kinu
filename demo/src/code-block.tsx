import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github.css';

export function CodeBlock({code}: {code: string}) {
  const html = hljs.highlight(code, {language: 'tsx'}).value;
  return <pre class="hljs" dangerouslySetInnerHTML={{__html: html}} />;
}
