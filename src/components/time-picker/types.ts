import type {JSX} from 'preact';

export interface TimePickerOwnProps {
  /**
   * Current time value in HH:MM or HH:MM:SS format.
   */
  value?: JSX.IntrinsicElements['input']['value'];

  /**
   * Change handler for time input.
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

  /**
   * Granularity of the time value in seconds.
   * Common values: 60 (1 min), 900 (15 min), 1800 (30 min).
   * @default 60
   */
  step?: number;
}

export type TimePickerProps = TimePickerOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof TimePickerOwnProps>;
