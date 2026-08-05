import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands, installDialogsDropdowns, installSwipe} from '../../lib/commands';
import type {SidebarOwnProps, SidebarTriggerOwnProps} from './types';
import './style.css';

export const SidebarTrigger = createSimpleComponent<
  'button',
  SidebarTriggerOwnProps
>(
  'sidebar-trigger',
  'button',
  {},
  (el: HTMLButtonElement) => {
    function click(_e: MouseEvent) {
      let node: Node | null = el;
      while (node) {
        const commandFor = el.getAttribute('commandfor');
        const sidebar = (node as Element).querySelector?.<HTMLDialogElement>(
          commandFor ? `#${commandFor}` : '[k="sidebar"]',
        );
        if (sidebar) {
          if (getComputedStyle(sidebar).getPropertyValue('--modal')) {
            sidebar.toggleAttribute('hidden', false);
            sidebar.showModal();
          } else {
            sidebar.toggleAttribute('hidden');
          }
          // sidebar.setAttribute('open', '');
          // sidebar.showModal();
          return;
        }
        node = node.parentNode;
      }
    }
    el.addEventListener('click', click);
    return () => el.removeEventListener('click', click);
  },
);

export const Sidebar = createSimpleComponent<'dialog', SidebarOwnProps>(
  'sidebar',
  'dialog',
  {
    tabIndex: -1,
  },
  () => {
    installCommands();
    installDialogsDropdowns();
    installSwipe();
  },
);
