# Form integration

PUI components forward all events to the native DOM, so forms work without extra adapters.

## Example flow

```tsx
<form onSubmit={handleSubmit}>
  <Label htmlFor="email">Email</Label>
  <Input id="email" name="email" type="email" required />

  <Label htmlFor="name">Name</Label>
  <Input id="name" name="name" required />

  <Button type="submit">Submit</Button>
</form>
```

## Tips

- Use standard form attributes (`required`, `minLength`, etc.). They surface native validation UI.
- Combine inputs with `toast` or `Alert` to provide inline feedback.
- Keep state minimal—read values from the form via `FormData` inside your submit handler when possible.
