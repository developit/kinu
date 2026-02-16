import type {JSX} from 'preact';

/**
 * Size presets supported by Input.
 */
export type InputSize = 'sm' | 'lg';

export interface InputOwnProps {
  /**
   * Size preset for the input field.
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Marks the input as invalid for styling purposes.
   */
  invalid?: boolean;

  /**
   * Input value.
   */
  value?: JSX.IntrinsicElements['input']['value'];

  /**
   * Input type attribute.
   */
  type?: JSX.IntrinsicElements['input']['type'];

  /**
   * Placeholder text for the input.
   */
  placeholder?: string;

  /**
   * Change handler for controlled inputs.
   */
  onInput?: JSX.IntrinsicElements['input']['onInput'];

  /**
   * Blur handler.
   */
  onBlur?: JSX.IntrinsicElements['input']['onBlur'];

  /**
   * Focus handler.
   */
  onFocus?: JSX.IntrinsicElements['input']['onFocus'];

  /**
   * Disables interactions and applies disabled styling.
   */
  disabled?: boolean;

  /**
   * Input name attribute used for form submissions.
   */
  name?: string;

}

export type InputProps = InputOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof InputOwnProps>;
