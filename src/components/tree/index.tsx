import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Tree = createSimpleComponent('tree', 'div');
export const TreeItem = createSimpleComponent('tree-item', 'details');
export const TreeLabel = createSimpleComponent('tree-label', 'summary');
export const TreeGroup = createSimpleComponent('tree-group', 'div');
export const TreeLeaf = createSimpleComponent('tree-leaf', 'button');

// Alternative nomenclature aliases:
// TreeRoot / TreeBranch / TreeBranchLabel / TreeBranchChildren / TreeNode
// can read clearer when composing nested structures.
export const TreeRoot = Tree;
export const TreeBranch = TreeItem;
export const TreeBranchLabel = TreeLabel;
export const TreeBranchChildren = TreeGroup;
export const TreeNode = TreeLeaf;
