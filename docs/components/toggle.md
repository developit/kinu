# Toggle

ARIA-pressed aware button for on/off interactions.

## Usage

```tsx
import {Toggle} from 'pui';

<Toggle aria-pressed={value}>Bold</Toggle>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Toggle | Toggle button | `<button p="toggle">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-pressed | `boolean | "true" | "false"` | — | Controls the pressed state via aria-pressed. |
| onClick | `(event: MouseEvent) => void` | — | Click handler for toggling state. |
| disabled | `boolean` | — | Disable the toggle. |

## Notes

- Wraps `<button>` so keyboard support comes for free.
- Style pressed state using the aria-pressed attribute selectors.

---

_Source: `src/components/toggle/index.tsx`
