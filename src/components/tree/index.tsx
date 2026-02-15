import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

const TreeRoot = createSimpleComponent('tree', 'div');
const TreeGroup = createSimpleComponent('tree-item', 'details');
const TreeGroupLabel = createSimpleComponent('tree-label', 'summary');
const TreeGroupItems = createSimpleComponent('tree-group', 'div');
const TreeItem = createSimpleComponent('tree-leaf', 'button');

export const Tree = Object.assign(TreeRoot, {
  Group: TreeGroup,
  GroupLabel: TreeGroupLabel,
  GroupItems: TreeGroupItems,
  Item: TreeItem,
});
