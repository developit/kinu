import type {JSX} from 'preact';

export interface CheckboxOwnProps {
  /**
   * Controls the checked state.
   */
  checked?: boolean;

  /**
   * Marks the checkbox as indeterminate for styling.
   */
  'data-state'?: 'indeterminate';

  /**
   * Change handler for the checkbox.
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];

  /**
   * Disable the checkbox.
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

export type CheckboxProps = CheckboxOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof CheckboxOwnProps>;
