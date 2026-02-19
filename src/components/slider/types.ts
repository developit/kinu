import type {JSX} from 'preact';

export interface SliderOwnProps {
  /**
   * Minimum slider value.
   */
  min?: number;

  /**
   * Maximum slider value.
   */
  max?: number;

  /**
   * Current slider value.
   */
  value?: number;

  /**
   * Step granularity for the slider.
   */
  step?: number;

  /**
   * Change handler for the slider input.
   */
  onInput?: JSX.IntrinsicElements['input']['onInput'];

  /**
   * Disable the slider.
   */
  disabled?: boolean;

}

export type SliderProps = SliderOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof SliderOwnProps>;
