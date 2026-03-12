import type {JSX} from 'preact';

export interface ColorPickerOwnProps {
  /**
   * Current color value as a hex string (e.g. "#ff0000").
   */
  value?: JSX.IntrinsicElements['input']['value'];

  /**
   * Change handler for the color input.
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

export type ColorPickerProps = ColorPickerOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof ColorPickerOwnProps>;
