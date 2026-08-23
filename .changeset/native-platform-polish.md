---
"kinu": minor
---

Lean harder on the platform: components now delegate to native DOM and CSS
features where they exist, and fall back to today's behaviour where they don't.

**Overlays run on the Popover API.** Popover, DropdownMenu and Combobox open in
the top layer, so they can no longer be clipped by an ancestor's `overflow` or
lose a `z-index` fight, and light dismiss, Escape and nested-menu management
come from the browser. This engages only where the Popover API *and* CSS anchor
positioning are both supported — a top-layer popover without anchors would
position against the viewport — so other engines keep the previous
`<dialog>.show()` path. Triggers now issue `command="toggle-popover"`, and the
command polyfill maps popover commands onto dialog methods on the fallback path.

**Modals use `closedby`.** Dialog, Sheet, Drawer and ContextMenu default to
`closedby="any"` for native light dismiss, with the JavaScript backdrop
hit-test kept as a fallback that honours the same attribute.

Three behaviour fixes come with this, worth knowing if you relied on the old
behaviour:

- **AlertDialog no longer closes on an outside click.** It was a verbatim
  re-export of Dialog, so it light-dismissed like one; it is now a wrapper
  defaulting to `closedby="closerequest"`, so dismissing an alert takes an
  explicit choice (Escape still closes).
- **Toasts render above open modals.** The toast container is a manual popover
  and so joins the top layer — previously any `showModal()` surface covered it,
  which no `z-index` could fix.
- **The adaptive `mobile="drawer"` conversion fires again.** Its `beforetoggle`
  interception listened on the bubble phase, and toggle events don't bubble.

**Styling and platform polish**

- Squircle corners (`corner-shape`) on rounded-rectangle surfaces, and
  translucent "material" surfaces on floating menus, hover cards and toasts —
  all respecting `prefers-reduced-transparency`, `prefers-contrast` and
  `forced-colors`.
- The elevation scale (`--k-shadow-1/2/3`) is now tinted from a single hue
  rather than pure black: retune every elevated surface by moving
  `--k-shadow-hsl` alone, and it darkens automatically under
  `prefers-contrast`. Values and role ordering are unchanged, so themes that
  override the three tokens (like claw) are unaffected.
- **Radii are compensated for squircles.** A squircle cuts its corner less
  deeply than a circle of the same radius, so corners read as under-rounded
  once `corner-shape` applies. The `--k-radius-1..4` ramp now hangs off a
  derived `--k-corner-radius`, which inside `@supports (corner-shape: squircle)`
  resolves to `calc(var(--k-radius) * 1.8408964)` — the ratio that matches
  corner depth, `1 + 2^(-1/4)` — so every step of the ramp is compensated at
  once. `--k-radius` keeps its meaning and its `0.5rem` default, so you still
  theme in round-corner terms and browsers without `corner-shape` render
  exactly the radii they do today. Components too small to hold the larger
  radius cap it, so checkboxes, kbd, badges, tabs, toggles, skeletons and the
  date/time inputs keep their shape instead of clamping to pills.
- **Restyling corners turns the scaling off with `--k-corner-scale: 1`.** The
  scaling is only correct while the corners really are squircles, so anything
  that sets `--k-corner-shape` should set this alongside it. kinu reads it as
  the fallback of the modifier, so setting it anywhere wins outright — no
  `!important`, no specificity contest. The bundled claw theme sets both: its
  radii come from Claude's design tokens, which were drawn as circular arcs.
- Modal scrims (dialog, drawer, sheet, sidebar and the adaptive mobile drawers)
  blur what's behind them at a constant radius, exposed as `--k-backdrop-blur`
  (now `blur(4px)`). No animation is involved: a scrim's own opacity composites
  its filtered backdrop, so the blur already arrives and leaves in step with
  the dimming — including when that opacity is scroll-driven by a swipe. Drops
  to `none` under `prefers-reduced-transparency` and `forced-colors`.
- Fully themed `<select>` drop-down where `appearance: base-select` is
  supported: kinu's overlay treatment, item-styled options and a tinted
  `::checkmark`, with no JavaScript. Other engines keep the native popup. On
  screens 640px and under the picker opens as a bottom sheet with thumb-sized
  rows, which is what the native mobile picker was doing before
  `appearance: base-select` opted out of it — surface, radius, scrim, padding
  and slide are Drawer's, down to the grab pill on touch, so it reads as the
  same kind of object as every other kinu sheet. Swipe-to-dismiss is the one
  thing it can't borrow: `::picker(select)` is a UA pseudo-element with no box
  to script, and its scroll offset can neither be read nor set. Tap-outside and
  Escape dismiss it natively.
- **Tooltips answer a long press on touch.** `:hover` is emulated and sticky
  there, so a tap used to pin a tooltip open until you tapped elsewhere. On
  coarse pointers the tooltip is driven by `:active` instead and gated behind a
  500ms `transition-delay` — Android's long-press threshold — so it appears
  under a held finger and leaves the moment it lifts. Pure CSS; desktop hover
  and focus are untouched.
- **Drawers can open to a detent.** Set `--k-drawer-height` on a `Drawer.Content`
  (or a `mobile="drawer"` overlay) and the sheet opens to that height, expands
  to its full height when flicked up, and steps back down through the same
  height on the way to being dismissed — three resting heights instead of two.
  While the sheet still has room to grow, scrollable subregions inside it stand
  down so the drag grows the sheet rather than scrolling a list, the hand-off
  native sheets do; once it is fully expanded they scroll normally and hand
  their overscroll back to the sheet. Unset, drawers behave exactly as before.
- **Drawer installs the swipe handlers it needs.** Every other swipe surface did;
  Drawer relied on one of them sharing the page, and on touch a Drawer by itself
  opened to a blank screen.
- **The grab pill keeps its clearance.** The 1rem above the first child moved
  off that child and onto the rail above it, so a heading that zeroes its own
  top margin — the usual way to start a sheet — no longer lands on the pill.
- Scroll-driven edge fades on ScrollArea, `::scroll-marker` carousel dots,
  tabular figures, accent/caret theming, and optical text wrapping and trimming.
- Sticky table headers cast a shadow only while stuck, via `scroll-state()`
  container queries.
- Themed scrollbars in browsers without `::-webkit-scrollbar` (Firefox), plus
  `scrollbar-gutter: stable` on scrollables.
- Anchored overlays hide when their trigger scrolls out of view
  (`position-visibility`).
- New opt-in `virtual` attribute on List and Tree renders rows on demand with
  `content-visibility`, keeping content in the DOM for find-in-page and
  assistive tech — no virtualization library.
- Combobox and Listbox highlight matched substrings using the Custom Highlight
  API, with no wrapper elements or DOM mutation.
- HoverCard wires up `interestfor` where Interest Invokers exist, so keyboard
  focus and touch long-press can open it; the CSS `:hover` fallback is
  unchanged elsewhere.
- New opt-in `<ColorPicker eyedropper>` renders a screen-sampling button in
  browsers with the EyeDropper API.
