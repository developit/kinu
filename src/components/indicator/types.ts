import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Corner the badge/dot sits in.
 */
export type IndicatorPlacement =
  | 'top-end'
  | 'top-start'
  | 'bottom-end'
  | 'bottom-start';

export interface IndicatorOwnProps extends BaseProps {
  /**
   * Which corner to place the overlay in.
   * @default 'top-end'
   */
  placement?: IndicatorPlacement | null;

  /**
   * Show a small dot instead of a counted Badge child.
   */
  dot?: boolean | null;
}

export type IndicatorProps = IndicatorOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof IndicatorOwnProps>;
