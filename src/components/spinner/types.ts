import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Size presets supported by Spinner.
 */
export type SpinnerSize = 'sm' | 'lg';

export interface SpinnerOwnProps extends BaseProps {
  /**
   * Size preset for the spinner.
   * @default 'md'
   */
  size?: SpinnerSize;
}

export type SpinnerProps = SpinnerOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof SpinnerOwnProps>;
