import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {ColorPickerOwnProps} from './types';
import './style.css';

export const ColorPicker = createSimpleComponent<'input', ColorPickerOwnProps>(
  'color-picker',
  'input',
  {type: 'color'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
