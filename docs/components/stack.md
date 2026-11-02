# Stack

Vertical flow layout — a flex column with a token-based gap.

## Usage

```tsx
import {Stack} from 'kinu';

<Stack gap="md">
  <div>One</div>
  <div>Two</div>
</Stack>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Stack | Component | `<div k="stack">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gap | `StackGap` | 'md' | Gap between children, from the spacing scale. |
| align | `StackAlign` | — | Cross-axis (horizontal) alignment of children. |
| justify | `StackJustify` | — | Main-axis (vertical) distribution of children. |

## Notes

- CSS-only: renders a `<div k="stack">` with `display:flex;flex-direction:column`. Zero JavaScript.
- Set `gap` to a spacing-scale step (`0`, `xs`, `sm`, `md`, `lg`, `xl`); it maps to the `--k-space-*` tokens and defaults to `md`.
- Use `align` (cross-axis) and `justify` (main-axis) to position children.

---

_Source: `src/components/stack/index.tsx`
