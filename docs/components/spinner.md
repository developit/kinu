# Spinner

Inline loading indicator for compact pending states.

## Usage

```tsx
import {Spinner} from 'pui';

<Spinner aria-label="Loading" />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Spinner | `<span>` | Wraps `<span>` and sets `p="spinner"`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `SpinnerSize` | — | Size preset for the spinner. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Spinner | size | sm | lg | Controls component sizing. |

## Notes

- Wraps a native `<span>` with purely CSS-driven animation.
- Use `aria-label` or `aria-hidden` based on whether the spinner conveys status text.

---

_Source: `src/components/spinner/index.tsx`
