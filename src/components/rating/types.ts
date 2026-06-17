import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Star size presets.
 */
export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingOwnProps extends BaseProps {
  /**
   * Radio-group name. Required so the rating is form-associated.
   */
  name: string;

  /**
   * Initially selected rating (1 through `count`).
   */
  value?: number | null;

  /**
   * Number of stars.
   * @default 5
   */
  count?: number | null;

  /**
   * Render a non-interactive display of `value` (disables the inputs).
   */
  readOnly?: boolean | null;

  /**
   * Star size.
   * @default 'md'
   */
  size?: RatingSize | null;
}

export type RatingProps = RatingOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof RatingOwnProps>;
