# Date Picker

Styled date input that shares the same foundation as Calendar.

## Usage

```tsx
import {DatePicker} from 'pui';

<DatePicker />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| DatePicker | `<input>` | Wraps `<input>` and sets p="date-picker". Defaults props to {type: 'date'} as Partial`<JSX.HTMLAttributes<HTMLInputElement>`>. |

## Attributes

Inherits all native attributes from `<input>`. No additional styling attributes are required.

## Notes

- Sets type="date" for you and forwards all native input props.
- Pairs nicely with popovers if you need a custom calendar shell.

---

_Source: `src/components/date-picker/index.tsx`
