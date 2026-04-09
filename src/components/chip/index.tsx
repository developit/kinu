import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ChipOwnProps, ChipButtonOwnProps} from './types';
import './style.css';

const ChipBase = createSimpleComponent<'span', ChipOwnProps>('chip', 'span');

export const ChipButton = createSimpleComponent<'button', ChipButtonOwnProps>(
  'chip-button',
  'button',
  {type: 'button'},
);

type ChipComponent = typeof ChipBase & {
  Button: typeof ChipButton;
};

export const Chip: ChipComponent = Object.assign(ChipBase, {
  Button: ChipButton,
});
