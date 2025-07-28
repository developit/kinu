import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands, installDialogsDropdowns} from '../../lib/commands';
import './style.css';

export const SidebarTrigger = createSimpleComponent(
  'sidebar-trigger',
  'button',
  {},
  (el: HTMLButtonElement) => {
    function click(_e: MouseEvent) {
      let node: Node | null = el;
      while (node) {
        const sidebar = (node as Element).querySelector?.<HTMLDialogElement>(
          '[p="sidebar"]',
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

export const Sidebar = createSimpleComponent(
  'sidebar',
  'dialog',
  {
    tabIndex: -1,
  },
  (el: HTMLElement) => {
    installCommands();
    installDialogsDropdowns();
    // function mousedown(e: MouseEvent) {
    //   if (el.contains(e.target as Node)) return;
    //   el.removeAttribute('open');
    // }
    // addEventListener('mousedown', mousedown);
    // return () => removeEventListener('mousedown', mousedown);
  },
);
