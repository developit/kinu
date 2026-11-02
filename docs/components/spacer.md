# Spacer

Flexible spacer that pushes siblings apart, or a fixed gap block.

## Usage

```tsx
import {Spacer} from 'kinu';

<Row>
  <Button>Back</Button>
  <Spacer />
  <Button>Next</Button>
</Row>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Spacer | Component | `<div k="spacer">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `SpacerSize` | — | Render a fixed gap (along the main axis) instead of flexing to fill the
available space. |

## Notes

- CSS-only: `<div k="spacer">` with `flex:1` so it grows to push siblings to opposite ends of a Row, Cluster, or Stack.
- Pass `size` (`xs`–`xl`) to render a fixed gap (via `flex-basis`) that works along either axis instead of growing.

---

_Source: `src/components/spacer/index.tsx`
