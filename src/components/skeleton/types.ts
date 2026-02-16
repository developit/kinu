import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface SkeletonOwnProps extends BaseProps {}

export type SkeletonProps = SkeletonOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof SkeletonOwnProps>;
