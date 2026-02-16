import type {JSX} from 'preact';

export interface CalendarOwnProps {
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

export type CalendarProps = CalendarOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof CalendarOwnProps>;
