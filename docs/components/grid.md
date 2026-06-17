# Grid

Responsive auto-fit grid with a token-based gap — dashboards, card galleries.

## Usage

```tsx
import {Grid} from 'kinu';

<Grid gap="md" min="sm">
  <Card>One</Card>
  <Card>Two</Card>
</Grid>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Grid | Component | `<div k="grid">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| gap | `GridGap` | 'md' | Gap between cells, from the spacing scale. |
| min | `GridMin` | 'md' | Minimum column width for the responsive auto-fit grid. Override directly
with the `--k-grid-min` custom property for arbitrary values. |
| cols | `GridCols` | — | Fixed number of equal-width columns. Overrides the responsive auto-fit. |

## Notes

- CSS-only: renders a `<div k="grid">` using `repeat(auto-fit, minmax(...))`. Zero JavaScript.
- By default it fits as many columns as will hold the `min` width (presets `xs`–`xl`, default `md` = 16rem); override arbitrarily with the `--k-grid-min` custom property.
- Pass `cols={3}` for a fixed equal-column grid instead of the responsive behaviour.

---

_Source: `src/components/grid/index.tsx`
