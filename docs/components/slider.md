# Slider

Range input with CSS-driven track and thumb styling.

## Usage

```tsx
import {Slider} from 'pui';

<Slider min={0} max={100} value={50} />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Slider | <input> | Wraps <input> and sets p="slider". Defaults props to {type: 'range'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>. Attaches a ref callback for additional behaviour. |

## Attributes

Inherits all native attributes from <input>. No additional styling attributes are required.

## Notes

- Wraps <input type="range"> for seamless form integration.
- Supports data-orientation for vertical sliders.

---

_Source: `src/components/slider/index.tsx`
