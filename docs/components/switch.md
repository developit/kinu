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
| Switch | `<input>` | Wraps `<input>` and sets `p="switch"`. Defaults props to `{
    role: 'switch',
    type: 'checkbox',
  } as Partial<JSX.HTMLAttributes<HTMLInputElement>>`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | — | Controls the checked state. |
| onChange | `JSX.IntrinsicElements` | — | Change handler for the switch. |
| disabled | `boolean` | — | Disable the switch. |
| name | `string` | — | Input name used for form submissions. |
| value | `JSX.IntrinsicElements` | — | Input value used for form submissions. |

## Attributes

Inherits all native attributes from `<input>`. No additional styling attributes are required.

## Notes

- It is just a checkbox under the hood so forms stay in sync.
- Use aria-label or pair with `<Label>` for accessible naming.

---

_Source: `src/components/switch/index.tsx`
