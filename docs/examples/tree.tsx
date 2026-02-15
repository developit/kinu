import {
  TreeRoot,
  TreeBranch,
  TreeBranchLabel,
  TreeBranchChildren,
  TreeNode,
} from 'pui';

export function Demo() {
  return (
    <TreeRoot style={{maxWidth: '20rem'}}>
      <TreeBranch open>
        <TreeBranchLabel>src</TreeBranchLabel>
        <TreeBranchChildren>
          <TreeNode>index.ts</TreeNode>
          <TreeBranch open>
            <TreeBranchLabel>components</TreeBranchLabel>
            <TreeBranchChildren>
              <TreeNode>button.tsx</TreeNode>
              <TreeNode>dialog.tsx</TreeNode>
            </TreeBranchChildren>
          </TreeBranch>
          <TreeBranch>
            <TreeBranchLabel>lib</TreeBranchLabel>
            <TreeBranchChildren>
              <TreeNode>commands.ts</TreeNode>
            </TreeBranchChildren>
          </TreeBranch>
        </TreeBranchChildren>
      </TreeBranch>
    </TreeRoot>
  );
}

export const code = `<TreeRoot>...</TreeRoot>`;

export default {Demo, code};
