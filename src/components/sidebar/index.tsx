import {createSimpleComponent} from '../../lib/create-simple-component';
import {installOverlays} from '../../lib/commands';
import type {SidebarOwnProps, SidebarTriggerOwnProps} from './types';
import './style.css';

/* Toggles the sidebar named by `commandfor`, else the nearest one in an
 * ancestor. Modally at small sizes (CSS sets --modal there), otherwise by
 * flipping `hidden`. Capture phase, so a consumer's own onClick stays theirs. */
export const SidebarTrigger = createSimpleComponent<'button', SidebarTriggerOwnProps>('sidebar-trigger', 'button', {
  onClickCapture(e) {
    const id = e.currentTarget.getAttribute('commandfor');
    let sidebar = id ? document.getElementById(id) : null;
    for (let node: Node | null = e.currentTarget; !sidebar && node; node = node.parentNode) {
      sidebar = (node as Element).querySelector?.('[k="sidebar"]');
    }
    if (!sidebar) return;
    if (getComputedStyle(sidebar).getPropertyValue('--modal')) {
      sidebar.hidden = false;
      (sidebar as HTMLDialogElement).showModal();
    } else {
      sidebar.toggleAttribute('hidden');
    }
  },
});

export const Sidebar = createSimpleComponent<'dialog', SidebarOwnProps>(
  'sidebar',
  'dialog',
  {
    tabIndex: -1,
    // Sidebar opens modally at ≤640px, and a modal dialog's default closedby is
    // `closerequest` (Escape only) — without this, scrim clicks stop dismissing
    // it on engines where native closedby supersedes the JS backdrop hit-test.
    closedby: 'any',
  },
  installOverlays,
);
