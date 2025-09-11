import {type ComponentChildren, type JSX, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import {installDialogsDropdowns} from '../../lib/commands';
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
  target.style.left = x + 'px';
  target.style.top = y + 'px';
  target.showModal();
  const r = target.getBoundingClientRect();
  if (x + r.width > innerWidth) x = innerWidth - r.width;
  if (y + r.height > innerHeight) y = innerHeight - r.height;
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  target.style.left = x + 'px';
  target.style.top = y + 'px';
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
