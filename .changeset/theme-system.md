---
"kinu": minor
---

Theming: kinu's default tokens now live in a `@layer tokens` cascade layer, and
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

A reference theme built against these hooks lands at `src/themes/claw.css`. It
is not part of the package exports and is not included in the published CSS
bundle, so for now it is a worked example to copy from rather than a stylesheet
you can import from `kinu`.
