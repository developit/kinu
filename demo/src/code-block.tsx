import {hljs} from './highlight';

export function CodeBlock({code}: {code: string}) {
  const {value} = hljs.highlight(code, {language: 'tsx'});
  return (
    <pre class="code-block hljs">
      <code
        class="hljs language-tsx"
        dangerouslySetInnerHTML={{__html: value}}
      />
    </pre>
  );
}
