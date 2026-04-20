import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export type StatusVariant = 'success' | 'warning' | 'info' | 'destructive';

export interface StatusOwnProps extends BaseProps {
  variant?: StatusVariant;
  /** Animate the dot with a pulsing "ping" ring. */
  pulse?: boolean;
}

export type StatusProps = StatusOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof StatusOwnProps>;
