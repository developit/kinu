import {createSimpleComponent} from '../../lib/create-simple-component';
import type {SpinnerOwnProps} from './types';
import './style.css';

export const Spinner = createSimpleComponent<'span', SpinnerOwnProps>(
  'spinner',
  'span',
);
