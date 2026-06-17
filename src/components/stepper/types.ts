import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Progress state of a single step.
 */
export type StepState = 'upcoming' | 'current' | 'complete';

export interface StepperOwnProps extends BaseProps {}
export type StepperProps = StepperOwnProps &
  Omit<JSX.IntrinsicElements['ol'], keyof StepperOwnProps>;

export interface StepOwnProps extends BaseProps {
  /**
   * Progress state — drives the marker (number / check) and connector color.
   * @default 'upcoming'
   */
  state?: StepState | null;
}
export type StepProps = StepOwnProps &
  Omit<JSX.IntrinsicElements['li'], keyof StepOwnProps | 'k' | 'ref'>;
