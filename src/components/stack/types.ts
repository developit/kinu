import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Spacing-scale steps for the `gap` prop. Each maps to a `--k-space-*` token.
 */
export type StackGap = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Cross-axis alignment of children (maps to `align-items`).
 */
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Main-axis distribution of children (maps to `justify-content`).
 */
export type StackJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export interface StackOwnProps extends BaseProps {
  /**
   * Gap between children, from the spacing scale.
   * @default 'md'
   */
  gap?: StackGap | null;

  /**
   * Cross-axis (horizontal) alignment of children.
   */
  align?: StackAlign | null;

  /**
   * Main-axis (vertical) distribution of children.
   */
  justify?: StackJustify | null;
}

export type StackProps = StackOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof StackOwnProps>;
