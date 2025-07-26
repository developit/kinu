import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const SidebarTrigger = createSimpleComponent(
  'sidebar-trigger',
  'button',
  {},
  (el: HTMLButtonElement) => {
    function click(_e: MouseEvent) {
      let node: Node | null = el;
      while (node) {
        const sidebar = (node as Element).querySelector?.('[p="sidebar"]');
        if (sidebar) {
          sidebar.setAttribute('open', '');
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
  'nav',
  {
    tabIndex: -1,
  },
  (el: HTMLElement) => {
    function mousedown(e: MouseEvent) {
      if (el.contains(e.target as Node)) return;
      el.removeAttribute('open');
    }
    addEventListener('mousedown', mousedown);
    return () => removeEventListener('mousedown', mousedown);
  },
);
