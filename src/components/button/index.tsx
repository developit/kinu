import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ButtonOwnProps} from './types';
import './style.css';

export const Button = createSimpleComponent<'button' | 'a', ButtonOwnProps>(
  'button',
  (props) => (props.href ? 'a' : 'button'),
  {
    get type() {
      return this.href ? undefined : 'button';
    },
  },
);
