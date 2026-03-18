// @vitest-environment jsdom
import {describe, expect, it} from 'vitest';
import {h, render, hydrate, createContext, options} from 'preact';
import {useId, useContext, useState} from 'preact/hooks';
import renderToString from 'preact-render-to-string';
import {renderToStringAsync} from 'preact-render-to-string';

const IdCtx = createContext<string | undefined>(undefined);

function DropdownMenu({id: idProp, children}: {id?: string; children?: any}) {
  const gen = useId();
  const id = idProp ?? gen;
  return h(IdCtx.Provider, {value: id}, h('span', null, children));
}

function DropdownMenuContent(props: any) {
  const ctx = useContext(IdCtx);
  return h('dialog', {id: ctx, ...props});
}

function DropdownMenuTrigger({children}: {children?: any}) {
  const id = useContext(IdCtx);
  return h('button', {commandfor: id}, children);
}

function Dialog({id: idProp, children}: {id?: string; children?: any}) {
  const gen = useId();
  const id = idProp ?? gen;
  return h(IdCtx.Provider, {value: id}, children);
}

function DialogContent(props: any) {
  const ctx = useContext(IdCtx);
  return h('dialog', {id: ctx, ...props});
}

function DialogTrigger({children}: {children?: any}) {
  const id = useContext(IdCtx);
  return h('button', {commandfor: id}, children);
}

function Nav() {
  return h('nav', null,
    h(DropdownMenu, null,
      h(DropdownMenuTrigger, null, 'Demos'),
      h(DropdownMenuContent, null, 'Demos menu')
    ),
    h(Dialog, null,
      h(DialogTrigger, null, 'Theme'),
      h(DialogContent, null, 'Theme settings')
    )
  );
}

function DocsLayout({children}: {children?: any}) {
  return h('div', null, h(Nav, null), children);
}

function DialogExample() {
  return h(Dialog, null,
    h(DialogTrigger, null, 'Open'),
    h(DialogContent, null, 'Dialog')
  );
}

function DropdownMenuExample() {
  return h(DropdownMenu, null,
    h(DropdownMenuTrigger, null, 'Open'),
    h(DropdownMenuContent, null, 'Menu')
  );
}

describe('Reproduce collision with SSR counter offset', () => {
  it('collision when SSR IDs differ from hydration IDs', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    let setPage: (v: string) => void;
    function App() {
      const [page, _setPage] = useState('dialog');
      setPage = _setPage;
      return h(DocsLayout, null,
        page === 'dialog'
          ? h(DialogExample, {key: 'dialog'})
          : h(DropdownMenuExample, {key: 'dropdown'})
      );
    }
    
    // Simulate SSR with offset counter (like real prerendering where
    // a previous page consumed 2 IDs before this page renders)
    // First render something to consume 2 IDs
    const _warmup = renderToString(h('div', null, 
      h(() => { useId(); return null; }, null),
      h(() => { useId(); return null; }, null)
    ));
    // Now render the actual page (counter leaked from warmup? No, it resets)
    // So let's manually create HTML with offset IDs
    const ssrHtml = renderToString(h(App, null));
    console.log('Clean SSR IDs:', ssrHtml.match(/id="P[^"]+"/g));
    
    // Manually offset the IDs to simulate the real-world SSR behavior
    // where docs pages get P0-2, P0-3, P0-4 instead of P0-0, P0-1, P0-2
    const offsetHtml = ssrHtml
      .replace(/P0-0/g, 'P0-2')
      .replace(/P0-1/g, 'P0-3')  
      .replace(/P0-2/g, 'P0-4');
    
    console.log('Offset SSR IDs:', offsetHtml.match(/id="P[^"]+"/g));
    container.innerHTML = offsetHtml;
    
    // Hydrate - client generates P0-0, P0-1, P0-2 but DOM has P0-2, P0-3, P0-4
    hydrate(h(App, null), container);
    await new Promise(r => setTimeout(r, 50));
    
    const hydrateIds = Array.from(container.querySelectorAll('[id^="P"]')).map(
      el => ({tag: el.tagName, id: el.id})
    );
    console.log('After hydration DOM IDs:', hydrateIds);
    // Key: hydration should NOT update the id attrs (Preact hydration behavior)
    
    // Navigate to dropdown-menu
    setPage!('dropdown');
    await new Promise(r => setTimeout(r, 100));
    
    const navIds = Array.from(container.querySelectorAll('[id^="P"]')).map(
      el => ({tag: el.tagName, id: el.id})
    );
    const allIds = navIds.map(x => x.id);
    console.log('After navigation DOM IDs:', navIds);
    
    // Check for collision
    const uniqueIds = new Set(allIds);
    console.log('Unique:', uniqueIds.size, 'Total:', allIds.length,
      uniqueIds.size === allIds.length ? '✓ PASS' : '✗ COLLISION!');
    
    // Also check commandfor attributes
    const cmdfors = Array.from(container.querySelectorAll('[commandfor]')).map(
      el => ({tag: el.tagName, text: el.textContent?.trim(), commandfor: el.getAttribute('commandfor')})
    );
    console.log('commandfor attrs:', cmdfors);
    
    expect(uniqueIds.size).toBe(allIds.length);
    
    document.body.removeChild(container);
  });
});
