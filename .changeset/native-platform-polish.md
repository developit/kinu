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

- Squircle corners (`corner-shape`) on rounded-rectangle surfaces, a themeable
  elevation scale (`--k-shadow-sm/md/lg`), and translucent "material" surfaces
  on floating menus, hover cards and toasts — all respecting
  `prefers-reduced-transparency`, `prefers-contrast` and `forced-colors`.
- Modal scrims (dialog, drawer, sheet, sidebar and the adaptive mobile drawers)
  animate their blur in step with the dimming instead of snapping to full
  strength on the first frame, and it tracks the gesture while swiping. The
  radius is exposed as `--k-backdrop-blur`, and drops to `none` under
  `prefers-reduced-transparency` and `forced-colors`.
- Fully themed `<select>` drop-down where `appearance: base-select` is
  supported: kinu's overlay treatment, item-styled options and a tinted
  `::checkmark`, with no JavaScript. Other engines keep the native popup.
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
