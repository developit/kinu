# Progress

Styled progress meter with determinate and indeterminate states.

## Usage

```tsx
import {Progress} from 'pui';

<Progress value={60} max={100} />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Progress | <progress> | Wraps <progress> and sets p="progress". |

## Attributes

Inherits all native attributes from <progress>. No additional styling attributes are required.

## Notes

- Wraps the native <progress> element for semantics.
- Use the data-state attribute for indeterminate styling.

---

_Source: `src/components/progress/index.tsx`
