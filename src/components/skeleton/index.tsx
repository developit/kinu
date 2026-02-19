import {createSimpleComponent} from '../../lib/create-simple-component';
import type {SkeletonOwnProps} from './types';
import './style.css';

export const Skeleton = createSimpleComponent<'div', SkeletonOwnProps>(
  'skeleton',
  'div',
);
