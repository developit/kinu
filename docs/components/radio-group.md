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

| Name | DOM element | Details |
| --- | --- | --- |
| RadioGroup | `<div>` | Wraps `<div>` and sets p="radio-group". |
| Radio | `<input>` | Wraps `<input>` and sets p="radio". Defaults props to {type: 'radio'} as Partial`<JSX.HTMLAttributes<HTMLInputElement>`>. |

## Attributes

Inherits all native attributes from `<div>`. No additional styling attributes are required.

## Notes

- Radio renders an `<input type="radio">` so browser form behavior stays intact.
- Use the native name/value model or controlled props to manage selection.

---

_Source: `src/components/radio-group/index.tsx`
