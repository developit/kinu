import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export type StatusTone = 'success' | 'warning' | 'info' | 'destructive';

export interface StatusOwnProps extends BaseProps {
  tone?: StatusTone;
}

export type StatusProps = StatusOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof StatusOwnProps>;
