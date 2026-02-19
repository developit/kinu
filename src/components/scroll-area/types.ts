import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ScrollAreaOwnProps extends BaseProps {}

export type ScrollAreaProps = ScrollAreaOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ScrollAreaOwnProps>;
