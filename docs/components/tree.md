# Tree

Composable tree view built from native `<details>` and `<summary>` primitives.

## Usage

```tsx
import {Tree, TreeGroup, TreeItem, TreeLabel, TreeLeaf} from 'pui';

<Tree>
  <TreeItem open>
    <TreeLabel>src</TreeLabel>
    <TreeGroup>
      <TreeLeaf>index.ts</TreeLeaf>
      <TreeItem>
        <TreeLabel>components</TreeLabel>
        <TreeGroup>
          <TreeLeaf>button.tsx</TreeLeaf>
        </TreeGroup>
      </TreeItem>
    </TreeGroup>
  </TreeItem>
</Tree>
```

## Exports

| Export | Element | Notes |
| --- | --- | --- |
| Tree | `div` | Container for tree nodes. |
| TreeItem | `details` | Expandable branch node. |
| TreeLabel | `summary` | Branch trigger/label. |
| TreeGroup | `div` | Nested branch container. |
| TreeLeaf | `button` | Terminal node/action row. |

## Notes

- State is fully native through the `open` attribute on each `TreeItem`.
- Nest `TreeItem` components inside `TreeGroup` for deep hierarchies.

---

<source-ref src="src/components/tree/index.tsx"></source-ref>
