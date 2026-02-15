const e=`# Tree

Composable tree view built from native \`<details>\` and \`<summary>\` primitives.

## Usage

\`\`\`tsx
import {Tree} from 'pui';

<Tree>
  <Tree.Group open>
    <Tree.GroupLabel>src</Tree.GroupLabel>
    <Tree.GroupItems>
      <Tree.Item>index.ts</Tree.Item>
      <Tree.Group>
        <Tree.GroupLabel>components</Tree.GroupLabel>
        <Tree.GroupItems>
          <Tree.Item>button.tsx</Tree.Item>
        </Tree.GroupItems>
      </Tree.Group>
    </Tree.GroupItems>
  </Tree.Group>
</Tree>
\`\`\`

## Members

| Member | Element | Notes |
| --- | --- | --- |
| \`Tree\` | \`div\` | Root container for tree nodes. |
| \`Tree.Group\` | \`details\` | Expandable branch group. |
| \`Tree.GroupLabel\` | \`summary\` | Branch trigger/label row. |
| \`Tree.GroupItems\` | \`div\` | Nested container for group content. |
| \`Tree.Item\` | \`button\` | Terminal row/action item. |

## Notes

- State is native via the \`open\` attribute on \`Tree.Group\`.
- Nest \`Tree.Group\` inside \`Tree.GroupItems\` for deeper hierarchies.

---

<source-ref src="src/components/tree/index.tsx"></source-ref>
`;export{e as default};
//# sourceMappingURL=tree-C0zp9sb3.js.map
