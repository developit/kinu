import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const NavigationMenu = createSimpleComponent('navigation-menu', 'nav');
export const NavigationMenuList = createSimpleComponent('navigation-menu-list', 'ul');
export const NavigationMenuItem = createSimpleComponent('navigation-menu-item', 'li');
export const NavigationMenuLink = createSimpleComponent('navigation-menu-link', 'a');
