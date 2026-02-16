import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {CheckboxOwnProps} from './types';
import './style.css';

export const Checkbox = createSimpleComponent<'input', CheckboxOwnProps>(
  'checkbox',
  'input',
  {type: 'checkbox'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
