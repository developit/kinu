import {type JSX, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {forwardRef} from '../../lib/forwardref';
import {installDialogsDropdowns, installSwipe} from '../../lib/commands';
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

  /* Native light dismiss is keyed to a pointerdown/pointerup pair, and a
   * context menu is opened *between* the two — `contextmenu` fires while the
   * button is still down. The release that ends that same press then reads as
   * a click outside the menu that just appeared, and closes it again. It only
   * bites when the pointer isn't inside the new menu's box, which is why it
   * looked intermittent: the menu is placed at the pointer, so the pointer
   * lands exactly on its top-left corner, and a flip from @position-try or a
   * pixel of layout difference decides it.
   *
   * So light dismiss is held off for the gesture that opened the menu and
   * restored once the press ends — or after a second, for the platforms that
   * fire `contextmenu` on the release itself, where that pointerup has already
   * been and gone. The hold-off is `closerequest`, not `none`: `none` would
   * take Escape with it. Whatever the element declared is what gets put back,
   * so a consumer's own `closedby` survives the round trip. */
  const closedby = target.getAttribute('closedby');
  target.setAttribute('closedby', 'closerequest');
  target.showModal();
  const restore = () => {
    clearTimeout(timer);
    if (closedby == null) target.removeAttribute('closedby');
    else target.setAttribute('closedby', closedby);
  };
  const timer = setTimeout(restore, 1000);
  // A task later, so the restore lands after this pointerup has been judged.
  win.addEventListener('pointerup', () => setTimeout(restore), {once: true});
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
  installSwipe();
  const gen = useId();
  const id = idProp ?? gen;
  return <IdCtx.Provider value={id}>{children}</IdCtx.Provider>;
}

function click(e: MouseEvent) {
  if (e.defaultPrevented) return;
  e.preventDefault();
  (e.currentTarget as HTMLDialogElement).close();
}

export const ContextMenuContent = /*#__PURE__*/ forwardRef(function ContextMenuContent({
  id,
  ...props
}: ContextMenuContentOwnProps & JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return (
    <dialog
      k="context-menu"
      id={id ?? ctx}
      closedby="any"
      onClickCapture={click}
      onContextMenuCapture={click}
      {...props}
    />
  );
});

/** @deprecated Use `Item` instead. */
export const ContextMenuItem = Item;

Object.assign(ContextMenu, {Item});
