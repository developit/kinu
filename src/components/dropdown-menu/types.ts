import type {JSX} from 'preact';
import type {BaseProps, RequiredChildrenProps} from '../../types/component-props';

export interface DropdownMenuOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the dropdown content. If not provided, one will be auto-generated.
   */
  id?: string;
}

export type DropdownMenuProps = DropdownMenuOwnProps;

export interface DropdownMenuTriggerOwnProps extends BaseProps {}

export interface DropdownMenuContentOwnProps {
  /**
   * Override the auto-generated dialog ID.
   */
  id?: string;

  /**
   * Command dispatched when the dialog receives the command event.
   * @default 'close'
   */
  command?: string;

  /**
   * Target dialog identifier for the command dispatch.
   */
  commandFor?: string;

  /**
   * Align the menu panel to the trigger's left or right edge.
   */
  to?: 'left';
}

export interface DropdownMenuItemOwnProps extends BaseProps {
  /**
   * When provided, renders the item as an anchor element.
   */
  href?: string;

  /**
   * Marks the item as selected for styling.
   */
  selected?: boolean;

  /**
   * Optional shortcut hint rendered on the trailing edge.
   */
  shortcut?: string;

  /**
   * Applies destructive styling to the item.
   */
  destructive?: boolean;
}

export interface DropdownMenuSubTriggerOwnProps extends DropdownMenuItemOwnProps {}

export type DropdownMenuTriggerProps = DropdownMenuTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;

export type DropdownMenuContentProps = DropdownMenuContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof DropdownMenuContentOwnProps>;

export type DropdownMenuItemProps = DropdownMenuItemOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof DropdownMenuItemOwnProps> &
  Omit<JSX.IntrinsicElements['a'], keyof DropdownMenuItemOwnProps>;

export type DropdownMenuSubTriggerProps = DropdownMenuSubTriggerOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof DropdownMenuSubTriggerOwnProps> &
  Omit<JSX.IntrinsicElements['a'], keyof DropdownMenuSubTriggerOwnProps>;
