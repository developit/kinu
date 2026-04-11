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
    onClickCapture: (e: MouseEvent) => {
      // Prevent the chip's main click handler from firing when the button
      // (e.g. a remove affordance) is clicked.
      e.stopPropagation();
    },
  },
);

type ChipComponent = typeof ChipBase & {
  Button: typeof ChipButton;
};

export const Chip: ChipComponent = Object.assign(ChipBase, {
  Button: ChipButton,
});
