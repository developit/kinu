import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface CopyButtonOwnProps extends BaseProps {
  /**
   * Text to copy. Takes precedence over `for`.
   */
  value?: string | null;

  /**
   * CSS selector whose `textContent` is copied when `value` is absent.
   */
  for?: string | null;

  /**
   * Idle label, rendered via CSS.
   * @default 'Copy'
   */
  label?: string | null;

  /**
   * Label shown briefly after a successful copy, rendered via CSS.
   * @default 'Copied'
   */
  copiedLabel?: string | null;
}

export type CopyButtonProps = CopyButtonOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof CopyButtonOwnProps | 'k' | 'ref'>;
