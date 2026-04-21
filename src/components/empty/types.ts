import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface EmptyOwnProps extends BaseProps {}

export type EmptyProps = EmptyOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof EmptyOwnProps>;
