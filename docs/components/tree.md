# Tree

Composable tree view built from native `<details>` and `<summary>` primitives.

## Usage

```tsx
import {Tree} from 'pui';

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

| Name | DOM element | Details |
| --- | --- | --- |
| Tree | — | Custom component implemented in the source file. |

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- State is native via the `open` attribute on `Tree.Group`.
- Nest `Tree.Group` inside `Tree.GroupItems` for deeper hierarchies.

---

_Source: `src/components/tree/index.tsx`
