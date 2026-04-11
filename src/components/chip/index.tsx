import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ChipOwnProps, ChipButtonOwnProps} from './types';
import './style.css';

const ChipBase = createSimpleComponent<'button', ChipOwnProps>('chip', 'button');

function stop(e: MouseEvent) {
  e.stopPropagation();
}

export const ChipButton = createSimpleComponent<'span', ChipButtonOwnProps>(
  'chip-button',
  'span',
  {
    role: 'button',
    tabIndex: 0,
  },
  (el: HTMLSpanElement) => {
    // Attached via addEventListener so it runs AFTER the user's onClick prop
    // (Preact applies prop listeners before invoking refs). Prevents the
    // Chip's main click handler from also firing when the button is clicked.
    el.onclick = stop;
  },
);

type ChipComponent = typeof ChipBase & {
  Button: typeof ChipButton;
};

export const Chip = ChipBase as ChipComponent;
Chip.Button = ChipButton;
