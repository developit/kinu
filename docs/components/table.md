# Table

Table wrapper with zebra striping and compact density.

## Usage

```tsx
import {Table} from 'kinu';

<Table>
  <thead>...</thead>
  <tbody>...</tbody>
</Table>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Table | Data table | `<table k="table">` |

## Notes

- Uses native `<table>` markup so semantics stay intact.
- Supports sticky headers via CSS attribute toggles.

---

_Source: `src/components/table/index.tsx`
