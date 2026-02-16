# Tooltip

Hover/focus tooltip with placement attributes and CSS timing.

## Usage

```tsx
import {Tooltip} from 'pui';

<Tooltip text="Info"><Button>Hover</Button></Tooltip>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Tooltip | `<span>` | Wraps `<span>` and sets `p="tooltip"`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | — | Tooltip text provided via the title attribute. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Tooltip | title | boolean | Forwarded attribute used by the component styling. |

## Notes

- Uses data attributes for fade transitions.
- Position via the placement attribute without extra JS.

---

_Source: `src/components/tooltip/index.tsx`
