# Radio Group

Container that styles a set of native radio inputs.

## Usage

```tsx
import {Radio, RadioGroup} from 'pui';

<RadioGroup>
  <Radio name="plan" value="basic" />
  <Radio name="plan" value="pro" />
</RadioGroup>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| RadioGroup | Radio group | `<div p="radio-group">` |
| Radio | Radio input | `<input p="radio">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | — | Controls the checked state. |
| name | `string` | — | Radio group name. |
| value | `JSX.IntrinsicElements` | — | Radio value used for form submissions. |
| onChange | `JSX.IntrinsicElements` | — | Change handler for the radio. |
| disabled | `boolean` | — | Disable the radio input. |

## Notes

- Radio renders an `<input type="radio">` so browser form behavior stays intact.
- Use the native name/value model or controlled props to manage selection.

---

_Source: `src/components/radio-group/index.tsx`
