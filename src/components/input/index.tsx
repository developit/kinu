import {createSimpleComponent} from '../../lib/create-simple-component';
import type {InputOwnProps} from './types';
import './style.css';

export const Input = createSimpleComponent<'input', InputOwnProps>(
  'input',
  'input',
);
