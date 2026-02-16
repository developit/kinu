import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ScrollAreaOwnProps} from './types';
import './style.css';

export const ScrollArea = createSimpleComponent<'div', ScrollAreaOwnProps>(
  'scroll-area',
  'div',
);
