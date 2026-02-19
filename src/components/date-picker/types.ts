import type {JSX} from 'preact';

export interface DatePickerOwnProps {
  /**
   * Current date value.
   */
  value?: JSX.IntrinsicElements['input']['value'];

  /**
   * Change handler for date input.
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];

  /**
   * Disable the input.
   */
  disabled?: boolean;

  /**
   * Input name used for form submissions.
   */
  name?: string;

}

export type DatePickerProps = DatePickerOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof DatePickerOwnProps>;
