import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ClusterOwnProps} from './types';
import './style.css';

export const Cluster = createSimpleComponent<'div', ClusterOwnProps>(
  'cluster',
  'div',
);
