import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {RadioGroupOwnProps, RadioOwnProps} from './types';
import './style.css';

export const RadioGroup = createSimpleComponent<'div', RadioGroupOwnProps>(
  'radio-group',
  'div',
);
export const Radio = createSimpleComponent<'input', RadioOwnProps>(
  'radio',
  'input',
  {type: 'radio'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
