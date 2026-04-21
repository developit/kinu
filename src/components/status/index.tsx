import {createSimpleComponent} from '../../lib/create-simple-component';
import type {StatusOwnProps} from './types';
import './style.css';
import '../tooltip/style.css';

export const Status = createSimpleComponent<'span', StatusOwnProps>(
  'status',
  'span',
);
