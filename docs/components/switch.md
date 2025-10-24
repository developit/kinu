# Switch

Accessible toggle switch built from a checkbox input.

## Usage

```tsx
import {Switch} from 'pui';

<Switch checked />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Switch | `<input>` | Wraps `<input>` and sets p="switch". Defaults props to {
    role: 'switch',
    type: 'checkbox',
  } as Partial`<JSX.HTMLAttributes<HTMLInputElement>`>. |

## Attributes

Inherits all native attributes from `<input>`. No additional styling attributes are required.

## Notes

- It is just a checkbox under the hood so forms stay in sync.
- Use aria-label or pair with `<Label>` for accessible naming.

---

_Source: `src/components/switch/index.tsx`
