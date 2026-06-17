# Stepper

Horizontal ordered steps with numbered markers and connectors.

## Usage

```tsx
import {Stepper} from 'kinu';

<Stepper>
  <Stepper.Step state="complete">Cart</Stepper.Step>
  <Stepper.Step state="current">Payment</Stepper.Step>
  <Stepper.Step>Review</Stepper.Step>
</Stepper>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Stepper | Component | — |

## Notes

- Pure CSS: renders `<ol k="steps">` + `<li k="step">`. Markers are auto-numbered with CSS counters and joined by line connectors. Zero JavaScript.
- `Stepper.Step` takes `state` (`upcoming` / `current` / `complete`): complete shows a check on a filled marker, current outlines it in the primary color.
- Distinct from `Timeline` (vertical event feed) and `Progress` (continuous bar).

---

_Source: `src/components/stepper/index.tsx`
