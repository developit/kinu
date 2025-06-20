import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/common';
import {useEffect, useRef} from 'preact/hooks';

export function CodeBlock({code}: {code: string}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) hljs.highlightElement(ref.current);
  }, [code]);
  return (
    <pre class="code-block">
      <code ref={ref} class="language-tsx">
        {code}
      </code>
    </pre>
  );
}
