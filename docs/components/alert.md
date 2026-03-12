# Alert

Inline status message with tone variants.

## Usage

```tsx
import {Alert} from 'kinu';

<Alert variant="default">Heads up!</Alert>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Alert | Status message | `<div k="alert">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `"destructive"` | 'default' | Visual style variant. |

## Notes

- Renders a `<div>` so you can include any markup you need.

---

_Source: `src/components/alert/index.tsx`
