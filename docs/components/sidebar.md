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

| Name | DOM element | Details |
| --- | --- | --- |
| SidebarTrigger | <button> | Wraps <button> and sets p="sidebar-trigger". Defaults props to {}. Attaches a ref callback for additional behaviour. |
| Sidebar | <dialog> | Wraps <dialog> and sets p="sidebar". Defaults props to {
    tabIndex: -1,
  }. Attaches a ref callback for additional behaviour. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Sidebar | aria-current | page | Forwarded attribute used by the component styling. |
| Sidebar | hidden | boolean | Forwarded attribute used by the component styling. |
| Sidebar | open | boolean | Reflects whether the element is expanded. |

## Notes

- Renders a <dialog> so it can slide in as a modal on small screens.
- SidebarTrigger toggles the hidden/open state with the command attribute.

---

_Source: `src/components/sidebar/index.tsx`
