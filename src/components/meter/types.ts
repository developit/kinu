import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface MeterOwnProps extends BaseProps {}

export type MeterProps = MeterOwnProps &
  Omit<JSX.IntrinsicElements['meter'], keyof MeterOwnProps>;
