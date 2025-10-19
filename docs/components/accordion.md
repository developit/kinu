# Accordion

Disclosure built on the native `<details>` element with smooth open and close animation.

## Usage

```tsx
import {Accordion} from 'pui';

<Accordion open>
  <summary>Details</summary>
  <p>Hidden content</p>
</Accordion>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Accordion | `<details>` | Wraps `<details>` and sets p="accordion". |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Accordion | open | boolean | Reflects whether the element is expanded. |

## Notes

- Forwards every native `<details>` attribute so you can control open state.
- Provide your own `<summary>` element to define the trigger.

---

_Source: `src/components/accordion/index.tsx`
