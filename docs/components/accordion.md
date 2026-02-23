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

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Accordion | Collapsible section | `<details p="accordion">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open | `boolean` | — | Controls the open state of the details element. |

## Notes

- Forwards every native `<details>` attribute so you can control open state.
- Provide your own `<summary>` element to define the trigger.

---

_Source: `src/components/accordion/index.tsx`
