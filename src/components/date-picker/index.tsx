import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import './style.css';

export const DatePicker = createSimpleComponent(
  'date-picker',
  'input',
  {type: 'date'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
