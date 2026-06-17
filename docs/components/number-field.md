# Number Field

Native number input with stepper buttons driven by the command bus.

## Usage

```tsx
import {NumberField} from 'kinu';

<NumberField defaultValue={3} min={0} max={10} />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| NumberField | Component | — |

## Notes

- Wraps a native `<input type="number">` in an `InputGroup` with − / + buttons. Forwards every native input attribute (`min`, `max`, `step`, `value`, `name`, …).
- The buttons use `command="--step-up"`/`"--step-down"` on the existing command bus — no new global listeners — and the input calls native `stepUp()`/`stepDown()`, firing `input`/`change` so forms stay in sync.
- Native Invoker Commands are Baseline; the bundled `installCommands()` polyfill is the fallback for older Safari.

---

_Source: `src/components/number-field/index.tsx`
