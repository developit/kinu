# Composer

Chat input form — autosizing textarea with Enter-to-send.

## Usage

```tsx
import {Composer} from 'kinu';

<Composer onSubmit={send}>
  <Textarea autosize rows={1} placeholder="Message…" />
  <Composer.Actions>
    <Composer.Send>Send</Composer.Send>
  </Composer.Actions>
</Composer>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Composer | Component | — |
| Composer.Send | Component | `<button k="composer-send">` |
| Composer.Actions | Component | `<div k="composer-actions">` |

## Notes

- Renders a `<form k="composer">` around a `Textarea` (use `autosize` so it grows with content). Enter submits, Shift+Enter inserts a newline — a single delegated keydown calls `form.requestSubmit()`, and it is IME-safe.
- Compound parts: `Composer.Send` (a submit button, pushed to the trailing edge) and `Composer.Actions` (a row for attach / model controls — compose `FileUpload`, `Select`, etc.).
- No engine: a typing indicator is just `<Spinner>`, and suggestions are a `Cluster` of `Chip`. Bring your own submit handler.

---

_Source: `src/components/composer/index.tsx`
