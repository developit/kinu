import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface NavigationMenuOwnProps extends BaseProps {
}

export interface NavigationMenuListOwnProps extends BaseProps {
}

export interface NavigationMenuItemOwnProps extends BaseProps {
}

export interface NavigationMenuLinkOwnProps extends BaseProps {
}

export type NavigationMenuProps = NavigationMenuOwnProps &
  Omit<JSX.IntrinsicElements['nav'], keyof NavigationMenuOwnProps>;

export type NavigationMenuListProps = NavigationMenuListOwnProps &
  Omit<JSX.IntrinsicElements['ul'], keyof NavigationMenuListOwnProps>;

export type NavigationMenuItemProps = NavigationMenuItemOwnProps &
  Omit<JSX.IntrinsicElements['li'], keyof NavigationMenuItemOwnProps>;

export type NavigationMenuLinkProps = NavigationMenuLinkOwnProps &
  Omit<JSX.IntrinsicElements['a'], keyof NavigationMenuLinkOwnProps>;
