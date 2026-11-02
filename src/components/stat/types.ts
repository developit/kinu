import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Trend direction for `Stat.Delta`, mapped to a semantic color.
 */
export type StatTrend = 'up' | 'down' | 'flat';

export interface StatOwnProps extends BaseProps {}
export type StatProps = StatOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof StatOwnProps>;

export interface StatLabelOwnProps extends BaseProps {}
export type StatLabelProps = StatLabelOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof StatLabelOwnProps>;

export interface StatValueOwnProps extends BaseProps {}
export type StatValueProps = StatValueOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof StatValueOwnProps>;

export interface StatDeltaOwnProps extends BaseProps {
  /**
   * Trend direction — colors the delta (up = success, down = destructive).
   */
  trend?: StatTrend | null;
}
export type StatDeltaProps = StatDeltaOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof StatDeltaOwnProps>;
