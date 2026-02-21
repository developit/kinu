# Spinner

Inline loading indicator for compact pending states.

## Usage

```tsx
import {Spinner} from 'pui';

<Spinner aria-label="Loading" />
<Spinner variant="circle" aria-label="Loading" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Spinner | Loading animation | `<span p="spinner">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `SpinnerSize` | — | Size preset for the spinner. |
| variant | `SpinnerVariant` | — | Visual style preset for the spinner. |
| color | `SpinnerColor` | inherited text color | Optional semantic color override. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Spinner | size | `sm` \| `lg` | Controls component sizing. |
| Spinner | variant | `turn` \| `concentric` \| `concentric2` \| `ripple` \| `light` \| `ghost` \| `radar` \| `bubble` \| `fold` \| `circle` \| `dots` | Selects a CSS-only spinner style. |
| Spinner | color | `primary` \| `secondary` \| `destructive` | Overrides spinner color token; default is `currentColor`. |

## Notes

- Wraps a `<span>` and animates purely in CSS.
- The docs preview includes all shipped variants.
- Supports `size="sm"` and `size="lg"` attributes for dense or prominent loading states.

---

_Source: `src/components/spinner/index.tsx`
