import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ToggleOwnProps} from './types';
import './style.css';

export const Toggle = createSimpleComponent<'button', ToggleOwnProps>(
  'toggle',
  'button',
  {
    get 'aria-pressed'() {
      return this.pressed;
    },
    onClickCapture(e: MouseEvent) {
      const el = e.currentTarget as HTMLButtonElement;
      el.closest('[p="toggle-group"]')
        ?.querySelector('[aria-pressed]')
        ?.removeAttribute('aria-pressed');
      el.hasAttribute('aria-pressed')
        ? el.removeAttribute('aria-pressed')
        : el.setAttribute('aria-pressed', 'true');
    },
  },
);
