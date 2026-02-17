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

| Name | Description | Rendered HTML |
| --- | --- | --- |
| AspectRatio | Ratio container | `<div p="aspect-ratio">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| ratio | `string` | — | Aspect ratio expressed as a CSS ratio string (e.g. "16 / 9"). |

## Notes

- Wraps a `<div>` that defines the ratio using a CSS custom property.

---

_Source: `src/components/aspect-ratio/index.tsx`
