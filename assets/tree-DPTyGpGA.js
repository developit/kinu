const e=`# Tree

Composable tree view built from native \`<details>\` and \`<summary>\` primitives.

## Usage

\`\`\`tsx
import {Tree} from 'kinu';

<Tree>
  <Tree.Group open>
    <Tree.GroupLabel>src</Tree.GroupLabel>
    <Tree.GroupItems>
      <Tree.Item>index.ts</Tree.Item>
    </Tree.GroupItems>
  </Tree.Group>
</Tree>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Tree | Tree view | — |

## Notes

- State is native via the \`open\` attribute on \`Tree.Group\`.
- Nest \`Tree.Group\` inside \`Tree.GroupItems\` for deeper hierarchies.

---

_Source: \`src/components/tree/index.tsx\`
`;export{e as default};
//# sourceMappingURL=tree-DPTyGpGA.js.map
