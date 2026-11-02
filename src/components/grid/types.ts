import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Spacing-scale steps for the `gap` prop. Each maps to a `--k-space-*` token.
 */
export type GridGap = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Minimum column width presets for the responsive auto-fit grid.
 */
export type GridMin = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Fixed column counts (override the responsive behaviour).
 */
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6;

export interface GridOwnProps extends BaseProps {
  /**
   * Gap between cells, from the spacing scale.
   * @default 'md'
   */
  gap?: GridGap | null;

  /**
   * Minimum column width for the responsive auto-fit grid. Override directly
   * with the `--k-grid-min` custom property for arbitrary values.
   * @default 'md'
   */
  min?: GridMin | null;

  /**
   * Fixed number of equal-width columns. Overrides the responsive auto-fit.
   */
  cols?: GridCols | null;
}

export type GridProps = GridOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof GridOwnProps>;
