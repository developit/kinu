import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ToggleOwnProps extends BaseProps {
  /**
   * Controls the pressed state and maps to `aria-pressed` on the DOM element.
   */
  pressed?: boolean;

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
