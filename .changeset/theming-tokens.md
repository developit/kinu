---
"kinu": minor
---

More theming hooks: a radius scale, elevation tokens, and tokens for the
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

Text selection is now styled from `--k-selection-bg`. Unlike kinu's scrollbar
styling, which is scoped to elements marked `scrollable`, this rule is a bare
`::selection` and so applies to the whole document, not only kinu components.
Set `--k-selection-bg` to `Highlight` to hand selection back to the browser.
