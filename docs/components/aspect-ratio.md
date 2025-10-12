# Aspect Ratio

Maintains responsive boxes at a fixed ratio using pure CSS.

## Usage

```tsx
import {AspectRatio} from 'pui';

<AspectRatio ratio="16 / 9">
  <img src="..." alt="Video thumbnail" />
</AspectRatio>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| AspectRatio | <div> | Wraps <div> and sets p="aspect-ratio". |

## Attributes

Inherits all native attributes from <div>. No additional styling attributes are required.

## Notes

- Wraps a <div> that defines the ratio using a CSS custom property.

---

_Source: `src/components/aspect-ratio/index.tsx`
