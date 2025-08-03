import type {ComponentChildren, JSX} from 'preact';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import {installDialogsDropdowns} from '../../lib/commands';
import './style.css';

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
  const el = e.currentTarget as HTMLElement;
  el.style.anchorName = '--p-context-menu';
  const parent = el.parentNode as HTMLElement;
  const rect = el.getBoundingClientRect();
  parent.style.setProperty('--p-context-menu-x', `${e.clientX - rect.x}px`);
  parent.style.setProperty('--p-context-menu-y', `${e.clientY - rect.y}px`);
  parent?.querySelector<HTMLDialogElement>('[p="context-menu"]')?.showModal();
}

export function ContextMenuTrigger({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {onContextMenu: handleContextMenu});
}

export function ContextMenu({children}: {children: ComponentChildren}) {
  installDialogsDropdowns();
  return children;
}

export const ContextMenuContent = createSimpleComponent(
  'context-menu',
  'dialog',
  {},
  (el: HTMLDialogElement) => {
    function click(e: MouseEvent) {
      if (e.defaultPrevented) return;
      e.preventDefault();
      el.close();
    }
    el.addEventListener('contextmenu', click);
    el.addEventListener('click', click);
    return () => {
      el.removeEventListener('contextmenu', click);
      el.removeEventListener('click', click);
    };
  },
);

export const ContextMenuItem = createSimpleComponent(
  'context-menu-item',
  // 'menuitem',
);
