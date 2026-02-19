import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {CalendarOwnProps} from './types';
import './style.css';

export const Calendar = createSimpleComponent<'input', CalendarOwnProps>(
  'calendar',
  'input',
  {type: 'date'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
