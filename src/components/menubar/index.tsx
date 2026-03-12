import {createSimpleComponent} from '../../lib/create-simple-component';
import type {MenubarOwnProps, MenubarItemOwnProps} from './types';
import './style.css';

export const Menubar = createSimpleComponent<'nav', MenubarOwnProps>(
  'menubar',
  'nav',
);
export const MenubarItem = createSimpleComponent<'button', MenubarItemOwnProps>(
  'menubar-item',
  'button',
  {
    onMouseEnterCapture(e) {
      const el = e.currentTarget
        .closest('[k="menubar"]')
        ?.querySelector<HTMLDialogElement>('[k="dropdown-content"][open]');
      if (el) e.currentTarget.click();
    },
  },
);
