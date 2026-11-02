# Row

Horizontal flow layout — a flex row with a token-based gap.

## Usage

```tsx
import {Row} from 'kinu';

<Row gap="sm" justify="between">
  <strong>Title</strong>
  <Button>Save</Button>
</Row>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Row | Component | `<div k="row">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gap | `RowGap` | 'sm' | Gap between children, from the spacing scale. |
| align | `RowAlign` | 'center' | Cross-axis (vertical) alignment of children. |
| justify | `RowJustify` | — | Main-axis (horizontal) distribution of children. |
| wrap | `boolean` | — | Allow children to wrap onto multiple lines. (Row does not wrap by default —
reach for `Cluster` when wrapping is the point.) |

## Notes

- CSS-only: renders a `<div k="row">` with `display:flex`. The horizontal sibling of `Stack`. Zero JavaScript.
- `gap` (default `sm`), `align` (default `center`), and `justify` mirror the other layout primitives.
- Does not wrap by default — pass `wrap`, or reach for `Cluster` when wrapping is the point.

---

_Source: `src/components/row/index.tsx`
