import {createSimpleComponent} from '../../lib/create-simple-component';
import type {MeterOwnProps} from './types';
import './style.css';

export const Meter = createSimpleComponent<'meter', MeterOwnProps>(
  'meter',
  'meter',
);
