import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ComboboxOwnProps extends BaseProps {}

export type ComboboxProps = ComboboxOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof ComboboxOwnProps>;

export interface ComboboxInputOwnProps {
  /**
   * Input value for controlled usage.
   */
  value?: JSX.IntrinsicElements['input']['value'];

  /**
   * Placeholder text for the input.
   */
  placeholder?: string;

  /**
   * Change handler for controlled inputs.
   */
  onInput?: JSX.IntrinsicElements['input']['onInput'];

  /**
   * Disable the input.
   */
  disabled?: boolean;
}

export interface ComboboxListOwnProps extends BaseProps {}

export type ComboboxInputProps = ComboboxInputOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof ComboboxInputOwnProps>;

export type ComboboxListProps = ComboboxListOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof ComboboxListOwnProps>;

// Backward compat re-exports from unified Item types
export type {ComboboxItemOwnProps as ComboboxOptionOwnProps, ComboboxItemProps as ComboboxOptionProps} from '../item/types';
