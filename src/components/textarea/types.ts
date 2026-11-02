import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TextareaOwnProps extends BaseProps {
  /**
   * Number of visible text rows.
   */
  rows?: number;

  /**
   * Placeholder text for the textarea.
   */
  placeholder?: string;

  /**
   * Textarea value.
   */
  value?: JSX.IntrinsicElements['textarea']['value'];

  /**
   * Change handler for controlled textareas.
   */
  onInput?: JSX.IntrinsicElements['textarea']['onInput'];

  /**
   * Disables interactions and applies disabled styling.
   */
  disabled?: boolean;

  /**
   * Grow the textarea to fit its content via native `field-sizing: content`
   * (Chromium + Firefox; falls back to the fixed height elsewhere).
   */
  autosize?: boolean | null;
}

export type TextareaProps = TextareaOwnProps &
  Omit<JSX.IntrinsicElements['textarea'], keyof TextareaOwnProps>;
