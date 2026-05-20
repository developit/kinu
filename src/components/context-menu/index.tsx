import {type JSX, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import {installDialogsDropdowns} from '../../lib/commands';
import {Item} from '../item';
import type {
  ContextMenuOwnProps,
  ContextMenuTriggerOwnProps,
  ContextMenuContentOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

let lastAnchor: HTMLElement | null = null;

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
  const el = e.currentTarget as HTMLElement;
  if (lastAnchor) lastAnchor.style.anchorName = '';
  lastAnchor = el;
  el.style.anchorName = '--k-context-menu';
  const target = el.ownerDocument.getElementById(
    el.getAttribute('commandfor')!,
  ) as HTMLDialogElement;
  if (!target) return;
  const doc = el.ownerDocument;
  const win = doc.defaultView;
  if (!win) return;
  target.style.setProperty('--k-context-menu-client-x', `${e.clientX}px`);
  target.style.setProperty('--k-context-menu-client-y', `${e.clientY}px`);
  target.style.setProperty('--k-context-menu-client-right', `${win.innerWidth - e.clientX}px`);
  target.style.setProperty('--k-context-menu-client-bottom', `${win.innerHeight - e.clientY}px`);
  target.showModal();
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

export const ContextMenuContent = createSimpleComponent<
  'dialog',
  ContextMenuContentOwnProps
>('context-menu', 'dialog', (p: any) => ({
  onClickCapture: click,
  onContextMenuCapture: click,
  ...p,
  id: p.id ?? useContext(IdCtx),
}));

/** @deprecated Use `Item` instead. */
export const ContextMenuItem = Item;

Object.assign(ContextMenu, {Item});
