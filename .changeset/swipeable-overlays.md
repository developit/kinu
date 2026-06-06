---
"kinu": minor
---

Drawer, Sheet and Sidebar are now swipeable on touch devices.

On `(hover: none) and (pointer: coarse)` the overlay's `<dialog>` becomes a
native CSS scroll-snap container: the panel rests against one edge next to an
empty "rail" you can fling it away into. All of the gesture tracking, momentum
and snap-back is the browser's — the only JavaScript is a ~tiny shared
`installSwipe()` helper that glides the panel in on open and closes the dialog
once a dismiss gesture settles. Desktop is unchanged (the existing
transform-based transition), selected purely in CSS via a `--swipe` flag, so
there is no branching in the component code.
