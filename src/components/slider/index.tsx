import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import './style.css';

export const Slider = createSimpleComponent(
  'slider',
  'input',
  {type: 'range'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
