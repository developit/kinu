# Checkbox

Accessible checkbox input with custom visuals.

## Usage

```tsx
import {Checkbox} from 'pui';

<Checkbox checked aria-label="Accept" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Checkbox | Selection control | `<input p="checkbox">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | — | Controls the checked state. |
| data-state | `"indeterminate"` | — | Marks the checkbox as indeterminate for styling. |
| onChange | `JSX.IntrinsicElements` | — | Change handler for the checkbox. |
| disabled | `boolean` | — | Disable the checkbox. |
| name | `string` | — | Input name used for form submissions. |
| value | `JSX.IntrinsicElements` | — | Input value used for form submissions. |

## Notes

- Wraps `<input type="checkbox">` so forms just work.
- Supports data-state="indeterminate" styling for tri-state usage.

---

_Source: `src/components/checkbox/index.tsx`
