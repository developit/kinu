import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Visual variants supported by Alert.
 */
export type AlertVariant = 'destructive';

export interface AlertOwnProps extends BaseProps {
  /**
   * Visual style variant.
   * @default 'default'
   */
  variant?: AlertVariant;
}

export type AlertProps = AlertOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof AlertOwnProps>;
