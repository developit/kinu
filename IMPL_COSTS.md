# Implementation Cost

Sizes from Vite's library output (`dist/index.js`), gzipped via `gzip -c`.

| Stage | raw | gzipped | Δ raw | Δ gz |
|---|---:|---:|---:|---:|
| Pre-Tabs baseline | 22,101 | 6,379 | — | — |
| `a203de2` — Tabs over `<input type="radio">` + factory `defaultProps`-as-fn + 9 csc conversions | 21,583 | 6,400 | −518 | +21 |
| **HEAD — rework Tabs layout (sibling panels + N-unrolled CSS link) + restore `Tabs` alias** | **21,674** | **6,420** | **+91** | **+20** |

**HEAD total vs pre-Tabs baseline: −427 raw / +41 gz.**

## `a203de2` — factory `defaultProps`-as-function + 9 conversions + initial radio Tabs

`createSimpleComponent`'s third argument now accepts either an object of
fallback props or `(props) => finalProps`. The function form lets a component
compute props from context or other props and choose what to forward, without
writing a separate wrapper.

9 components converted: `DialogContent`, `PopoverContent`, `SheetContent`,
`DrawerContent`, `DropdownMenuContent`, `ContextMenuContent`, `CarouselContent`,
`CarouselPrevious`, `CarouselNext`. Each gains ref forwarding; the shared
`r("x-content","dialog", p => ({...p, id: p.id ?? useContext(Ctx)}))` shape
compresses well as it repeats.

Tabs substrate moved from `<button aria-selected>` to `<input type="radio">`.
Native exclusive selection via shared `name`, native arrow-key nav, native
form-non-participation (`form=""`). No JS state, no event handlers.

Containers (`Dialog`/`Popover`/`Sheet`/`Drawer`/`DropdownMenu`/`ContextMenu`/
`Carousel`) and Trigger/Close components were not converted — measured larger
or impossible (Triggers/Closes clone children via `applyPropsToChildren` and
have no host element).

## HEAD — rework Tabs layout: sibling panels + N-unrolled `:has` link

The first pass placed `<TabPanel>`s inside `<TabList>` interleaved with tabs
and positioned them absolutely under the strip. Two problems:

1. **Position-absolute broke vertical reflow** of the surrounding page (the
   panel content didn't push subsequent content down).
2. **The well's `width: fit-content` constrained the panel's containing
   block**, so the panel was clipped to the hugging-pill width — bad in the
   common "narrow tabs, wide panel content" case.

A full-width well "fixes" #2 but makes the pill look stupidly wide on its own.
The structural cause is forcing tabs *and* panels into one box: a hugging
pill wants `width: fit-content`, the panel wants the parent's full width —
they can't share a box and a width.

**Decoupling.** `<TabList>` stays the strip (hugging pill, sized to tabs,
horizontally scrollable on its own). `<TabPanel>`s render *after*
`<TabList>` as siblings, in normal block flow at the parent container's
width. The tab-to-panel link is expressed in selectors rather than DOM
containment, by N unrolled rules:

```css
[k="tablist"]:has([k="tab"]:nth-of-type(1) > input:checked) ~ [k="tab-panel"]:nth-of-type(1),
…
[k="tablist"]:has([k="tab"]:nth-of-type(12) > input:checked) ~ [k="tab-panel"]:nth-of-type(12) {
  display: block;
}
```

`TabPanel` now renders as `<section>` so `:nth-of-type` self-isolates from the
`<div k="tablist">`. The 12 rules compress to roughly nothing (massive
repetition). N=12 covers any realistic tab strip; if you need more, edit one
CSS file.

Cost vs `a203de2`: **+20 B gz** (≈+9 B for the CSS rework; ≈+11 B for restoring a `Tabs = TabList` deprecated alias). JS factory side is unchanged.

Verified in a real browser via Playwright: click + arrow nav switch
selection, panel widths track the parent container (960 px on
getting-started, 300 px in the narrow player sidebar), sliding indicator
intact, no page errors, no a11y regressions over `a203de2`.

Tradeoffs that remain:

- **Up to 12 tabs.** Trivially extensible.
- **AT announces the strip as a radio group, not an ARIA tablist** (no
  `role="tab"`/`role="tablist"`/`role="tabpanel"`). The compromise we
  signed off on: `<input type="radio">` is itself an accessible primitive,
  and the byte cost of a true tablist (+150–340 B gz depending on keyboard
  scope) isn't worth it for this kit.

## How to reproduce

```bash
pnpm build
wc -c dist/index.js
gzip -c dist/index.js | wc -c
```
