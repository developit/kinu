import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface PasswordInputOwnProps extends BaseProps {
  /**
   * Start with the password revealed (type="text").
   */
  defaultRevealed?: boolean | null;
}

export type PasswordInputProps = PasswordInputOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof PasswordInputOwnProps | 'k' | 'ref'>;

export interface PasswordFieldOwnProps extends BaseProps {}
export interface PasswordToggleOwnProps extends BaseProps {}
