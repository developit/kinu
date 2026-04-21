import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Size presets supported by Spinner.
 */
export type SpinnerSize = 'sm' | 'lg';

export type SpinnerType =
  | 'turn'
  | 'concentric'
  | 'ripple'
  | 'light'
  | 'radar'
  | 'bubble'
  | 'fold'
  | 'circle'
  | 'dots';

export type SpinnerVariant = 'primary' | 'secondary' | 'destructive';

export interface SpinnerOwnProps extends BaseProps {
  /**
   * Size preset for the spinner.
   */
  size?: SpinnerSize;

  /**
   * Visual style preset for the spinner.
   */
  type?: SpinnerType;

  /**
   * Optional semantic color override. Defaults to inherited text color.
   */
  variant?: SpinnerVariant;
}

export type SpinnerProps = SpinnerOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof SpinnerOwnProps>;
