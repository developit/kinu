import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TableOwnProps} from './types';
import './style.css';

export const Table = createSimpleComponent<'table', TableOwnProps>(
  'table',
  'table',
);
