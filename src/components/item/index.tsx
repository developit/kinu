import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ItemOwnProps} from './types';
import './style.css';

export const Item = createSimpleComponent<'button' | 'a', ItemOwnProps>(
  'item',
  (props) => (props.href ? 'a' : 'button'),
  {tabIndex: -1},
);
