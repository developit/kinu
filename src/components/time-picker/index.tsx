import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {TimePickerOwnProps} from './types';
import './style.css';

export const TimePicker = createSimpleComponent<'input', TimePickerOwnProps>(
  'time-picker',
  'input',
  {type: 'time'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
