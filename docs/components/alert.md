# Alert

Inline status message with tone variants.

## Usage

```tsx
import {Alert} from 'pui';

<Alert variant="default">Heads up!</Alert>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Alert | `<div>` | Wraps `<div>` and sets p="alert". |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Alert | variant | destructive | Visual style variant selector. |

## Notes

- Renders a `<div>` so you can include any markup you need.

---

_Source: `src/components/alert/index.tsx`
