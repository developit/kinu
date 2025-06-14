import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import './style.css';

export const Checkbox = createSimpleComponent(
  'checkbox',
  'input',
  {type: 'checkbox'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
