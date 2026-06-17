import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  StatOwnProps,
  StatLabelOwnProps,
  StatValueOwnProps,
  StatDeltaOwnProps,
} from './types';
import './style.css';

const StatRoot = createSimpleComponent<'div', StatOwnProps>('stat', 'div');

const StatLabel = createSimpleComponent<'div', StatLabelOwnProps>(
  'stat-label',
  'div',
);

const StatValue = createSimpleComponent<'div', StatValueOwnProps>(
  'stat-value',
  'div',
);

const StatDelta = createSimpleComponent<'span', StatDeltaOwnProps>(
  'stat-delta',
  'span',
);

export const Stat = Object.assign(StatRoot, {
  Label: StatLabel,
  Value: StatValue,
  Delta: StatDelta,
});
