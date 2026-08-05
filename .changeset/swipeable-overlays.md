---
"kinu": minor
---

Overlay panels are now swipe-to-dismiss on touch devices: Drawer, Sheet,
Sidebar, and the adaptive `mobile="drawer"` Popover, DropdownMenu and
ContextMenu.

Under `(hover: none) and (pointer: coarse)` the `<dialog>` becomes a CSS
scroll-snap container with a transparent `::before` rail beside (or above) the
panel, so flinging the panel into the rail dismisses it. Gesture tracking,
momentum and snap-back are the browser's own scrolling — the only JavaScript is
a shared `installSwipe()` control plane that jumps the scroller to its open
position and closes the dialog once a dismiss lands. CSS opts each overlay in
with `--swipe`, whose value picks the axis and direction (`y` for the bottom
drawers, `x` for Sheet, `-x` for Sidebar), so desktop keeps its existing
transform transitions untouched. The backdrop dims in step with the gesture via
a scroll-driven animation where supported.

Safari only shipped `scrollend` in 26.2, so where it is missing the dismiss
listener falls back to plain `scroll`. That is sound here because every dismiss
position is a scroll boundary and `scroll-snap-stop` leaves exactly one other
resting position, so arriving at the boundary already proves a dismiss.

Two structural changes come with this, worth checking if you style either
component's internals:

- **Sheet** renders a `[k="sheet-panel"]` element wrapping its children. The
  dialog is the swipe scroller and the panel is the surface, which keeps your
  content in normal block flow at every breakpoint. Selectors written as
  `[k="sheet-content"] > …` now need to target through the panel; descendant
  selectors are unaffected.
- **Sidebar** now lays out as a grid rather than a flex column, so direct
  children stack as grid rows. Children relying on flex behaviour (`flex: 1` to
  fill, for instance) may need adjusting.

Also fixes a `mobile="drawer"` Popover/DropdownMenu/ContextMenu bug where
closing appeared to have no animation: the panel inherited the desktop fade's
`opacity: 0` with no transition covering it, so it vanished on the first frame
while the slide-out played on an invisible element.
