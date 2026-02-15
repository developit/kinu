import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Tree = createSimpleComponent('tree', 'ul');
export const TreeItem = createSimpleComponent('tree-item', 'li');
export const TreeBranch = createSimpleComponent('tree-branch', 'details');
