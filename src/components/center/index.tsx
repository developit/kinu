import {createSimpleComponent} from '../../lib/create-simple-component';
import type {CenterOwnProps} from './types';
import './style.css';

export const Center = createSimpleComponent<'div', CenterOwnProps>(
  'center',
  'div',
);
