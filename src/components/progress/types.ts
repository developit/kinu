import type {JSX} from 'preact';

export interface ProgressOwnProps {
  /**
   * Current progress value.
   */
  value?: number;

  /**
   * Maximum progress value.
   */
  max?: number;

  /**
   * Marks the progress as indeterminate for styling.
   */
  'data-state'?: 'indeterminate';

}

export type ProgressProps = ProgressOwnProps &
  Omit<JSX.IntrinsicElements['progress'], keyof ProgressOwnProps>;
