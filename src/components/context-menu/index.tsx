import {type ComponentChildren, type JSX, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import {installDialogsDropdowns} from '../../lib/commands';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

let lastAnchor: HTMLElement | null = null;

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
  const el = e.currentTarget as HTMLElement;
  if (lastAnchor) lastAnchor.style.anchorName = '';
  lastAnchor = el;
  el.style.anchorName = '--p-context-menu';
  const target = el.ownerDocument.getElementById(
    el.getAttribute('commandfor')!,
  ) as HTMLDialogElement;
  if (!target) return;
  const rect = el.getBoundingClientRect();
  target.showModal();
  const d = target.getBoundingClientRect();
  let x = e.clientX - rect.x;
  let y = e.clientY - rect.y;
  if (e.clientX + d.width > innerWidth) x -= d.width;
  if (e.clientY + d.height > innerHeight) y -= d.height;
  target.style.setProperty('--p-context-menu-x', x + 'px');
  target.style.setProperty('--p-context-menu-y', y + 'px');
}

export function ContextMenuTrigger({children}: JSX.ElementChildrenAttribute) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    commandfor: id,
    onContextMenu: handleContextMenu,
  });
}

export function ContextMenu({
  id: idProp,
  children,
}: {id?: string; children: ComponentChildren}) {
  installDialogsDropdowns();
  const gen = useId();
  const id = idProp ?? gen;
  return <IdCtx.Provider value={id}>{children}</IdCtx.Provider>;
}

function click(e: MouseEvent) {
  if (e.defaultPrevented) return;
  e.preventDefault();
  (e.currentTarget as HTMLDialogElement).close();
}

export function ContextMenuContent({
  id,
  ...props
}: JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return (
    <dialog
      p="context-menu"
      id={id ?? ctx}
      onClickCapture={click}
      onContextMenuCapture={click}
      {...props}
    />
  );
}

export const ContextMenuItem = createSimpleComponent(
  'context-menu-item',
  'button',
  {tabIndex: 0},
);
