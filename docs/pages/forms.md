# Forms & Validation

kinu has **no form-state engine and no validation library**. It leans entirely on the platform: the
HTML Constraint Validation API for the rules, and the `:user-invalid` pseudo-class for *when* to show
errors. The result is validated forms with **zero JavaScript validation logic** and no "touched" state
to manage.

## The `:user-invalid` layer

Native form controls already know whether their value is valid (`required`, `type="email"`,
`min`/`max`, `pattern`, `minlength`, …). The trick is timing: you don't want a "required" error
screaming at someone before they've typed anything.

The `:user-invalid` pseudo-class solves exactly that — it matches an invalid control **only after the
user has interacted with it** (edited and blurred, or attempted to submit). It's
[Baseline](https://developer.mozilla.org/docs/Web/CSS/:user-invalid) and needs no JS.

Every kinu input wires its error styling to `:user-invalid` (and to an explicit `[invalid]` attribute,
for server-side errors you set yourself):

- `Input`, `Textarea`, `Select`, `Checkbox`, `NumberField`, and `OTPInput` turn their border
  `destructive` when invalid post-interaction.
- The `:user-valid` pseudo-class is also available if you want to style the *valid* state in your own
  CSS — kinu leaves it unstyled by default to avoid visual noise.

```css
/* This is already in kinu — shown to illustrate the pattern */
[k="input"]:user-invalid,
[k="input"][invalid] {
  border-color: hsl(var(--k-destructive));
}
```

## `Field` + `Field.Error`

`Field` groups a label, a control, an optional description, and an error message. It wires the whole
group to validity with `:has()`:

- The label turns `destructive` when any control inside the field is `:user-invalid`.
- **`Field.Error` is hidden until the field is invalid** — it reveals on `:has(:user-invalid)` (or an
  explicit `[invalid]`). You can always render the message; it only appears when it's relevant.
- `Field.Error` carries `role="alert"`, so assistive tech announces it when it appears.

```tsx
<form onSubmit={handleSubmit}>
  <Field>
    <Field.Label>
      Email
      <Input type="email" name="email" required />
    </Field.Label>
    <Field.Description>We'll only use this to send receipts.</Field.Description>
    <Field.Error>Please enter a valid email address.</Field.Error>
  </Field>

  <Button type="submit">Subscribe</Button>
</form>
```

Type a malformed email and tab away — the border goes red, the label goes red, and the error appears.
There is no `useState`, no `onChange`, no `errors` object, and no `touched` map anywhere in that form.

## Custom messages

Override the browser's default validation copy with `setCustomValidity` (or just let `Field.Error`
provide the text — it's shown whenever the control is invalid). To surface a server-side error after a
round-trip, set the `[invalid]` attribute on the control; it reveals `Field.Error` exactly like
native invalidity does.

## Submitting

The contract is **"bring your own submit, the platform owns validity."** A form won't submit while a
control is invalid; the browser focuses and reports the first offender. The forthcoming `Form`
composition adds a thin convenience wrapper that, on submit, calls `checkValidity()`, focuses the
first `:invalid` control, and otherwise hands you valid data — still with no validation engine.
