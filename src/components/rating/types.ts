import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Star size presets.
 */
export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingOwnProps extends BaseProps {
  /**
   * Form field name. The rating submits its value under this name.
   */
  name?: string | null;

  /**
   * Initial rating (0 through `count`).
   */
  value?: number | null;

  /**
   * Number of stars.
   * @default 5
   */
  count?: number | null;

  /**
   * Render a non-interactive display of `value`.
   */
  readOnly?: boolean | null;

  /**
   * Star size.
   * @default 'md'
   */
  size?: RatingSize | null;
}

export type RatingProps = RatingOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof RatingOwnProps | 'k' | 'ref'>;

export interface RatingInputOwnProps extends BaseProps {}
