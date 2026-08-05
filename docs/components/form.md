# Form

Form wrapper that runs native validation before your submit handler.

## Usage

```tsx
import {Form} from 'kinu';

<Form onValid={save}>
  <Field>...</Field>
  <Button type="submit">Save</Button>
</Form>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Form | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| onValid | `any` | — | Called with the submit event when the form passes native validation. When
the form is invalid, Form instead prevents submission and focuses the first
invalid control — so you never manage validation state yourself. |

## Notes

- No form-state engine. On submit it runs `checkValidity()`: if the form is invalid it blocks submission and focuses the first invalid control; otherwise it calls `onValid` with the event.
- Pairs with the native-validation CSS layer (`:user-invalid`) and `Field` / `Field.Error` — see the Forms & Validation page. You never manage `touched` or `errors` state.
- Bring your own submit in `onValid` (e.g. `e.preventDefault()` then POST).

---

_Source: `src/components/form/index.tsx`
