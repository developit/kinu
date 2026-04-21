import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ToggleGroupOwnProps} from './types';
import './style.css';

export const ToggleGroup = createSimpleComponent<'div', ToggleGroupOwnProps>(
  'toggle-group',
  'div',
);
