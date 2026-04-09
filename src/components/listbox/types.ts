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

export type ListboxInputProps = ListboxInputOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof ListboxInputOwnProps>;

export type ListboxListProps = ListboxListOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ListboxListOwnProps>;

// Backward compat re-exports from unified Item types
export type {ListboxItemOwnProps as ListboxOptionOwnProps, ListboxItemProps as ListboxOptionProps} from '../item/types';
