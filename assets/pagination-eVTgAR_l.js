const n=`# Pagination

Semantic pagination list with previous/next helpers.

## Usage

\`\`\`tsx
import {Pagination, PaginationItem, PaginationLink, PaginationList} from 'pui';

<Pagination>
  <PaginationList>
    <PaginationItem><PaginationLink aria-current="page">1</PaginationLink></PaginationItem>
  </PaginationList>
</Pagination>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| Pagination | \`<nav>\` | Navigation landmark announcing the pagination controls. |
| PaginationList | \`<ul>\` | Unordered list that arranges pagination items. |
| PaginationItem | \`<li>\` | List item wrapper for each pagination control. |
| PaginationLink | \`<button>\` | Button styled as a pagination link. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| PaginationLink | aria-current | page | Forwarded attribute used by the component styling. |

## Notes

- Renders \`<nav>\` and list markup for accessibility.
- Use aria-current on the active page link.

---

<source-ref src="src/components/pagination/index.tsx"></source-ref>
`;export{n as default};
//# sourceMappingURL=pagination-eVTgAR_l.js.map
