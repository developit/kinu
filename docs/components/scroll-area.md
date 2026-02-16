# Scroll Area

Overflow wrapper with custom scrollbars and shadow indicators.

## Usage

```tsx
import {ScrollArea} from 'pui';

<ScrollArea style={{height: '200px'}}><div>Long content</div></ScrollArea>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| ScrollArea | `<div>` | Wraps `<div>` and sets `p="scroll-area"`. |

## Attributes

Inherits all native attributes from `<div>`. No additional styling attributes are required.

## Notes

- Applies scroll shadows using CSS masks.
- Forwards native overflow attributes for flexibility.

---

_Source: `src/components/scroll-area/index.tsx`
