# Switch

Accessible toggle switch built from a checkbox input.

## Usage

```tsx
import {Switch} from 'pui';

<Switch checked />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Switch | Toggle control | `<input p="switch">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | — | Controls the checked state. |
| onChange | `JSX.IntrinsicElements` | — | Change handler for the switch. |
| disabled | `boolean` | — | Disable the switch. |
| name | `string` | — | Input name used for form submissions. |
| value | `JSX.IntrinsicElements` | — | Input value used for form submissions. |

## Notes

- It is just a checkbox under the hood so forms stay in sync.
- Use aria-label or pair with `<Label>` for accessible naming.

---

_Source: `src/components/switch/index.tsx`
