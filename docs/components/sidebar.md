# Sidebar

Responsive sidebar dialog that collapses on mobile.

## Usage

```tsx
import {Sidebar, SidebarTrigger} from 'kinu';

<Sidebar id="app-sidebar">
  <nav>...</nav>
</Sidebar>
<SidebarTrigger commandFor="app-sidebar">Toggle</SidebarTrigger>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| SidebarTrigger | Sidebar toggle | `<button k="sidebar-trigger">` |
| Sidebar | Side navigation | `<dialog k="sidebar">` |

## Props

### SidebarTriggerProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| commandFor | `string` | — | Target sidebar ID to control. |

### SidebarProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the sidebar dialog. |

## Notes

- Renders a `<dialog>` so it can slide in as a modal on small screens.
- SidebarTrigger toggles the hidden/open state with the command attribute.
- In its mobile modal mode on touch devices the sidebar is swipeable — swipe left to dismiss. The gesture is native CSS scroll-snapping, so momentum and snap-back come from the browser.
- Lays out as a grid, so direct children stack as rows. In the swipe mode the last child fills the remaining height and scrolls, which suits a fixed header followed by scrolling navigation.

---

_Source: `src/components/sidebar/index.tsx`
