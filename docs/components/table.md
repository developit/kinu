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
- Pass `sticky` to make `<thead>` cells stick to the top of the nearest scroll container. Wrap the table in a scrollable element (e.g. `<div style={{maxHeight: '12rem', overflow: 'auto'}}>`) so the header has somewhere to stick relative to.

---

_Source: `src/components/table/index.tsx`
