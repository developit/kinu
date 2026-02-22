import {type JSX, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import {installDialogsDropdowns} from '../../lib/commands';
import type {
  ContextMenuOwnProps,
  ContextMenuTriggerOwnProps,
  ContextMenuContentOwnProps,
  ContextMenuItemOwnProps,
} from './types';
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
  const r = el.getBoundingClientRect();
  let x = e.clientX - r.x,
    y = e.clientY - r.y;
  const s = target.style;
  s.setProperty('--p-context-menu-x', x + 'px');
  s.setProperty('--p-context-menu-y', y + 'px');
  target.showModal();
  const d = target.getBoundingClientRect();
  if (e.clientX + d.width > innerWidth)
    s.setProperty('--p-context-menu-x', x - d.width + 'px');
  if (e.clientY + d.height > innerHeight)
    s.setProperty('--p-context-menu-y', y - d.height + 'px');
}

export function ContextMenuTrigger({
  children,
}: ContextMenuTriggerOwnProps & JSX.ElementChildrenAttribute) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    commandfor: id,
    onContextMenu: handleContextMenu,
  });
}

export function ContextMenu({id: idProp, children}: ContextMenuOwnProps) {
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
}: ContextMenuContentOwnProps & JSX.IntrinsicElements['dialog']) {
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

export const ContextMenuItem = createSimpleComponent<
  'button',
  ContextMenuItemOwnProps
>('context-menu-item', 'button', {tabIndex: 0});
