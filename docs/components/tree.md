# Tree

Composable tree view built from native `<details>` and `<summary>` primitives.

## Usage

```tsx
import {Tree} from 'kinu';

<Tree>
  <Tree.Group open>
    <Tree.GroupLabel>src</Tree.GroupLabel>
    <Tree.GroupItems>
      <Tree.Item>index.ts</Tree.Item>
    </Tree.GroupItems>
  </Tree.Group>
</Tree>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Tree | Tree view | — |
| TreeGroup | Tree branch | `<details k="tree-item">` |
| TreeGroupLabel | Branch label | `<summary k="tree-label">` |
| TreeGroupItems | Branch items | `<div k="tree-group">` |
| TreeItem | Tree leaf | `<button k="tree-leaf">` |

## Props

### TreeGroupProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open | `boolean` | — | Controls the open state of the tree group. |

### TreeItemProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | — | Disable tree item interactions. |

### Static Shortcuts

- `Tree.Group = TreeGroup`
- `Tree.GroupLabel = TreeGroupLabel`
- `Tree.GroupItems = TreeGroupItems`
- `Tree.Item = TreeItem`

## Notes

- State is native via the `open` attribute on `Tree.Group`.
- Nest `Tree.Group` inside `Tree.GroupItems` for deeper hierarchies.

---

_Source: `src/components/tree/index.tsx`
