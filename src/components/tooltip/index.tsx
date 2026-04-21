import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TooltipOwnProps} from './types';
import './style.css';

export const Tooltip = createSimpleComponent<'span', TooltipOwnProps>(
  'tooltip',
  'span',
);
