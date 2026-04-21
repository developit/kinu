import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface SeparatorOwnProps extends BaseProps {}

export type SeparatorProps = SeparatorOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof SeparatorOwnProps>;
