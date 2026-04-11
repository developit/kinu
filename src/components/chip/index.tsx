import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ChipOwnProps, ChipButtonOwnProps} from './types';
import './style.css';

const ChipBase = createSimpleComponent<'button', ChipOwnProps>('chip', 'button', {
  type: 'button',
});

export const ChipButton = createSimpleComponent<'span', ChipButtonOwnProps>(
  'chip-button',
  'span',
  {
    role: 'button',
    'aria-hidden': 'true',
  },
  (el: HTMLSpanElement) => {
    // Attached via addEventListener so it runs AFTER the user's onClick prop
    // (Preact applies prop listeners before invoking refs). Prevents the
    // Chip's main click handler from also firing when the button is clicked.
    function stop(e: MouseEvent) {
      e.stopPropagation();
    }
    el.addEventListener('click', stop);
    return () => el.removeEventListener('click', stop);
  },
);

type ChipComponent = typeof ChipBase & {
  Button: typeof ChipButton;
};

export const Chip: ChipComponent = Object.assign(ChipBase, {
  Button: ChipButton,
});
