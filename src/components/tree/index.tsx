import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Tree = createSimpleComponent('tree', 'div');
export const TreeItem = createSimpleComponent('tree-item', 'details');
export const TreeLabel = createSimpleComponent('tree-label', 'summary');
export const TreeGroup = createSimpleComponent('tree-group', 'div');
export const TreeLeaf = createSimpleComponent('tree-leaf', 'button');
