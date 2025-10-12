# Calendar

Styled wrapper around the native <input type="date"> element.

## Usage

```tsx
import {Calendar} from 'pui';

<Calendar />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Calendar | <input> | Wraps <input> and sets p="calendar". Defaults props to {type: 'date'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>. |

## Attributes

Inherits all native attributes from <input>. No additional styling attributes are required.

## Notes

- Forwards every standard input attribute, defaulting type to "date".
- Uses the browser's native date picker UI for accessibility and localisation.

---

_Source: `src/components/calendar/index.tsx`
