# Checkbox

Accessible checkbox input with custom visuals.

## Usage

```tsx
import {Checkbox} from 'pui';

<Checkbox checked aria-label="Accept" />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Checkbox | `<input>` | Wraps `<input>` and sets p="checkbox". Defaults props to {type: 'checkbox'} as Partial`<JSX.HTMLAttributes<HTMLInputElement>`>. |

## Attributes

Inherits all native attributes from `<input>`. No additional styling attributes are required.

## Notes

- Wraps `<input type="checkbox">` so forms just work.
- Supports data-state="indeterminate" styling for tri-state usage.

---

_Source: `src/components/checkbox/index.tsx`
