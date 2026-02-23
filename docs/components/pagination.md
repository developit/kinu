# Pagination

Semantic pagination list with previous/next helpers.

## Usage

```tsx
import {Pagination, PaginationItem, PaginationLink, PaginationList} from 'pui';

<Pagination>
  <PaginationList>
    <PaginationItem><PaginationLink aria-current="page">1</PaginationLink></PaginationItem>
  </PaginationList>
</Pagination>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Pagination | Page navigation | `<nav p="pagination">` |
| PaginationList | Page list | `<ul p="pagination-list">` |
| PaginationItem | Page item | `<li p="pagination-item">` |
| PaginationLink | Page link | `<button p="pagination-link">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-current | `boolean | "page" | "true" | "false"` | — | Marks the current page for styling. |

## Notes

- Renders `<nav>` and list markup for accessibility.
- Use aria-current on the active page link.

---

_Source: `src/components/pagination/index.tsx`
