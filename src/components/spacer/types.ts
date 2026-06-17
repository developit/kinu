import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Fixed-size presets, mapping to `--k-space-*` tokens.
 */
export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpacerOwnProps extends BaseProps {
  /**
   * Render a fixed gap (along the main axis) instead of flexing to fill the
   * available space.
   */
  size?: SpacerSize | null;
}

export type SpacerProps = SpacerOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof SpacerOwnProps>;
