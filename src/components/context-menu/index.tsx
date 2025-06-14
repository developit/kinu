import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import './style.css';

export const ContextMenu = createSimpleComponent(
  'context-menu',
  'menu',
  {type: 'context'} as Partial<JSX.HTMLAttributes<HTMLMenuElement>>,
);
export const ContextMenuItem = createSimpleComponent('context-menu-item', 'menuitem');
