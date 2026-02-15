# Spinner

Inline loading indicator for compact pending states.

## Usage

```tsx
import {Spinner} from 'pui';

<Spinner aria-label="Loading" />
```

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Spinner | size | sm \| lg | Optional size variants. Omit for default md sizing. |

## Notes

- Wraps a native `<span>` with purely CSS-driven animation.
- Use `aria-label` or `aria-hidden` based on whether the spinner conveys status text.

---

<source-ref src="src/components/spinner/index.tsx"></source-ref>
