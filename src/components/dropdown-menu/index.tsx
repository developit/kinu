import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const DropdownMenu = createSimpleComponent('dropdown-menu', 'details');
export const DropdownMenuTrigger = createSimpleComponent('dropdown-menu-trigger', 'summary');
export const DropdownMenuContent = createSimpleComponent('dropdown-menu-content', 'div');
export const DropdownMenuItem = createSimpleComponent('dropdown-menu-item', 'div');
