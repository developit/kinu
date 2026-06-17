# Cluster

Horizontal wrap row with a token-based gap — chip rows, button rows, toolbars.

## Usage

```tsx
import {Cluster} from 'kinu';

<Cluster gap="sm">
  <Badge>One</Badge>
  <Badge>Two</Badge>
</Cluster>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Cluster | Component | `<div k="cluster">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gap | `ClusterGap` | 'sm' | Gap between children, from the spacing scale. |
| align | `ClusterAlign` | 'center' | Cross-axis (vertical) alignment of children. |
| justify | `ClusterJustify` | — | Main-axis (horizontal) distribution of children. |

## Notes

- CSS-only: renders a `<div k="cluster">` with `display:flex;flex-wrap:wrap`. Zero JavaScript.
- Items wrap to new rows as needed; `align` defaults to `center` and `gap` defaults to `sm`.
- Reach for it whenever you have a row of badges, chips, buttons, or filters that should wrap gracefully.

---

_Source: `src/components/cluster/index.tsx`
