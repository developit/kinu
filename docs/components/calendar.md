# Calendar

Styled wrapper around the native `<input type="date">` element.

## Usage

```tsx
import {Calendar} from 'pui';

<Calendar />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Calendar | Date picker | `<input p="calendar">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `JSX.IntrinsicElements` | — | Current date value. |
| onChange | `JSX.IntrinsicElements` | — | Change handler for date input. |
| disabled | `boolean` | — | Disable the input. |
| name | `string` | — | Input name used for form submissions. |

## Notes

- Forwards every standard input attribute, defaulting type to "date".
- Uses the browser's native date picker UI for accessibility and localisation.

---

_Source: `src/components/calendar/index.tsx`
