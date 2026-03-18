import {describe, expect, it} from 'vitest';
import {h, options, createContext} from 'preact';
import {useId, useContext, useState, useRef} from 'preact/hooks';
import {renderToStringAsync} from 'preact-render-to-string';

// Track every useId call
const origRender = options.__r;
const useIdCalls: string[] = [];

function TrackedUseId(label: string) {
  const id = useId();
  useIdCalls.push(`${label}: ${id}`);
  return id;
}

const IdCtx = createContext<string | undefined>(undefined);

function DropdownMenu({children}: {children?: any}) {
  const id = TrackedUseId('DropdownMenu');
  return h(IdCtx.Provider, {value: id}, h('span', null, children));
}

function Dialog({children}: {children?: any}) {
  const id = TrackedUseId('Dialog');
  return h(IdCtx.Provider, {value: id}, children);
}

function Nav() {
  return h('nav', null,
    h(DropdownMenu, null, 'Demos'),
    h(Dialog, null, 'Theme')
  );
}

function DocsLayout({children}: {children?: any}) {
  return h('div', null, h(Nav, null), children);
}

function Content() {
  return h(Dialog, null, 'Content dialog');
}

// Simulate lazy loading with suspend/resume
function lazyLike(load: () => Promise<any>) {
  let p: Promise<any> | undefined, c: any;
  const LazyComp = (props: any) => {
    const [, update] = useState(0);
    const r = useRef(c);
    if (!p) p = load().then(m => { c = m.default || m; });
    if (c !== undefined) return h(c, props);
    if (!r.current) r.current = p.then(() => update(1));
    throw p;
  };
  return LazyComp;
}

describe('SSR useId with lazy loading', () => {
  it('lazy docs page', async () => {
    useIdCalls.length = 0;
    
    const LazyContent = lazyLike(async () => ({ default: Content }));
    
    function DocsPage() {
      return h(DocsLayout, null, h(LazyContent, {key: 'test'}));
    }
    
    const html = await renderToStringAsync(h(DocsPage, null));
    const ids = html.match(/id="P[^"]+"/g);
    console.log('Lazy docs page IDs:', ids);
    console.log('useId call order:', useIdCalls);
  });
  
  it('non-lazy docs page', async () => {
    useIdCalls.length = 0;
    
    function DocsPage() {
      return h(DocsLayout, null, h(Content, null));
    }
    
    const html = await renderToStringAsync(h(DocsPage, null));
    const ids = html.match(/id="P[^"]+"/g);
    console.log('Non-lazy docs page IDs:', ids);
    console.log('useId call order:', useIdCalls);
  });
});
