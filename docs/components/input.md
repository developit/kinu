# Input

Text input with size, tone, and invalid states handled in CSS.

## Usage

```tsx
import {Input} from 'pui';

<Input placeholder="Email" type="email" />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Input | `<input>` | Wraps `<input>` and sets p="input". |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Input | invalid | boolean | Forwarded attribute used by the component styling. |
| Input | size | sm | lg | Controls component sizing. |

## Notes

- Wraps the native `<input>` element so forms behave as expected.
- Supports size="sm" and size="lg" for compact or spacious layouts.

---

_Source: `src/components/input/index.tsx`
