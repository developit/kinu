import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Visual variants supported by Badge.
 */
export type BadgeVariant = 'secondary' | 'destructive' | 'outline';

export interface BadgeOwnProps extends BaseProps {
  /**
   * Visual style variant.
   * @default 'default'
   */
  variant?: BadgeVariant;
}

export type BadgeProps = BadgeOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof BadgeOwnProps>;
