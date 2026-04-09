import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ListboxOwnProps extends BaseProps {}

export type ListboxProps = ListboxOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ListboxOwnProps>;

export interface ListboxInputOwnProps {
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

export interface ListboxListOwnProps extends BaseProps {}

export interface ListboxOptionOwnProps extends BaseProps {
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

export type ListboxInputProps = ListboxInputOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof ListboxInputOwnProps>;

export type ListboxListProps = ListboxListOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ListboxListOwnProps>;

export type ListboxOptionProps = ListboxOptionOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ListboxOptionOwnProps>;
