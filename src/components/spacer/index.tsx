import {createSimpleComponent} from '../../lib/create-simple-component';
import type {SpacerOwnProps} from './types';
import './style.css';

export const Spacer = createSimpleComponent<'div', SpacerOwnProps>(
  'spacer',
  'div',
);
