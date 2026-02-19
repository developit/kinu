import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ProgressOwnProps} from './types';
import './style.css';

export const Progress = createSimpleComponent<'progress', ProgressOwnProps>(
  'progress',
  'progress',
);
