# Tooltip

Hover/focus tooltip with placement attributes and CSS timing.

## Usage

```tsx
import {Tooltip} from 'pui';

<Tooltip text="Info"><Button>Hover</Button></Tooltip>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Tooltip | Hover hint | `<span p="tooltip">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | — | Tooltip text provided via the title attribute. |
| side | `"left" | "right" | "top" | "bottom"` | — | The direction the tooltip should open towards. |

## Notes

- Uses data attributes for fade transitions.
- Position via the placement attribute without extra JS.

---

_Source: `src/components/tooltip/index.tsx`
