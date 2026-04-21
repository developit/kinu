import type {JSX} from 'preact';

export interface SwitchOwnProps {
  /**
   * Controls the checked state.
   */
  checked?: boolean;

  /**
   * Change handler for the switch.
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];

  /**
   * Disable the switch.
   */
  disabled?: boolean;

  /**
   * Input name used for form submissions.
   */
  name?: string;

  /**
   * Input value used for form submissions.
   */
  value?: JSX.IntrinsicElements['input']['value'];

}

export type SwitchProps = SwitchOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof SwitchOwnProps>;
