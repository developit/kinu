import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Menubar = createSimpleComponent('menubar', 'nav');
export const MenubarItem = createSimpleComponent('menubar-item', 'button', {
  onMouseEnterCapture(e) {
    const el = e.currentTarget
      .closest('[p="menubar"]')
      ?.querySelector<HTMLDialogElement>('[p="dropdown-content"][open]');
    if (el) e.currentTarget.click();
  },
});
