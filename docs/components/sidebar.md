# Sidebar

Responsive sidebar dialog that collapses on mobile.

## Usage

```tsx
import {Sidebar, SidebarTrigger} from 'pui';

<Sidebar id="app-sidebar">
  <nav>...</nav>
</Sidebar>
<SidebarTrigger commandfor="app-sidebar">Toggle</SidebarTrigger>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| SidebarTrigger | Sidebar toggle | `<button p="sidebar-trigger">` |
| Sidebar | Side navigation | `<dialog p="sidebar">` |

## Props

### SidebarTriggerProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| commandfor | `string` | — | Target sidebar ID to control. |

### SidebarProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the sidebar dialog. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Sidebar | aria-current | page | Forwarded attribute used by the component styling. |
| Sidebar | hidden | boolean | Forwarded attribute used by the component styling. |
| Sidebar | open | boolean | Reflects whether the element is expanded. |

## Notes

- Renders a `<dialog>` so it can slide in as a modal on small screens.
- SidebarTrigger toggles the hidden/open state with the command attribute.

---

_Source: `src/components/sidebar/index.tsx`
