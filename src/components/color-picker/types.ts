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

  /**
   * Render an adjacent screen-sampling button (EyeDropper API). Only appears
   * in browsers that implement EyeDropper.
   */
  eyedropper?: boolean;
}

export type ColorPickerProps = ColorPickerOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof ColorPickerOwnProps>;
