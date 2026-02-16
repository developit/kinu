import {createSimpleComponent} from '../../lib/create-simple-component';
import type {SeparatorOwnProps} from './types';
import './style.css';

export const Separator = createSimpleComponent<'div', SeparatorOwnProps>(
  'separator',
  'div',
);
