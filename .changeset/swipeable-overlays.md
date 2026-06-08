---
"kinu": minor
---

Drawer and `mobile="drawer"` overlays are now swipeable on touch devices.

On `(hover: none) and (pointer: coarse)` the `<dialog>` itself becomes a CSS
scroll-snap container — no wrapper elements, no extra DOM. A `::before` pseudo
acts as the transparent dismiss rail, and `background-attachment: local` paints
the panel surface behind the content, keeping everything in CSS. The only
JavaScript is a tiny shared `installSwipe()` handler (~10 lines) that glides
the panel up on open and closes the dialog once a dismiss gesture settles at
`scrollTop 0`. Desktop is unchanged.
