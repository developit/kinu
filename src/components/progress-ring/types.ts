import type {JSX} from 'preact';

export type ProgressRingVariant = 'primary' | 'secondary' | 'destructive';

export interface ProgressRingOwnProps {
  /**
   * Current progress value. Omit (or pass `undefined`) to render as indeterminate.
   */
  value?: number;

  /**
   * Maximum progress value. Defaults to 100.
   */
  max?: number;

  /**
   * Preset size.
   */
  size?: 'sm' | 'lg';

  /**
   * Optional semantic color override. Defaults to inherited text color.
   */
  variant?: ProgressRingVariant;
}

export type ProgressRingProps = ProgressRingOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ProgressRingOwnProps>;
