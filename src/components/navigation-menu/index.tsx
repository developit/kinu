import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  NavigationMenuOwnProps,
  NavigationMenuListOwnProps,
  NavigationMenuItemOwnProps,
  NavigationMenuLinkOwnProps,
} from './types';
import './style.css';

export const NavigationMenu = createSimpleComponent<
  'nav',
  NavigationMenuOwnProps
>('navigation-menu', 'nav');
export const NavigationMenuList = createSimpleComponent<
  'ul',
  NavigationMenuListOwnProps
>('navigation-menu-list', 'ul');
export const NavigationMenuItem = createSimpleComponent<
  'li',
  NavigationMenuItemOwnProps
>('navigation-menu-item', 'li');
export const NavigationMenuLink = createSimpleComponent<
  'a',
  NavigationMenuLinkOwnProps
>('navigation-menu-link', 'a');
