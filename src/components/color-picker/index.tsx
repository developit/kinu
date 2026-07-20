import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {ColorPickerOwnProps} from './types';
import './style.css';

const EYEDROPPER_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.9.9a2.1 2.1 0 1 1-3 3l-.9-.9-9 9"/></svg>';

export const ColorPicker = createSimpleComponent<'input', ColorPickerOwnProps>(
  'color-picker',
  'input',
  {type: 'color'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
  (el: HTMLInputElement) => {
    // Opt-in screen color sampling (<ColorPicker eyedropper>), rendered only
    // where the EyeDropper API exists.
    if (!el.hasAttribute('eyedropper') || !('EyeDropper' in window)) return;
    const button = el.ownerDocument.createElement('button');
    button.type = 'button';
    button.setAttribute('k', 'color-picker-eyedropper');
    button.title = 'Pick color from screen';
    button.innerHTML = EYEDROPPER_ICON;
    const pick = async () => {
      try {
        const result = await new (window as any).EyeDropper().open();
        el.value = result.sRGBHex;
        el.dispatchEvent(new Event('input', {bubbles: true}));
        el.dispatchEvent(new Event('change', {bubbles: true}));
      } catch {
        // user canceled the eyedropper
      }
    };
    button.addEventListener('click', pick);
    el.insertAdjacentElement('afterend', button);
    return () => button.remove();
  },
);
