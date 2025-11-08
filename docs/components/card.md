# Card

Surface container with padding, border, and typography defaults.

## Usage

```tsx
import {Card} from 'pui';

<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Card | padding | none | sm | lg | Forwarded attribute used by the component styling. |

## Notes

- Wraps a `<div>` and exposes padding/variant control via attributes.

---

<source-ref src="src/components/card/index.tsx"></source-ref>
