// import 'highlight.js/styles/github.css';
// import hljs from 'highlight.js/lib/core';
// import typescript from 'highlight.js/lib/languages/typescript';
// hljs.registerLanguage('tsx', typescript);

export function CodeBlock({code}: {code: string}) {
  // const html = hljs.highlight(code, {language: 'tsx'}).value;
  return (
    // <pre class="code-block hljs" dangerouslySetInnerHTML={{__html: html}} />
    <pre class="code-block">{code}</pre>
  );
}
