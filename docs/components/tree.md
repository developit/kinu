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
| Tree.Group | Tree branch | `<details k="tree-item">` |
| Tree.GroupLabel | Branch label | `<summary k="tree-label">` |
| Tree.GroupItems | Branch items | `<div k="tree-group">` |
| Tree.Item | Tree leaf | `<button k="tree-leaf">` |

## Props

### Tree.GroupProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open | `boolean` | — | Controls the open state of the tree group. |

### Tree.ItemProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | — | Disable tree item interactions. |

## Notes

- State is native via the `open` attribute on `Tree.Group`.
- Nest `Tree.Group` inside `Tree.GroupItems` for deeper hierarchies.
- Add `virtual` to render nodes on demand via CSS `content-visibility` — same trade as List, and nodes remain findable in the DOM.

---

_Source: `src/components/tree/index.tsx`
