import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ToggleOwnProps extends BaseProps {
  /**
   * Convenience prop that maps to `aria-pressed`.
   */
  pressed?: boolean;

  /**
   * Controls the pressed state via aria-pressed. Takes precedence over `pressed`.
   */
  'aria-pressed'?: 'true' | 'false' | boolean;

  /**
   * Click handler for toggling state.
   */
  onClick?: JSX.IntrinsicElements['button']['onClick'];

  /**
   * Disable the toggle.
   */
  disabled?: boolean;
}

export type ToggleProps = ToggleOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ToggleOwnProps>;
