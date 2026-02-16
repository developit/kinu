# Skeleton

Animated shimmer placeholder for loading states.

## Usage

```tsx
import {Skeleton} from 'pui';

<Skeleton style={{height: "1.5rem"}} />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Skeleton | `<div>` | Wraps `<div>` and sets `p="skeleton"`. |

## Attributes

Inherits all native attributes from `<div>`. No additional styling attributes are required.

## Notes

- Wraps a `<div>` so you can size it however you want.
- Use data-rounded to switch to pill skeletons.

---

_Source: `src/components/skeleton/index.tsx`
