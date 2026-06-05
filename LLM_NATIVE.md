# Making Kinu LLM-Native

`API_REVIEW.md` audits the current state and the predictability gaps for LLMs.
This document tracks what's been shipped from those findings and what's
deliberately deferred.

The guiding principle stays minimal: **re-leverage native HTML, never invent
state machinery the platform already provides.** Most of the recommendations
below cost zero or near-zero bytes because they piggyback on the existing
factory and the existing `<details>` / `<dialog>` / `<input type="radio">`
substrates.

## Shipped

### `createSimpleComponent` `defaultProps` accepts a function

`defaultProps` can now be either an object of fallbacks (props win) or
`(props) => finalProps` called per-render whose return value is the complete
prop set. Lets a component compute props from context/other props and choose
what to forward, without writing a separate wrapper component.

Used by 9 conversions: `DialogContent`, `PopoverContent`, `SheetContent`,
`DrawerContent`, `DropdownMenuContent`, `ContextMenuContent`, `CarouselContent`,
`CarouselPrevious`, `CarouselNext`. Each gains `ref` forwarding, and the
shared shape compresses as it repeats. See `IMPL_COSTS.md` Commit 1.

### Tabs over `<input type="radio">`

The original `Tabs` rendered `<button aria-selected>` and required users to
manage selection state externally — the one component in the kit that
contradicted Kinu's "DOM is the state machine" rule. Replaced with the same
strategy `Accordion` uses (a one-line `createSimpleComponent` wrapping a
native primitive), but in a different primitive: an `<input type="radio">`
group with a shared `name`.

```tsx
<TabList>
  <Tab defaultChecked>Overview</Tab>
  <Tab>Details</Tab>
</TabList>
<TabPanel>...</TabPanel>
<TabPanel>...</TabPanel>
```

- `TabList` — `<div k="tablist">`, generates a `useId()` and provides it via context.
- `Tab` — `<label k="tab">` wrapping a visually-hidden `<input type="radio" name="…" form="">`. Props on `<Tab>` (including `defaultChecked`, `disabled`, `value`) forward to the inner radio.
- `TabPanel` — `<section k="tab-panel">`, a *sibling* of `<TabList>` (not nested inside). The Nth `Tab` controls the Nth `TabPanel` via N=12 unrolled CSS rules.

Why panels are siblings, not children: see `IMPL_COSTS.md` Commit 2. Short
version: a hugging-pill well wants `width: fit-content`, the panel wants the
parent's width — they can't share one box, so the link between them is
expressed in selectors rather than DOM containment.

**Zero JS for selection, keyboard, focus, form-exclusion.** All native to
HTML radio groups.

Tradeoff: AT announces this as a radio group, not an ARIA tablist (no
`role="tab"` etc.). For an unbranded utility kit the byte cost of a true
tablist isn't worth it; `<input type="radio">` is itself an accessible
primitive.

### Documentation reconciliation

- `AGENTS.md` `[p="button"]` and `--p-*` references corrected to `[k="button"]` / `--k-*` to match source.
- `ARCHITECTURE.md` and `README.md` bundle-size figures updated to current measurements.
- `ARCHITECTURE.md` Tabs example updated to the new shape.
- `docs/pages/commands.md` `kinu-command` event renamed to native `command`.
- `docs/components/tabs.md` rewritten to document the radio-Tabs shape and the panels-as-siblings structural choice.
- `docs/examples/tabs.tsx` updated.

## Deferred

The recommendations below are documented in `API_REVIEW.md` and are valuable
LLM-native improvements, but each has a non-trivial cost and was not included
in this initial pass. They can be revisited individually based on
cost/benefit:

- **Compound notation parity.** Ship both flat and dot-static for every compound component. Mostly re-exports — should be near-zero cost — but worth measuring per-family before applying broadly.
- **Vocabulary normalisation.** Standardise on `Trigger` / `Content` / `Item` / `Close` where it doesn't fight the domain. Notably *not* renaming `Tab`/`TabPanel` (those are the right names for the parts).
- **Item un-deprecation.** Promote `DropdownMenuItem` / `ContextMenuItem` / `ComboboxItem` / `ListboxItem` / `ListItem` from `@deprecated` aliases to first-class typed wrappers around `Item`. Trivial cost; not done here.
- **Accordion compound exports.** Add `AccordionTrigger` / `AccordionContent` as one-line wrappers over `<summary>` / `<div>` so users can write the same shape as Tabs. The existing `<Accordion><summary>…</summary>…</Accordion>` shape continues to work.
- **Lazy-mount on first show.** A single global `beforetoggle` listener that gates child rendering until first reveal would let overlays and disclosures avoid mounting cost for never-opened content. Worth ~50-100 bytes if cleanly implemented; deferred until the per-component opt-in pattern is settled.
- **`Sheet` / `Drawer` shared substrate.** They differ only in `position`. Could share one CSS file with a `position` prop and turn `Drawer` into a one-line alias for `<Sheet position="bottom">`.
- **`OtpInput` rename.** Cosmetic case-normalisation. ~0 byte cost via deprecated alias.
- **`role="tablist"` styling on `ToggleGroup`.** Lets a tab-strip-without-panels share styling with `Tabs` via a CSS attribute selector. Pure CSS; no JS cost.
- **Layout primitives** (`Stack` / `Row` / `Grid` / `Spacer` / `Center`) and **typography** (`Text` / `Heading` / `Title` / `Code`). LLMs reach for these from priors. Each is a ~5-line `createSimpleComponent` + a few CSS rules, but each adds bytes and surface — better to ship deliberately than as a bundle.
- **`RadioGroup` / `ToggleGroup` substrate change** (fieldset + label-wrapped inputs with auto-`name`). Eliminates per-Radio `id`/`htmlFor` boilerplate at call sites but costs more in the library than is worth without explicit demand.

## Rejected

- `data-k` migration / `class=` emission. Kinu's `k=` attribute stays.
- Invented `value` / `onValueChange` API on Tabs / Accordion / ToggleGroup / RadioGroup. Native bubbled `change`/`toggle` events suffice.
- `IntersectionObserver`-based lazy mount. Sync flush via Preact's `options.debounceRendering` is cheaper if/when lazy-mount lands.
- `TabsTrigger` / `TabsContent` Radix-style naming. `Tab` / `TabPanel` correctly name the parts.
- `Status` / `Chip` merge into `Badge`. Three components, three jobs.
- `Dialog` / `Sheet` / `Drawer` triple merge. Only `Sheet`+`Drawer` are candidates.
- Converting `Dialog` / `Popover` / `Sheet` / `Drawer` / `DropdownMenu` / `ContextMenu` / `Carousel` *container* components to csc-with-fn-defaults — measured +30–40 B each because their bodies contain install\* calls + Provider wraps that don't fit the csc shape compactly.
- Merge-in semantics for fn-form defaults (factory does `Object.assign({}, props, fn(props))` so call site returns just overrides). Measured +16 B gz vs current "return final props" shape, and loses the ability for call sites to strip incoming props.
- A delegated-JS ARIA tablist implementation (real `role="tablist"`/`role="tab"`/`role="tabpanel"` + roving tabindex + arrow handler). Measured +150–340 B gz depending on keyboard scope; rejected because the rest of the kit (Accordion, RadioGroup, ToggleGroup) leans on platform primitives for similar problems rather than building ARIA towers, and the byte cost was disproportionate to the marginal a11y gain over a labeled radio group.
