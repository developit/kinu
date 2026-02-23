# Spinner

Inline loading indicator for compact pending states.

## Usage

```tsx
import {Spinner} from 'pui';

<Spinner aria-label="Loading" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Spinner | Loading animation | `<span p="spinner">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | `SpinnerSize` | — | Size preset for the spinner. |
| type | `SpinnerType` | — | Visual style preset for the spinner. |
| variant | `SpinnerVariant` | — | Optional semantic color override. Defaults to inherited text color. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Spinner | variant | primary | secondary | destructive | dots | Visual style variant selector. |
| Spinner | size | sm | lg | Controls component sizing. |
| Spinner | type | turn | concentric | ripple | light | radar | bubble | circle | dots | fold | Forwarded attribute used by the component styling. |

## Notes

- Wraps a <span> and animates purely in CSS.
- Supports size="sm" and size="lg" attributes for dense or prominent loading states.

---

_Source: `src/components/spinner/index.tsx`
