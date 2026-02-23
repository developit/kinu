# Toggle

ARIA-pressed aware button for on/off interactions.

## Usage

```tsx
import {Toggle} from 'pui';

<Toggle pressed={value}>Bold</Toggle>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Toggle | Toggle button | `<button p="toggle">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| pressed | `boolean` | — | Convenience prop that maps to `aria-pressed`. |
| aria-pressed | `boolean | "true" | "false"` | — | Controls the pressed state via aria-pressed. Takes precedence over `pressed`. |
| onClick | `(event: MouseEvent) => void` | — | Click handler for toggling state. |
| disabled | `boolean` | — | Disable the toggle. |

## Notes

- Wraps `<button>` so keyboard support comes for free.
- Use the `pressed` prop for DX, or `aria-pressed` for direct attribute control.

---

_Source: `src/components/toggle/index.tsx`
