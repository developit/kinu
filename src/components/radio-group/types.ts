import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface RadioGroupOwnProps extends BaseProps {
}

export interface RadioOwnProps {
  /**
   * Controls the checked state.
   */
  checked?: boolean;

  /**
   * Radio group name.
   */
  name?: string;

  /**
   * Radio value used for form submissions.
   */
  value?: JSX.IntrinsicElements['input']['value'];

  /**
   * Change handler for the radio.
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];

  /**
   * Disable the radio input.
   */
  disabled?: boolean;

}

export type RadioGroupProps = RadioGroupOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof RadioGroupOwnProps>;

export type RadioProps = RadioOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof RadioOwnProps>;
