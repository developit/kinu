# Making Kinu LLM-Native

`API_REVIEW.md` audits the current state and the predictability gaps for LLMs. This document tracks what's been shipped from those findings and what's deliberately deferred.

The guiding principle stays minimal: **re-leverage native HTML, never invent state machinery the platform already provides.** Most of the recommendations below cost zero or near-zero bytes because they piggyback on the existing factory and the existing `<details>` / `<dialog>` substrates.

## Shipped

### Tabs over `<details name>`

The original `Tabs` rendered `<button aria-selected>` and required users to manage selection state externally — the one component in the kit that contradicted Kinu's "DOM is the state machine" rule. Replaced with the same substrate the rest of the disclosure family already uses:

```tsx
<Tabs>
  <Tab name="t" open>
    <TabLabel>Overview</TabLabel>
    <TabPanel>...</TabPanel>
  </Tab>
  <Tab name="t">
    <TabLabel>Details</TabLabel>
    <TabPanel>...</TabPanel>
  </Tab>
</Tabs>
```

- `Tabs` — `<div k="tabs">` grid wrapper.
- `Tab` — `<details k="tab" name=…>`. `display: contents` so its `<summary>` and panel children participate directly in the parent grid.
- `TabLabel` — `<summary k="tab-label">`, lays out into row 1 of the Tabs grid.
- `TabPanel` — `<div k="tab-panel">`, lays out into row 2; visible only when its parent `Tab[open]`.
- `TabList` — kept as a `@deprecated` alias for `Tabs`.

`name=` is required on each `Tab` (matches the existing `<Accordion name="faq">` convention). Tabs sharing a `name` are mutually exclusive via the platform's `<details name>` group; opening one closes the others without any JS.

CSS `pointer-events: none` on the open tab's `<summary>` blocks the mouse/touch close. The keyboard edge case (Enter on the focused active tab) is left unaddressed in this pass — the alternative was a +90B gz global `beforetoggle` handler, which is not worth the ratio.

**Cost: +23 bytes gzipped.** (See `IMPL_COSTS.md`.)

### Documentation reconciliation

- `AGENTS.md` `[p="button"]` and `--p-*` references corrected to `[k="button"]` / `--k-*` to match source.
- `ARCHITECTURE.md` and `README.md` bundle-size figures updated to current measurements.
- `ARCHITECTURE.md` Tabs example updated to the new shape.
- `docs/pages/commands.md` `kinu-command` event renamed to native `command`.

## Deferred

The recommendations below are documented in `API_REVIEW.md` and are valuable LLM-native improvements, but each has a non-trivial cost and was not included in this initial pass. They can be revisited individually based on cost/benefit:

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
