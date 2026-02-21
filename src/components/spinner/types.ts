import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Size presets supported by Spinner.
 */
export type SpinnerSize = 'sm' | 'lg';

export type SpinnerVariant =
  | 'turn'
  | 'concentric'
  | 'concentric2'
  | 'ripple'
  | 'light'
  | 'ghost'
  | 'radar'
  | 'bubble'
  | 'fold'
  | 'thinking';

export interface SpinnerOwnProps extends BaseProps {
  /**
   * Size preset for the spinner.
   */
  size?: SpinnerSize;

  /**
   * Visual style preset for the spinner.
   */
  variant?: SpinnerVariant;
}

export type SpinnerProps = SpinnerOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof SpinnerOwnProps>;
