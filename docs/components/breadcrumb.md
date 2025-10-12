# Breadcrumb

Composable breadcrumb trail built from list primitives.

## Usage

```tsx
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from 'pui';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Breadcrumb | <nav> | Wraps <nav> and sets p="breadcrumb". |
| BreadcrumbList | <ol> | Wraps <ol> and sets p="breadcrumb-list". |
| BreadcrumbItem | <li> | Wraps <li> and sets p="breadcrumb-item". |
| BreadcrumbLink | <a> | Wraps <a> and sets p="breadcrumb-link". |

## Attributes

Inherits all native attributes from <nav>. No additional styling attributes are required.

## Notes

- Ships structural wrappers so you can supply router-aware links.
- Uses semantic list markup for accessibility.

---

_Source: `src/components/breadcrumb/index.tsx`
