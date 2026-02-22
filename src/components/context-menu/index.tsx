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

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
  const el = e.currentTarget as HTMLElement;
  const target = el.ownerDocument.getElementById(
    el.getAttribute('commandfor')!,
  ) as HTMLDialogElement;
  if (!target) return;
  let x = e.clientX;
  let y = e.clientY;
  target.showModal();
  const r = target.getBoundingClientRect();
  if (x + r.width > innerWidth) x = Math.max(0, x - r.width);
  if (y + r.height > innerHeight) y = Math.max(0, y - r.height);
  target.style.setProperty('--p-x', x + 'px');
  target.style.setProperty('--p-y', y + 'px');
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
