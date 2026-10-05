# kinu

## 0.3.0

### Minor Changes

- 0277cb5: Theming: kinu's default tokens now live in a `@layer tokens` cascade layer, and
  control sizing moves behind density tokens.

  **Token layering.** Every `--k-*` default in `variables.css` is declared inside
  `@layer tokens`. Unlayered rules beat layered ones regardless of specificity, so
  overriding kinu no longer needs specificity tricks or `!important` — a plain
  `:root { --k-primary: … }` in your own stylesheet wins on its own, as does a
  `[data-theme="…"] { --k-* }` block. Existing overrides keep working; the
  escalation some of them use is now unnecessary.

  **Density.** Row and control sizing is token-driven (`--k-row-*`,
  `--k-control-*`) rather than hard-coded, so buttons, inputs, selects, textareas,
  toggles, tabs and menu rows resize as a coordinated set. Pick a ramp with
  `<html data-kinu-density="sm|md|lg">`.

  The default is adaptive, which changes sizing on touch and narrow viewports:
  under `(pointer: coarse), (max-width: 640px)` kinu applies the `lg` ramp
  automatically, so controls are taller than in previous releases (36px → 40px
  baseline, 14px → 15px text, 16px → 18px icons). Setting `data-kinu-density` to
  any value — including an empty one — opts out and restores fixed sizing.

  **Focus appearance.** Two tokens now drive focus across every input-like
  component: `--k-focus-ring` (the `:focus-visible` box-shadow) and
  `--k-focus-border` (its border colour). Input, textarea, select, switch, radio,
  otp, toggle, color-picker and the input-group wrapper all honour them, so one
  pair of values restyles the set. Components with deliberately bespoke focus
  treatment — button, slider thumb, tab, chip, tree, listbox — keep their own
  rules. `--k-focus-border` defaults to the resting border colour, so the default
  focus appearance is unchanged.

  **Bundled themes.** Themes now ship as their own stylesheets under a
  `kinu/themes/*.css` subpath, so you can pull one in next to the base CSS:

  ```js
  import "kinu/style.css";
  import "kinu/themes/claw.css";
  ```

  Then set `data-theme` on the root element — `<html data-theme="claw">` — to
  activate it. Importing a theme without setting the attribute costs you nothing
  but the bytes; the stylesheet only declares `[data-theme="…"]` rules.

  The first bundled theme is `claw`, a monochromatic Claude Code-style design
  system, which doubles as the worked example for what these hooks can do.

- 541eae6: More theming hooks: a radius scale, elevation tokens, and tokens for the
  handful of values that previously meant re-authoring an awkward selector.

  **Radius scale.** `--k-radius-1` through `--k-radius-4` express a four-step ramp
  as offsets from the `--k-radius` anchor, tightest to loosest, with step 3 being
  `--k-radius` itself. Components that hard-coded `calc(var(--k-radius) - 2px)`
  now reference a step, so moving `--k-radius` shifts the whole set coherently
  while any individual step stays re-pinnable (`--k-radius-1: 0`) without
  disturbing the others. Computed values are unchanged.

  **Elevation.** `--k-shadow-1` (resting), `--k-shadow-2` (floating) and
  `--k-shadow-3` (modal) replace per-component shadow literals, so three values
  retune every elevated surface at once.

  This normalizes the scale, which changes default appearance. Dropdowns, menus
  and comboboxes previously carried a heavier shadow than modal dialogs did.
  Surfaces now stack in the order you would expect: cards below popovers, menus
  and hover-cards, which sit below dialogs, sheets and drawers. In practice
  dialogs and sheets read noticeably deeper than before and dropdowns lighter.
  Setting the three tokens restores any previous look.

  **Surface tokens.** `--k-font-mono` (shared by `kbd` and prose `code`),
  `--k-tab-indicator-bg`, `--k-avatar-font-size`, `--k-scrollbar-size` /
  `--k-scrollbar-thumb` / `--k-scrollbar-thumb-hover`, and `--k-selection-bg`.
  These cover the cases where restyling previously meant reproducing a
  pseudo-element, some anchor-positioning machinery, or an internal sizing trick —
  set a value instead of a selector. The segmented tab indicator can now be
  recoloured without re-authoring its `::before` and the `@supports` fallback that
  backs it, and avatar initials take a plain `font-size`: the em-multiplier the
  initials are built on stays internal, so a px value can no longer be fed through
  it and blow the glyph up.

  Text selection inside kinu components is now tinted from `--k-selection-bg`.
  Like the scrollbar styling, the rule is scoped to kinu elements and their
  contents, so selection elsewhere on your page keeps the browser's colour. Set
  `--k-selection-bg` to `Highlight` to opt kinu's own components back out.

