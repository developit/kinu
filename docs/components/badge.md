# Badge

Tiny inline status indicator with multiple tone variants.

## Usage

```tsx
import {Badge} from 'pui';

<Badge variant="secondary">New</Badge>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Badge | `<span>` | Wraps `<span>` and sets `p="badge"`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `BadgeVariant` | 'default' | Visual style variant. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Badge | variant | secondary | destructive | outline | Visual style variant selector. |

## Notes

- Renders a `<span>` and forwards standard inline attributes.

---

_Source: `src/components/badge/index.tsx`
