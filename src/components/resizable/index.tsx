import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ResizableOwnProps} from './types';
import './style.css';

export const Resizable = createSimpleComponent<'div', ResizableOwnProps>(
  'resizable',
  'div',
);
