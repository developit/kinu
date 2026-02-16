import type {JSX} from 'preact';
import type {BaseProps, RequiredChildrenProps} from '../../types/component-props';

export interface DrawerOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the drawer dialog. If not provided, one will be auto-generated.
   */
  id?: string;

}

export type DrawerProps = DrawerOwnProps;

export interface DrawerTriggerOwnProps extends BaseProps {
}

export interface DrawerContentOwnProps {
  /**
   * Override the auto-generated dialog ID.
   */
  id?: string;
}

export interface DrawerCloseOwnProps extends BaseProps {
}

export type DrawerTriggerProps = DrawerTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;

export type DrawerContentProps = DrawerContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof DrawerContentOwnProps>;

export type DrawerCloseProps = DrawerCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;
