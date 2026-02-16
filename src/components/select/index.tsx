import {createSimpleComponent} from '../../lib/create-simple-component';
import type {SelectOwnProps} from './types';
import './style.css';

export const Select = createSimpleComponent<'select', SelectOwnProps>(
  'select',
  'select',
);
