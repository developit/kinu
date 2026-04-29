# Implementation Cost

Sizes from Vite's library output (`dist/index.js`), gzipped via `gzip -c`.

| Stage | raw | gzipped | Δ raw | Δ gz |
|---|---:|---:|---:|---:|
| **Baseline** | 22,101 | 6,379 | — | — |
| Tabs over `<details name>` (Tab → `<details>`, add TabLabel, alias TabList) | 22,172 | 6,402 | +71 | **+23** |

**Net: +23 bytes gzipped (+0.4%).**

The change is one `<details>` retag, one `<summary>` factory call (TabLabel), one `<div>` rename (TabList → Tabs), plus updated CSS. Selection state moves from JS-managed `aria-selected` to native `<details name=…>` exclusivity, which is free.

## How to reproduce

```bash
pnpm build
wc -c dist/index.js
gzip -c dist/index.js | wc -c
```
