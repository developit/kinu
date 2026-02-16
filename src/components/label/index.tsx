import {createSimpleComponent} from '../../lib/create-simple-component';
import type {LabelOwnProps} from './types';
import './style.css';

export const Label = createSimpleComponent<'label', LabelOwnProps>(
  'label',
  'label',
);
