# Alert

Inline status message with tone variants.

## Usage

```tsx
import {Alert} from 'kinu';

<Alert variant="info">Heads up!</Alert>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Alert | Status message | `<div k="alert">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `AlertVariant` | 'default' | Visual style variant. |
| banner | `boolean` | — | Render as a full-bleed, square-cornered, page-level banner. Composes with
any tone `variant`. |

## Notes

- Renders a `<div>` so you can include any markup you need.
- Supports `destructive`, `info`, `success`, and `warning` tone variants.
- Pass `banner` for a full-bleed, square-cornered, page-level banner — it composes with any tone (e.g. `<Alert variant="info" banner>`).

---

_Source: `src/components/alert/index.tsx`
