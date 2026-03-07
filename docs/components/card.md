# Card

Surface container with padding, border, and typography defaults.

## Usage

```tsx
import {Card} from 'kinu';

<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Card | Surface container | `<div k="card">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| padding | `CardPadding` | 'md' | Padding preset for the card content. |

## Notes

- Wraps a `<div>` and exposes padding/variant control via attributes.

---

_Source: `src/components/card/index.tsx`
