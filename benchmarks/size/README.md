# Size benchmarks

This benchmark suite measures what consumers pay after tree-shaking and minification.

## Scenarios

- **one-component**: imports only `Button`
- **few-components**: imports a small UI slice (`Button`, `Input`, `Dialog`, `Popover`, and tab primitives)
- **nearly-all-components**: imports the full namespace from `src/index.ts`

## Run

```bash
pnpm bench:size
```

The script emits:

- `benchmarks/size/results/latest.json` for machine-readable diffs in CI
- `benchmarks/size/results/latest.md` for quick human review

Sizes include all generated `.js` and `.css` assets and report raw, gzip, and brotli bytes.
