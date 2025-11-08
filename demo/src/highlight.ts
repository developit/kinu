import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

const registries: Array<[string, (hljs?: any) => any]> = [
  ['tsx', typescript],
  ['ts', typescript],
  ['typescript', typescript],
  ['js', javascript],
  ['jsx', javascript],
  ['javascript', javascript],
  ['bash', bash],
  ['shell', bash],
  ['css', css],
  ['html', xml],
  ['xml', xml],
];

for (const [name, language] of registries) {
  hljs.registerLanguage(name, language);
}

export {hljs};
