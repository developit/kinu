import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {SwitchOwnProps} from './types';
import './style.css';

export const Switch = createSimpleComponent<'input', SwitchOwnProps>(
  'switch',
  'input',
  {
    role: 'switch',
    type: 'checkbox',
  } as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
