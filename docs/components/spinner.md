# Spinner

Compact loading indicator for inline and button-adjacent pending states.

## Usage

```tsx
import {Spinner} from 'pui';

<Spinner aria-label="Loading" />
```

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Spinner | size | sm | lg | Omitting size uses the default medium spinner. |

## Notes

- Renders as a `<div>` with CSS-only animation.
- Use `aria-label` or surrounding text so assistive tech has context.

---

<source-ref src="src/components/spinner/index.tsx"></source-ref>
