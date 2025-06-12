import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import './style.css';

export const RadioGroup = createSimpleComponent('radio-group', 'div');
export const Radio = createSimpleComponent(
  'radio',
  'input',
  {type: 'radio'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
