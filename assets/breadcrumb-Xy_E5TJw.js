const r=`# Breadcrumb

Composable breadcrumb trail built from list primitives.

## Usage

\`\`\`tsx
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from 'pui';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| Breadcrumb | \`<nav>\` | Navigation landmark that wraps the breadcrumb trail. |
| BreadcrumbList | \`<ol>\` | Ordered list container for breadcrumb items. |
| BreadcrumbItem | \`<li>\` | List item wrapper for each breadcrumb. |
| BreadcrumbLink | \`<a>\` | Link element for navigating to a breadcrumb target. |

## Attributes

Inherits all native attributes from \`<nav>\`. No additional styling attributes are required.

## Notes

- Ships structural wrappers so you can supply router-aware links.
- Uses semantic list markup for accessibility.

---

<source-ref src="src/components/breadcrumb/index.tsx"></source-ref>
`;export{r as default};
//# sourceMappingURL=breadcrumb-Xy_E5TJw.js.map
