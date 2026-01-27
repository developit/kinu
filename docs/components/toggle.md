# Toggle

ARIA-pressed aware button for on/off interactions.

## Usage

```tsx
import {Toggle} from 'pui';

<Toggle aria-pressed={value}>Bold</Toggle>
```

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Toggle | aria-pressed | true | Forwarded attribute used by the component styling. |

## Notes

- Wraps `<button>` so keyboard support comes for free.
- Style pressed state using the aria-pressed attribute selectors.

---

<source-ref src="src/components/toggle/index.tsx"></source-ref>
