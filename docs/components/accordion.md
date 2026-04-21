# Accordion

Disclosure built on the native `<details>` element with smooth open and close animation.

## Usage

```tsx
import {Accordion} from 'kinu';

<Accordion open>
  <summary>Details</summary>
  <p>Hidden content</p>
</Accordion>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Accordion | Collapsible section | `<details k="accordion">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open | `boolean` | — | Controls the open state of the details element. |

## Notes

- Forwards every native `<details>` attribute so you can control open state.
- Provide your own `<summary>` element to define the trigger.
- Pass the same `name` to multiple accordions to make them mutually exclusive — only one can be open at a time in a group (HTML 2024 `<details name>`).

---

_Source: `src/components/accordion/index.tsx`
