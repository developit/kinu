# Table

Table wrapper with zebra striping and compact density.

## Usage

```tsx
import {Table} from 'pui';

<Table>
  <thead>...</thead>
  <tbody>...</tbody>
</Table>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Table | `<table>` | Wraps `<table>` and sets `p="table"`. |

## Attributes

Inherits all native attributes from `<table>`. No additional styling attributes are required.

## Notes

- Uses native `<table>` markup so semantics stay intact.
- Supports sticky headers via CSS attribute toggles.

---

_Source: `src/components/table/index.tsx`
