import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Popover = createSimpleComponent('popover', 'details');
export const PopoverTrigger = createSimpleComponent('popover-trigger', 'summary');
export const PopoverContent = createSimpleComponent('popover-content', 'div');
