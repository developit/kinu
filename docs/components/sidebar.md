# Sidebar

Responsive navigation rail backed by `<dialog>` so it can slide over the page on mobile.

## Import

```tsx
import {Sidebar, SidebarTrigger} from 'pui';
```

## Usage

```tsx
<Sidebar id="app-sidebar">
  <nav>
    <a href="/" aria-current="page">Dashboard</a>
    <a href="/settings">Settings</a>
  </nav>
</Sidebar>

<SidebarTrigger commandFor="app-sidebar">☰</SidebarTrigger>
```

## Behaviour

- On desktop the sidebar is pinned and the adjacent content receives left padding while the sidebar is visible.
- On small screens the sidebar becomes modal (`<dialog>`). The trigger toggles it using the command API.

## Accessibility

Supply `aria-label`/`aria-labelledby` for the nav content. When the sidebar is modal the browser manages focus automatically. Closing the dialog returns focus to the trigger button.

## CSS hooks

- `[p="sidebar"]` — layout and responsive transitions.
- `[p="sidebar"][hidden]` — hidden state on desktop.
- Mobile behaviour toggles `[p="sidebar"][open]`.
- `[p="sidebar-trigger"]` — base styles for trigger buttons (inherits button styles).
