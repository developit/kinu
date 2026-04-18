# Field

Layout wrapper that groups a label, control, description, and error message.

## Usage

```tsx
import {Field} from 'kinu';

<Field>
  <Field.Label>
    Email
    <Input type="email" required />
  </Field.Label>
  <Field.Description>We'll never share it</Field.Description>
  <Field.Error>Please enter a valid email</Field.Error>
</Field>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Field | Form field group | — |
| FieldDescription | Supporting helper text | `<div k="field-description">` |
| FieldError | Validation error message | `<div k="field-error">` |

### Static Shortcuts

- `Field.Description = FieldDescription`
- `Field.Error = FieldError`

## Notes

- Nests the control inside `Field.Label` so native `<label>` implicit association handles pairing — no `id`/`htmlFor` plumbing needed.
- `Field.Label` is an alias of `Label`, so the regular label styles and props apply.
- `:has(:invalid)` turns the label destructive when any descendant control fails validation.
- `Field.Error` renders with `role="alert"` so assistive tech announces it when shown.

---

_Source: `src/components/field/index.tsx`
