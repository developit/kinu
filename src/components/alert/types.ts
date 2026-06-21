import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Visual variants supported by Alert.
 */
export type AlertVariant = 'destructive' | 'info' | 'success' | 'warning';

export interface AlertOwnProps extends BaseProps {
  /**
   * Visual style variant.
   * @default 'default'
   */
  variant?: AlertVariant;

  /**
   * Render as a full-bleed, square-cornered, page-level banner. Composes with
   * any tone `variant`.
   */
  banner?: boolean | null;
}

export type AlertProps = AlertOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof AlertOwnProps>;
