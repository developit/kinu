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

| Name | DOM element | Details |
| --- | --- | --- |
| Pagination | `<nav>` | Wraps `<nav>` and sets `p="pagination"`. |
| PaginationList | `<ul>` | Wraps `<ul>` and sets `p="pagination-list"`. |
| PaginationItem | `<li>` | Wraps `<li>` and sets `p="pagination-item"`. |
| PaginationLink | `<button>` | Wraps `<button>` and sets `p="pagination-link"`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-current | `boolean | "page" | "true" | "false"` | — | Marks the current page for styling. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| PaginationLink | aria-current | page | Forwarded attribute used by the component styling. |

## Notes

- Renders `<nav>` and list markup for accessibility.
- Use aria-current on the active page link.

---

_Source: `src/components/pagination/index.tsx`
