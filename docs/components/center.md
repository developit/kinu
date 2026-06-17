# Center

Centers its content horizontally and vertically with CSS grid.

## Usage

```tsx
import {Center} from 'kinu';

<Center style={{height: '10rem'}}>
  <span>Centered</span>
</Center>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Center | Component | `<div k="center">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| inline | `boolean` | — | Shrink to content and center inline, instead of filling the parent box. |

## Notes

- CSS-only: `<div k="center">` using `display:grid;place-items:center`. Give it a size (or let it fill its parent) and the child centers on both axes.
- Pass `inline` to shrink to the content and center inline instead of filling the box.

---

_Source: `src/components/center/index.tsx`
