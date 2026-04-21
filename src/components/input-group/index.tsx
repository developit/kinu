import {createSimpleComponent} from '../../lib/create-simple-component';
import type {InputGroupOwnProps} from './types';
import './style.css';

export const InputGroup = createSimpleComponent<'fieldset', InputGroupOwnProps>(
  'input-group',
  'fieldset',
);
