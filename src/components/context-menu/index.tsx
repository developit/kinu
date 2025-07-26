import type {ComponentChildren, JSX} from 'preact';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
  const el = e.currentTarget as HTMLElement;
  el.style.anchorName = '--p-context-menu';
  const parent = el.parentNode as HTMLElement;
  const rect = el.getBoundingClientRect();
  parent.style.setProperty('--p-context-menu-x', `${e.clientX - rect.x}px`);
  parent.style.setProperty('--p-context-menu-y', `${e.clientY - rect.y}px`);
  parent?.querySelector<HTMLDialogElement>('[p="context-menu"]')?.show();
}

export function ContextMenuTrigger({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {onContextMenu: handleContextMenu});
}

export function ContextMenu({children}: {children: ComponentChildren}) {
  return children;
}

export const ContextMenuContent = createSimpleComponent(
  'context-menu',
  'dialog',
  {},
  (el: HTMLDialogElement) => {
    function clickOutside(e: MouseEvent) {
      if (!el.contains(e.target as Node)) el.close();
    }
    function click(e: MouseEvent) {
      if (!e.defaultPrevented) el.close();
    }
    el.addEventListener('click', click);
    addEventListener('mousedown', clickOutside);
    return () => {
      el.removeEventListener('click', click);
      removeEventListener('mousedown', clickOutside);
    };
  },
);

export const ContextMenuItem = createSimpleComponent(
  'context-menu-item',
  // 'menuitem',
);
