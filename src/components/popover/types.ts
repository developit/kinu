import type {JSX} from 'preact';
import type {BaseProps, RequiredChildrenProps} from '../../types/component-props';

export interface PopoverOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the popover content. If not provided, one will be auto-generated.
   */
  id?: string;

}

export type PopoverProps = PopoverOwnProps;

export interface PopoverTriggerOwnProps extends BaseProps {
}

export interface PopoverContentOwnProps {
  /**
   * Override the auto-generated dialog ID.
   */
  id?: string;

  /**
   * When set to `"drawer"`, renders as a bottom-sheet drawer on mobile (≤640px)
   * while keeping popover behavior on larger screens.
   */
  mobile?: 'drawer';
}

export interface PopoverCloseOwnProps extends BaseProps {
}

export type PopoverTriggerProps = PopoverTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;

export type PopoverContentProps = PopoverContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof PopoverContentOwnProps>;

export type PopoverCloseProps = PopoverCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;
