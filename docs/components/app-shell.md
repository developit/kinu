# App Shell

Full-page application scaffold — header, sidebar, main, and footer in a CSS grid.

## Usage

```tsx
import {AppShell} from 'kinu';

<AppShell>
  <AppShell.Header>Acme</AppShell.Header>
  <AppShell.Sidebar>{/* nav */}</AppShell.Sidebar>
  <AppShell.Main>{/* content */}</AppShell.Main>
  <AppShell.Footer>© 2026</AppShell.Footer>
</AppShell>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| AppShell | Component | — |
| AppShell.Header | Component | `<header k="app-shell-header">` |
| AppShell.Sidebar | Component | `<aside k="app-shell-sidebar">` |
| AppShell.Main | Component | `<main k="app-shell-main">` |
| AppShell.Footer | Component | `<footer k="app-shell-footer">` |

## Notes

- CSS-only: a `<div k="app-shell">` using named grid areas, `min-height:100dvh`, and semantic `<header>`/`<aside>`/`<main>`/`<footer>` parts. Zero JavaScript.
- Collapses to a single column at ≤48rem; the inline sidebar rail hides so you can hand mobile navigation to the modal `Sidebar` dialog.
- Compound parts: `AppShell.Header`, `AppShell.Sidebar`, `AppShell.Main`, `AppShell.Footer`. Style each region with normal CSS or inline styles.

---

_Source: `src/components/app-shell/index.tsx`
