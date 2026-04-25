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

## Notes

- Renders a `<div>` so you can include any markup you need.
- Supports `destructive`, `info`, `success`, and `warning` tone variants.

---

_Source: `src/components/alert/index.tsx`
