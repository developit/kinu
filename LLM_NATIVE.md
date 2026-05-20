# Making Kinu LLM-Native

`API_REVIEW.md` audits the current state and the predictability gaps for LLMs. This document tracks what's been shipped from those findings and what's deliberately deferred.

The guiding principle stays minimal: **re-leverage native HTML, never invent state machinery the platform already provides.** Most of the recommendations below cost zero or near-zero bytes because they piggyback on the existing factory and the existing `<details>` / `<dialog>` substrates.

## Shipped

### Tabs over `<input type="radio">`

The original `Tabs` rendered `<button aria-selected>` and required users to manage selection state externally — the one component in the kit that contradicted Kinu's "DOM is the state machine" rule. An interim pass moved it onto `<details name>`, which solved the state-ownership problem but left a keyboard edge case (Enter on the active tab) that needed a +90 B handler to fix cleanly. The final substrate is `<input type="radio">`, which has the same exclusive-selection group semantics as `<details name>` plus correct keyboard behavior out of the box:

```tsx
<Tabs>
  <Tab checked>Overview</Tab>
  <TabPanel>...</TabPanel>
  <Tab>Details</Tab>
  <TabPanel>...</TabPanel>
</Tabs>
```

- `Tabs` — `<div k="tabs">` strip wrapper, generates a `useId()` and provides it via context.
- `Tab` — `<label k="tab">` wrapping a visually-hidden `<input type="radio" name=…>`. The radio's `name` is read from context, so all `Tab`s inside one `Tabs` are mutually exclusive. Props on `<Tab>` (including `checked`, `disabled`, `value`, etc.) forward to the inner radio.
- `TabPanel` — `<div k="tab-panel">`, positioned absolutely below the strip. Shown via CSS sibling selector `[k="tab"]:has(> input:checked) + [k="tab-panel"]`.
- `TabList` — kept as a `@deprecated` alias for `Tabs`.

`form=""` is set on the radios so they don't get serialized if `<Tabs>` is rendered inside a `<form>`. There is no JS event handling; selection is entirely platform-native.

**Cost: −2 bytes gzipped vs the `<details>` interim, by paying for the substrate switch out of an unrelated refactor (below).** (See `IMPL_COSTS.md`.)

### `createSimpleComponent` `defaultProps` accepts a function

The factory's third argument now accepts either an object of defaults (existing behavior) or a function `(props) => finalProps`. When function-form, the factory uses the return value directly as the final props, after which it sets `k` and renders.

This unlocks the "compute props from context / from other props" use case without writing a separate function component (which costs more bytes than the csc form once the pattern repeats). Used by Tabs internally and by 9 other conversions.

The function form is also smaller than what you'd write by hand because:
- The factory wraps it in `forwardRef`, so `ref` Just Works — no boilerplate at the call site.
- The function returns the final props *including any spread of incoming props*, so call sites that want to forward props spread `...p`; call sites that want to strip props (like Tab itself) just don't spread. No factory-level merge — the call site decides.

### 9 components converted to csc-with-fn-defaults

`DialogContent`, `PopoverContent`, `SheetContent`, `DrawerContent`, `DropdownMenuContent`, `ContextMenuContent`, `CarouselContent`, `CarouselPrevious`, `CarouselNext` were rewritten from `function Foo({…}) { return <host k="…" /> }` to `createSimpleComponent('foo', 'host', p => ({...p, id: p.id ?? useContext(IdCtx)}))`. Each conversion gains real `ref` forwarding and saves bytes once 3+ are in the bundle.

Container components (`Dialog`, `Popover`, `Sheet`, `Drawer`, `DropdownMenu`, `ContextMenu`, `Carousel`) were *not* converted — measured larger because the body has `install*` calls + a Provider wrap + a host element, and csc-fn-defaults doesn't compose as compactly. Triggers / Closes can't be csc'd at all because they clone a child via `applyPropsToChildren` rather than rendering their own host.

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
- **Demo files using old Tabs API.** `demo/src/routes/{player,getting-started,dashboard}.tsx` use the original `<TabList>` + `<Tab aria-selected onClick>` + conditional `<TabPanel>` shape. They still compile against the deprecated `TabList` alias, but the markup pattern is now wrong and the demos will render incorrectly. Needs a separate pass.

## Rejected

- `data-k` migration / `class=` emission. Kinu's `k=` attribute stays.
- Invented `value` / `onValueChange` API on Tabs / Accordion / ToggleGroup / RadioGroup. Native bubbled `change`/`toggle` events suffice.
- `IntersectionObserver`-based lazy mount. Sync flush via Preact's `options.debounceRendering` is cheaper if/when lazy-mount lands.
- `TabsTrigger` / `TabsContent` Radix-style naming. `Tab` / `TabPanel` correctly name the parts.
- `Status` / `Chip` merge into `Badge`. Three components, three jobs.
- `Dialog` / `Sheet` / `Drawer` triple merge. Only `Sheet`+`Drawer` are candidates.
- Converting `Dialog` / `Popover` / `Sheet` / `Drawer` / `DropdownMenu` / `ContextMenu` / `Carousel` *container* components to csc-with-fn-defaults — measured +30–40 B each because their bodies contain install\* calls + Provider wraps that don't fit the csc shape compactly.
- Merge-in semantics for fn-form defaults (factory does `Object.assign({}, props, fn(props))` so call site returns just overrides). Measured +16 B gz vs current "return final props" shape, and loses the ability for call sites to strip incoming props.
