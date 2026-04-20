import {createSimpleComponent} from '../../lib/create-simple-component';
import type {StatusOwnProps} from './types';
import './style.css';

export const Status = createSimpleComponent<'span', StatusOwnProps>(
  'status',
  'span',
);
