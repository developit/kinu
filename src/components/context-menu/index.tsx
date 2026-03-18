import {type JSX, createContext} from 'preact';
import {useContext} from 'preact/hooks';
import {useId} from '../../lib/use-id';
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

export function ContextMenuContent({
  id,
  ...props
}: ContextMenuContentOwnProps & JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return (
    <dialog
      k="context-menu"
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