### Patch Changes

- 77563ce: Fix two defects in the generated type declarations that made valid usage fail to compile.

  - **Multi-tag components dropped every prop their tags didn't share.** `Item` and `Button` pick their element from their
    props — an `<a>` when given an `href`, a `<button>` otherwise — so the factory computed `Omit<Button | Anchor, …>`.
    `Omit` doesn't distribute over a union and `keyof (A | B)` is only the keys `A` and `B` have in common, so the result
    kept just the shared props: `target` and `rel` (anchor) and `disabled` (button) were silently missing, and the emitted
    type disagreed with the hand-written `ItemProps`/`ButtonProps`. The tag's props are now omitted per-member and
    intersected after, so every tag's props survive.
  - **`ref` was uninhabitable.** Each component's `ref` was intersected with a second, bogus `ref?: HTMLElement`, which no
    value can satisfy — a correctly-typed ref was rejected along with everything else. A ref callback was rejected for a
    second reason: `ref`'s callback type was a union of two signatures, and TypeScript won't contextually type a parameter
    against a union, so `ref={el => …}` also raised an implicit `any` under `strict`. Ref callbacks are now a single
    bivariant signature, so `el` is inferred and cleanup-returning callbacks still typecheck.

  `ItemProps` and `ButtonProps` are now built from the same `SimpleComponentProps` helper the components themselves use, so
  the documented type and the component's real signature can no longer drift apart. A type-level regression test
  (`src/__tests__/prop-types.test-d.tsx`) pins both defects down at build time.

  Adds `ItemElement` and `ButtonElement` (`HTMLButtonElement | HTMLAnchorElement`) so a ref to a polymorphic component can
  be annotated without spelling out the union: `useRef<ItemElement>(null)`.

- a5b73fd: Fix ref forwarding, which only worked in the narrowest case.

  `ref` now reaches the DOM element for every component that renders one, and follows Preact's own attach/detach semantics.
  Four separate defects are fixed:

  - **Hand-written components never forwarded `ref` at all.** `AspectRatio`, `Avatar`, and the `Content`/`Trigger`/`Close`
    parts of `Dialog`, `Drawer`, `Sheet`, `Popover`, `DropdownMenu` and `ContextMenu`, plus `CarouselPrevious`/`CarouselNext`/
    `CarouselContent`, were plain function components. Preact assigned `ref.current` the internal Preact `Component` instance,
    so refs appeared to work but never yielded a DOM node.
  - **Components with `defaultProps` or an internal ref froze the first ref they saw.** The proxy was bound once per instance,
    so a ref that arrived on a later render, or was swapped for another, was ignored forever.
  - **Those components also never detached.** The proxy always returned a cleanup function, which opts a ref into Preact's
    cleanup protocol and suppresses the `null` call — object refs kept pointing at removed DOM nodes and callback refs were
    never called with `null`.
  - **Ref callbacks returning a non-function value could throw on unmount.** A cleanup is now only run when one was actually
    returned.

  `forwardRef` no longer wraps: it tags a component so `ref` arrives as a normal prop, which is both smaller and one less
  function call per render. `CarouselContent` now forwards the rest of its props to the underlying element as its type always
  promised. `Dialog.Trigger` and the other trigger components forward `ref` to the child they decorate.

## 0.2.0

### Minor Changes

- 2e2bceb: Overlay panels are now swipe-to-dismiss on touch devices: Drawer, Sheet,
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

## 0.1.4

### Patch Changes

- ded0741: fix broken build

## 0.1.3

### Patch Changes

- 72118ca: README updates

## 0.1.2

### Patch Changes

- e496405: Initial release as `kinu`.
