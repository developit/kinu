# Breadcrumb

Composable breadcrumb trail built from list primitives.

## Usage

```tsx
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from 'kinu';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Breadcrumb | Navigation trail | `<nav k="breadcrumb">` |
| BreadcrumbList | Trail container | `<ol k="breadcrumb-list">` |
| BreadcrumbItem | Trail item | `<li k="breadcrumb-item">` |
| BreadcrumbLink | Trail link | `<a k="breadcrumb-link">` |

## Notes

- Ships structural wrappers so you can supply router-aware links.
- Uses semantic list markup for accessibility.

---

_Source: `src/components/breadcrumb/index.tsx`
