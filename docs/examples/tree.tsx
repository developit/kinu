import {Tree} from 'pui';

export function Demo() {
  return (
    <Tree style={{maxWidth: '20rem'}}>
      <Tree.Group open>
        <Tree.GroupLabel>src</Tree.GroupLabel>
        <Tree.GroupItems>
          <Tree.Item>index.ts</Tree.Item>
          <Tree.Group open>
            <Tree.GroupLabel>components</Tree.GroupLabel>
            <Tree.GroupItems>
              <Tree.Item>button.tsx</Tree.Item>
              <Tree.Item>dialog.tsx</Tree.Item>
            </Tree.GroupItems>
          </Tree.Group>
          <Tree.Group>
            <Tree.GroupLabel>lib</Tree.GroupLabel>
            <Tree.GroupItems>
              <Tree.Item>commands.ts</Tree.Item>
            </Tree.GroupItems>
          </Tree.Group>
        </Tree.GroupItems>
      </Tree.Group>
    </Tree>
  );
}

export const code = `<Tree>...</Tree>`;

export default {Demo, code};
