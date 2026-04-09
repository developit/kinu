import type {JSX} from 'preact';
import type {BaseProps, RequiredChildrenProps} from '../../types/component-props';

export interface ContextMenuOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the context menu dialog. If not provided, one will be auto-generated.
   */
  id?: string;
}

export type ContextMenuProps = ContextMenuOwnProps;

export interface ContextMenuTriggerOwnProps extends BaseProps {}

export interface ContextMenuContentOwnProps {
  /**
   * Override the auto-generated dialog ID.
   */
  id?: string;
}

export type ContextMenuTriggerProps = ContextMenuTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;

export type ContextMenuContentProps = ContextMenuContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof ContextMenuContentOwnProps>;

// Backward compat re-exports from unified Item types
export type {ContextMenuItemOwnProps, ContextMenuItemProps} from '../item/types';
