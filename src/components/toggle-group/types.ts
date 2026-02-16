import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ToggleGroupOwnProps extends BaseProps {}

export type ToggleGroupProps = ToggleGroupOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ToggleGroupOwnProps>;
