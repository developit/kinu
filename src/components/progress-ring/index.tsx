import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ProgressRingOwnProps} from './types';
import './style.css';

export const ProgressRing = createSimpleComponent<'div', ProgressRingOwnProps>(
  'progress-ring',
  'div',
  {role: 'progressbar'},
);
