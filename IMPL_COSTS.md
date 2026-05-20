# Implementation Cost

Sizes from Vite's library output (`dist/index.js`), gzipped via `gzip -c`.

| Stage | raw | gzipped | Δ raw | Δ gz |
|---|---:|---:|---:|---:|
| **Baseline** (pre-Tabs) | 22,101 | 6,379 | — | — |
| Tabs over `<details name>` (interim) | 22,172 | 6,402 | +71 | +23 |
| **Tabs over `<input type="radio">` + factory `defaultProps`-as-fn + 9 csc conversions** | **21,583** | **6,400** | **−518** | **−2** |

**Net vs `<details>`-interim: −589 raw / −2 gz.**

The shipped change does three things at once:

1. **Tabs substrate swap to `<input type="radio">`.** Native exclusive selection via shared `name`. Side-steps the keyboard-close edge case in the `<details>` version and lets the active state be queryable in CSS via `[k="tab"]:has(> input:checked)`. Costs ~+50 B alone.

2. **`createSimpleComponent` `defaultProps` accepts a function.** When the factory sees `typeof defaultProps === 'function'` it calls it with the live props and uses the return value as the final props. Static factory overhead: +7 B gz with nothing using it.

3. **9 function components converted to csc-with-fn-defaults.** Targets: `DialogContent`, `PopoverContent`, `SheetContent`, `DrawerContent`, `DropdownMenuContent`, `ContextMenuContent`, `CarouselContent`, `CarouselPrevious`, `CarouselNext`. Each saves ~6–10 B gz once the `r("x-content", "dialog", t => ({...t, id: t.id ?? d(ctx)}))` pattern is repeated. Total savings ~−60 B gz, which more than offsets (1) and (2). Also gains `ref` forwarding on each.

Container components (`Dialog`, `Popover`, `Sheet`, `Drawer`, `DropdownMenu`, `ContextMenu`, `Carousel`) were *not* converted — measured +30–40 B each because their bodies contain `install*` calls + Provider-wraps that don't fit the csc shape compactly. Trigger and Close components clone children via `applyPropsToChildren`, so they have no host element to render and can't be csc'd at all.

## How to reproduce

```bash
pnpm build
wc -c dist/index.js
gzip -c dist/index.js | wc -c
```
