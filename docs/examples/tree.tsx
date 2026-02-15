import {Tree, TreeGroup, TreeItem, TreeLabel, TreeLeaf} from 'pui';

export function Demo() {
  return (
    <Tree style={{maxWidth: '20rem'}}>
      <TreeItem open>
        <TreeLabel>src</TreeLabel>
        <TreeGroup>
          <TreeLeaf>index.ts</TreeLeaf>
          <TreeItem open>
            <TreeLabel>components</TreeLabel>
            <TreeGroup>
              <TreeLeaf>button.tsx</TreeLeaf>
              <TreeLeaf>dialog.tsx</TreeLeaf>
            </TreeGroup>
          </TreeItem>
          <TreeItem>
            <TreeLabel>lib</TreeLabel>
            <TreeGroup>
              <TreeLeaf>commands.ts</TreeLeaf>
            </TreeGroup>
          </TreeItem>
        </TreeGroup>
      </TreeItem>
    </Tree>
  );
}

export const code = `<Tree>...</Tree>`;

export default {Demo, code};
