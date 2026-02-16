# Input

Text input with size, tone, and invalid states handled in CSS.

## Usage

```tsx
import {Input} from 'pui';

<Input placeholder="Email" type="email" />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Input | `<input>` | Wraps `<input>` and sets `p="input"`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `InputSize` | 'md' | Size preset for the input field. |
| invalid | `boolean` | — | Marks the input as invalid for styling purposes. |
| value | `JSX.IntrinsicElements` | — | Input value. |
| type | `JSX.IntrinsicElements` | — | Input type attribute. |
| placeholder | `string` | — | Placeholder text for the input. |
| onInput | `JSX.IntrinsicElements` | — | Change handler for controlled inputs. |
| onBlur | `JSX.IntrinsicElements` | — | Blur handler. |
| onFocus | `JSX.IntrinsicElements` | — | Focus handler. |
| disabled | `boolean` | — | Disables interactions and applies disabled styling. |
| name | `string` | — | Input name attribute used for form submissions. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Input | invalid | boolean | Forwarded attribute used by the component styling. |
| Input | size | sm | lg | Controls component sizing. |

## Notes

- Wraps the native `<input>` element so forms behave as expected.
- Supports size="sm" and size="lg" for compact or spacious layouts.

---

_Source: `src/components/input/index.tsx`
