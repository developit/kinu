const n=`# Sidebar

Responsive sidebar dialog that collapses on mobile.

## Usage

\`\`\`tsx
import {Sidebar, SidebarTrigger} from 'pui';

<Sidebar id="app-sidebar">
  <nav>...</nav>
</Sidebar>
<SidebarTrigger commandFor="app-sidebar">Toggle</SidebarTrigger>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| SidebarTrigger | Sidebar toggle | \`<button p="sidebar-trigger">\` |
| Sidebar | Side navigation | \`<dialog p="sidebar">\` |

## Props

### SidebarTriggerProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| commandFor | \`string\` | — | Target sidebar ID to control. |

### SidebarProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Optional ID for the sidebar dialog. |

## Notes

- Renders a \`<dialog>\` so it can slide in as a modal on small screens.
- SidebarTrigger toggles the hidden/open state with the command attribute.

---

_Source: \`src/components/sidebar/index.tsx\`
`;export{n as default};
//# sourceMappingURL=sidebar-hG4Z4uKB.js.map
