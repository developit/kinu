import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {DatePickerOwnProps} from './types';
import './style.css';

export const DatePicker = createSimpleComponent<'input', DatePickerOwnProps>(
  'date-picker',
  'input',
  {type: 'date'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
