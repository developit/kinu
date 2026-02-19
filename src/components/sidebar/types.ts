import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface SidebarOwnProps extends BaseProps {

  /**
   * Optional ID for the sidebar dialog.
   */
  id?: string;
}

export type SidebarProps = SidebarOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof SidebarOwnProps>;

export interface SidebarTriggerOwnProps extends BaseProps {

  /**
   * Target sidebar ID to control.
   */
  commandfor?: string;
}

export type SidebarTriggerProps = SidebarTriggerOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof SidebarTriggerOwnProps>;
