import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Spacing-scale steps for the `gap` prop. Each maps to a `--k-space-*` token.
 */
export type RowGap = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Cross-axis alignment of children (maps to `align-items`).
 */
export type RowAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Main-axis distribution of children (maps to `justify-content`).
 */
export type RowJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export interface RowOwnProps extends BaseProps {
  /**
   * Gap between children, from the spacing scale.
   * @default 'sm'
   */
  gap?: RowGap | null;

  /**
   * Cross-axis (vertical) alignment of children.
   * @default 'center'
   */
  align?: RowAlign | null;

  /**
   * Main-axis (horizontal) distribution of children.
   */
  justify?: RowJustify | null;

  /**
   * Allow children to wrap onto multiple lines. (Row does not wrap by default —
   * reach for `Cluster` when wrapping is the point.)
   */
  wrap?: boolean | null;
}

export type RowProps = RowOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof RowOwnProps>;
