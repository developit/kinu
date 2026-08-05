import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Spacing-scale steps for the `gap` prop. Each maps to a `--k-space-*` token.
 */
export type ClusterGap = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Cross-axis alignment of children (maps to `align-items`).
 */
export type ClusterAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Main-axis distribution of children (maps to `justify-content`).
 */
export type ClusterJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export interface ClusterOwnProps extends BaseProps {
  /**
   * Gap between children, from the spacing scale.
   * @default 'sm'
   */
  gap?: ClusterGap | null;

  /**
   * Cross-axis (vertical) alignment of children.
   * @default 'center'
   */
  align?: ClusterAlign | null;

  /**
   * Main-axis (horizontal) distribution of children.
   */
  justify?: ClusterJustify | null;
}

export type ClusterProps = ClusterOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ClusterOwnProps>;
