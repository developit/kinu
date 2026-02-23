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

export interface ComboboxOptionOwnProps extends BaseProps {

  /**
   * Marks the option as selected for styling.
   */
  selected?: boolean;

  /**
   * Optional shortcut hint rendered on the trailing edge.
   */
  shortcut?: string;

  /**
   * Applies destructive styling to the option.
   */
  destructive?: boolean;
}

export type ComboboxInputProps = ComboboxInputOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof ComboboxInputOwnProps>;

export type ComboboxListProps = ComboboxListOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof ComboboxListOwnProps>;

export type ComboboxOptionProps = ComboboxOptionOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ComboboxOptionOwnProps>;
