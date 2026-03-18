// @vitest-environment jsdom
import {describe, expect, it} from 'vitest';
import {h, hydrate, createContext} from 'preact';
import {useId, useContext, useState} from 'preact/hooks';
import renderToString from 'preact-render-to-string';

/**
 * Reproduction of useId collision after hydration + client-side navigation.
 *
 * Root cause: when SSR-generated useId values differ from client-generated
 * values (due to counter offset), Preact's hydration preserves the SSR DOM
 * attributes. On subsequent navigation, new components get IDs from the
 * client counter that can collide with stale SSR IDs in the DOM.
 *
 * Fix: persistent components should use explicit `id` props rather than
 * relying on useId(), so their IDs are deterministic across SSR and client.
 */

const IdCtx = createContext<string | undefined>(undefined);

function DropdownMenu({
  id: idProp,
  children,
}: {id?: string; children?: any}) {
  const gen = useId();
  const id = idProp ?? gen;
  return h(IdCtx.Provider, {value: id}, h('span', null, children));
}

function DropdownMenuContent(props: Record<string, unknown>) {
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

function DialogContent(props: Record<string, unknown>) {
  const ctx = useContext(IdCtx);
  return h('dialog', {id: ctx, ...props});
}

function DialogTrigger({children}: {children?: any}) {
  const id = useContext(IdCtx);
  return h('button', {commandfor: id}, children);
}

function Nav({
  dropdownId,
  dialogId,
}: {dropdownId?: string; dialogId?: string}) {
  return h(
    'nav',
    null,
    h(
      DropdownMenu,
      {id: dropdownId},
      h(DropdownMenuTrigger, null, 'Demos'),
      h(DropdownMenuContent, null, 'Demos menu'),
    ),
    h(
      Dialog,
      {id: dialogId},
      h(DialogTrigger, null, 'Theme'),
      h(DialogContent, null, 'Theme settings'),
    ),
  );
}

function DocsLayout({
  children,
  dropdownId,
  dialogId,
}: {children?: any; dropdownId?: string; dialogId?: string}) {
  return h('div', null, h(Nav, {dropdownId, dialogId}), children);
}

function DropdownMenuExample() {
  return h(
    DropdownMenu,
    null,
    h(DropdownMenuTrigger, null, 'Open'),
    h(DropdownMenuContent, null, 'Menu'),
  );
}

describe('useId collision after hydration + navigation', () => {
  it('collides when SSR IDs differ from hydration IDs', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    let setPage!: (v: string) => void;
    function App() {
      const [page, _setPage] = useState('dialog');
      setPage = _setPage;
      return h(
        DocsLayout,
        null,
        page === 'dialog'
          ? h(Dialog, {key: 'dialog'}, h(DialogContent, null, 'Dialog'))
          : h(DropdownMenuExample, {key: 'dropdown'}),
      );
    }

    // Render SSR HTML, then offset the IDs to simulate counter mismatch
    const ssrHtml = renderToString(h(App, null));
    const offsetHtml = ssrHtml.replace(/P0-(\d+)/g, (_: string, n: string) => `P0-${Number(n) + 2}`);
    container.innerHTML = offsetHtml;

    // Hydrate (client counter starts at 0, but DOM has P0-2+)
    hydrate(h(App, null), container);
    await new Promise((r) => setTimeout(r, 50));

    // Navigate to dropdown page
    setPage('dropdown');
    await new Promise((r) => setTimeout(r, 100));

    const allIds = Array.from(container.querySelectorAll('[id^="P"]')).map(
      (el) => el.id,
    );
    const uniqueIds = new Set(allIds);

    // This FAILS without the fix: P0-3 appears on both Nav Dialog and content
    expect(uniqueIds.size).not.toBe(allIds.length);
  });

  it('no collision when persistent components have explicit IDs', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    let setPage!: (v: string) => void;
    function App() {
      const [page, _setPage] = useState('dialog');
      setPage = _setPage;
      return h(
        DocsLayout,
        {dropdownId: 'nav-demos', dialogId: 'theme-customizer'},
        page === 'dialog'
          ? h(Dialog, {key: 'dialog'}, h(DialogContent, null, 'Dialog'))
          : h(DropdownMenuExample, {key: 'dropdown'}),
      );
    }

    // Render SSR with explicit IDs
    const ssrHtml = renderToString(h(App, null));
    // Even if we offset the auto-generated IDs, the explicit ones stay fixed
    const offsetHtml = ssrHtml.replace(/P0-(\d+)/g, (_: string, n: string) => `P0-${Number(n) + 2}`);
    container.innerHTML = offsetHtml;

    hydrate(h(App, null), container);
    await new Promise((r) => setTimeout(r, 50));

    setPage('dropdown');
    await new Promise((r) => setTimeout(r, 100));

    const allIds = Array.from(container.querySelectorAll('[id]')).map(
      (el) => el.id,
    );
    const uniqueIds = new Set(allIds);

    // With explicit IDs, the persistent components use "nav-demos" and
    // "theme-customizer" which can never collide with P0-N counter IDs
    expect(uniqueIds.size).toBe(allIds.length);
  });
});
