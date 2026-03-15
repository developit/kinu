# Toggle

ARIA-pressed aware button for on/off interactions.

## Usage

```tsx
import {Toggle} from 'kinu';

<Toggle pressed={value}>Bold</Toggle>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Toggle | Toggle button | `<button p="toggle">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| pressed | `boolean` | — | Controls the pressed state and maps to `aria-pressed` on the DOM element. |
| onClick | `(event: MouseEvent) => void` | — | Click handler for toggling state. |
| disabled | `boolean` | — | Disable the toggle. |

## Notes

- Wraps `<button>` so keyboard support comes for free.
- Use the `pressed` prop for state; it maps to `aria-pressed` on the DOM.

---

_Source: `src/components/toggle/index.tsx`
