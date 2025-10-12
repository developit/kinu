# Pagination

Unstyled pagination primitives.

## Import

```tsx
import {
  Pagination,
  PaginationList,
  PaginationItem,
  PaginationLink,
} from 'pui';
```

## Usage

```tsx
<Pagination aria-label="Pagination">
  <PaginationList>
    <PaginationItem>
      <PaginationLink aria-current="page">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={() => setPage(2)}>2</PaginationLink>
    </PaginationItem>
  </PaginationList>
</Pagination>
```

## Accessibility

Use `aria-current="page"` on the active link and `aria-label` on the nav wrapper. Add prev/next buttons with descriptive labels.

## CSS hooks

- `[p="pagination-list"]` — flex layout.
- `[p="pagination-link"]` — button styling, with `[aria-current="page"]` for the active page state.
