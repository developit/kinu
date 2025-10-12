# Label

Typography-aligned label component for form controls.

## Usage

```tsx
import {Label} from 'pui';

<Label htmlFor="name">Name</Label>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Label | <label> | Wraps <label> and sets p="label". |

## Attributes

Inherits all native attributes from <label>. No additional styling attributes are required.

## Notes

- Wraps the native <label> element and forwards htmlFor.
- Pair with controls to provide accessible names.

---

_Source: `src/components/label/index.tsx`
