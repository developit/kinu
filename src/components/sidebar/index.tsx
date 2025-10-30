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
        const commandFor = el.getAttribute('commandfor');
        const sidebar = (node as Element).querySelector?.<HTMLDialogElement>(
          commandFor ? `#${commandFor}` : '[p="sidebar"]',
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
  (_el: HTMLElement) => {
    installCommands();
    installDialogsDropdowns();
    // function mousedown(e: MouseEvent) {
    //   if (_el.contains(e.target as Node)) return;
    //   _el.removeAttribute('open');
    // }
    // addEventListener('mousedown', mousedown);
    // return () => removeEventListener('mousedown', mousedown);
  },
);
