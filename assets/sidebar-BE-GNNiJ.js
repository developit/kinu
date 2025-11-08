const e=`# Sidebar

Responsive sidebar dialog that collapses on mobile.

## Usage

\`\`\`tsx
import {Sidebar, SidebarTrigger} from 'pui';

<Sidebar id="app-sidebar">
  <nav>...</nav>
</Sidebar>
<SidebarTrigger commandfor="app-sidebar">Toggle</SidebarTrigger>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| SidebarTrigger | \`<button>\` | Button that toggles a sidebar dialog. |
| Sidebar | \`<dialog>\` | Dialog element that displays the responsive sidebar. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Sidebar | aria-current | page | Forwarded attribute used by the component styling. |
| Sidebar | hidden | boolean | Forwarded attribute used by the component styling. |
| Sidebar | open | boolean | Reflects whether the element is expanded. |

## Notes

- Renders a \`<dialog>\` so it can slide in as a modal on small screens.
- SidebarTrigger toggles the hidden/open state with the command attribute.

---

<source-ref src="src/components/sidebar/index.tsx"></source-ref>
`;export{e as default};
//# sourceMappingURL=sidebar-BE-GNNiJ.js.map
