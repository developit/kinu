import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  TreeRootOwnProps,
  TreeGroupOwnProps,
  TreeGroupLabelOwnProps,
  TreeGroupItemsOwnProps,
  TreeItemOwnProps,
} from './types';
import './style.css';

const TreeRoot = createSimpleComponent<'div', TreeRootOwnProps>('tree', 'div');
const TreeGroup = createSimpleComponent<'details', TreeGroupOwnProps>(
  'tree-item',
  'details',
);
const TreeGroupLabel = createSimpleComponent<'summary', TreeGroupLabelOwnProps>(
  'tree-label',
  'summary',
);
const TreeGroupItems = createSimpleComponent<'div', TreeGroupItemsOwnProps>(
  'tree-group',
  'div',
);
const TreeItem = createSimpleComponent<'button', TreeItemOwnProps>(
  'tree-leaf',
  'button',
);

export const Tree = Object.assign(TreeRoot, {
  Group: TreeGroup,
  GroupLabel: TreeGroupLabel,
  GroupItems: TreeGroupItems,
  Item: TreeItem,
});
