# Collapsible

Minimal hide/show container built on `<details>` without default markers.

## Usage

```tsx
import {Collapsible} from 'pui';

<Collapsible open summary="Trigger">Hidden content</Collapsible>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Collapsible | `<details>` | Wraps `<details>` and sets p="collapsible". Defaults props to {}. Attaches a ref callback for additional behaviour. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Collapsible | open | boolean | Reflects whether the element is expanded. |

## Notes

- Expose the open attribute for controlled usage.
- Great for FAQs when you want custom trigger markup.

---

_Source: `src/components/collapsible/index.tsx`
