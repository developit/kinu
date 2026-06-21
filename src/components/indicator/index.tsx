import {createSimpleComponent} from '../../lib/create-simple-component';
import type {IndicatorOwnProps} from './types';
import './style.css';

export const Indicator = createSimpleComponent<'span', IndicatorOwnProps>(
  'indicator',
  'span',
);
