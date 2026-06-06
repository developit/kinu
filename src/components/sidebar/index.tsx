import {createSimpleComponent} from '../../lib/create-simple-component';
import {
  installCommands,
  installDialogsDropdowns,
  installSwipe,
} from '../../lib/commands';
import type {SidebarProps, SidebarTriggerOwnProps} from './types';
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
          return;
        }
        node = node.parentNode;
      }
    }
    el.addEventListener('click', click);
    return () => el.removeEventListener('click', click);
  },
);

export function Sidebar({children, ...props}: SidebarProps) {
  installCommands();
  installDialogsDropdowns();
  installSwipe();
  // The panel/rail wrap lets the mobile sidebar become a scroll-snap scroller
  // (swipe to dismiss) while staying an ordinary inline flex column on desktop,
  // where `[k="sidebar-panel"]` is `display: contents` and the rail collapses.
  return (
    <dialog k="sidebar" tabIndex={-1} {...props}>
      <div k="sidebar-panel">{children}</div>
      <div k="sidebar-rail" />
    </dialog>
  );
}
