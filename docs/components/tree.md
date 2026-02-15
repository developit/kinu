# Tree

Composable tree view built from native `<details>` and `<summary>` primitives.

## Usage

```tsx
import {
  TreeRoot,
  TreeBranch,
  TreeBranchLabel,
  TreeBranchChildren,
  TreeNode,
} from 'pui';

<TreeRoot>
  <TreeBranch open>
    <TreeBranchLabel>src</TreeBranchLabel>
    <TreeBranchChildren>
      <TreeNode>index.ts</TreeNode>
      <TreeBranch>
        <TreeBranchLabel>components</TreeBranchLabel>
        <TreeBranchChildren>
          <TreeNode>button.tsx</TreeNode>
        </TreeBranchChildren>
      </TreeBranch>
    </TreeBranchChildren>
  </TreeBranch>
</TreeRoot>
```

## Exports

| Export | Element | Notes |
| --- | --- | --- |
| Tree / TreeRoot | `div` | Container for tree nodes. |
| TreeItem / TreeBranch | `details` | Expandable branch node. |
| TreeLabel / TreeBranchLabel | `summary` | Branch trigger/label. |
| TreeGroup / TreeBranchChildren | `div` | Nested branch container. |
| TreeLeaf / TreeNode | `button` | Terminal node/action row. |

## Nomenclature options

You can use either naming style depending on what reads best in your codebase:

- **Compact**: `Tree`, `TreeItem`, `TreeLabel`, `TreeGroup`, `TreeLeaf`
- **Semantic**: `TreeRoot`, `TreeBranch`, `TreeBranchLabel`, `TreeBranchChildren`, `TreeNode`

Both styles are functionally equivalent and map to the same native elements.

## Notes

- State is fully native through the `open` attribute on each branch (`TreeItem`/`TreeBranch`).
- Nest branches inside `TreeGroup`/`TreeBranchChildren` for deep hierarchies.

---

<source-ref src="src/components/tree/index.tsx"></source-ref>
