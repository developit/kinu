# Tooltip

Hover/focus tooltip with placement attributes and CSS timing.

## Usage

```tsx
import {Tooltip} from 'kinu';

<Tooltip text="Info"><Button>Hover</Button></Tooltip>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Tooltip | Hover hint | `<span k="tooltip">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | — | Tooltip text provided via the title attribute. |
| side | `"left" | "right" | "top" | "bottom"` | — | The direction the tooltip should open towards. |

## Notes

- Uses data attributes for fade transitions.
- Position via the placement attribute without extra JS.
- On touch (coarse pointers) the tooltip answers a long press: hold for 500ms to show it, lift to dismiss. Hover is ignored there, since it is emulated and would otherwise pin the tooltip open after a tap.

---

_Source: `src/components/tooltip/index.tsx`
