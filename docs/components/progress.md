# Progress

Styled progress meter with determinate and indeterminate states.

## Usage

```tsx
import {Progress} from 'kinu';

<Progress value={60} max={100} />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Progress | Loading indicator | `<progress k="progress">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | — | Current progress value. |
| max | `number` | — | Maximum progress value. |
| data-state | `"indeterminate"` | — | Marks the progress as indeterminate for styling. |

## Notes

- Wraps the native `<progress>` element for semantics.
- Use the data-state attribute for indeterminate styling.

---

_Source: `src/components/progress/index.tsx`
