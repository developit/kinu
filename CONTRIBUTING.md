# Contributing a Component

This is the single source of truth for **how a component gets added to kinu**. It exists so every
new component is structurally consistent and the project's size-first discipline is enforced by
process rather than memory. Read it once before your first component; skim the checklist every time
after.

For the *why* behind these conventions see [`ARCHITECTURE.md`](./ARCHITECTURE.md); for *what to build
next* and the per-component size budgets see [`ROADMAP.md`](./ROADMAP.md).

## The prime directive

kinu ships behaviour the platform already provides, styled with CSS, with **near-zero JavaScript**.
Before writing a component, find the native element or platform feature that already does the work
(`<details>`, `<dialog>`, `<progress>`, the `command`/`commandfor` attributes, CSS anchor
positioning, `field-sizing`, typed `attr()`, …). If you are reaching for `useState`, an event
handler, or a portal, stop and check whether the browser can do it declaratively first. A component
that adds kilobytes of JS to replicate something CSS can do does not belong here.

## Toolchain

```sh
pnpm install        # one-time
pnpm dev            # vite build --watch (rebuilds dist/ on change)
pnpm test           # vitest run
pnpm lint           # tsc (type gate) + biome lint (JS/TS only — see note)
pnpm build          # production build to dist/
pnpm build:size     # build, then print gzipped bundle size (the size gate)
```

> **Lint note:** biome's experimental CSS parser cannot handle kinu's deliberately-modern CSS
> (typed `attr()`, `@position-try`, nested `@starting-style`), so CSS linting is disabled in
> `biome.json`. `tsc` is the type gate; biome lints JS/TS only. Keep `pnpm lint` green.

## Anatomy of a component

Every component is a folder under `src/components/<name>/`:

```
src/components/<name>/
  index.tsx     # the component — imports './style.css'
  style.css     # styles, scoped to [k="<name>"]
  types.ts      # <Name>OwnProps, <Name>Props, variant unions
```

Most components are one line. The factory stamps a `k="<name>"` attribute onto a native element and
forwards every other prop straight to the DOM — that `k` attribute is the only styling hook:

```tsx
// src/components/badge/index.tsx
import {createSimpleComponent} from '../../lib/create-simple-component';
import type {BadgeOwnProps} from './types';
import './style.css';

export const Badge = createSimpleComponent<'span', BadgeOwnProps>('badge', 'span');
```

```css
/* src/components/badge/style.css — target the k attribute, never a class */
[k='badge'] {
  /* ... */
}
```

`createSimpleComponent<Tag, OwnProps>(name, tag, defaultProps?, ref?)`:

- **`name`** — the `k` attribute value and CSS selector key. Consumers cannot override it.
- **`tag`** — the DOM element to render (e.g. `'span'`), or a function `(props) => tag` to switch
  element by prop (e.g. `<a>` when `href` is present).
- **`defaultProps`** — default attributes merged onto the element.
- **`ref`** — optional internal ref callback (may return a cleanup function).

Components that genuinely need behaviour (e.g. `Dialog`) wrap a native platform API and add the
*minimum* logic, still forwarding attributes directly. Prefer the `command`/`commandfor` polyfill in
`src/lib/commands.ts` over bespoke event wiring — see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Wiring checklist

1. **Create the folder** `src/components/<name>/` with `index.tsx`, `style.css`, `types.ts`.
2. **Export from the barrel** in `src/index.ts`:
   ```ts
   export {Name} from './components/name';
   export type {NameProps, NameOwnProps} from './components/name/types';
   ```
   (CSS reaches `dist/index.css` automatically because `index.tsx` imports `./style.css`.)
3. **Register the docs page** in `docs/metadata.mjs` — add an entry with `slug`, `title`,
   `section: 'Components'`, `category`, `order`, `folder: '<name>'`, a one-line `description`, a
   `usage` snippet, and any `notes`.
4. **Add a live example** at `docs/examples/<name>.tsx` exporting `{Demo, code}` (mirror an existing
   one such as `docs/examples/table.tsx`). `folder` in the metadata maps 1:1 to this file.
5. **Use design tokens** — colors, radius, spacing, and motion come from the `--k-*` variables in
   `src/variables.css`. Never hard-code a spacing or radius value; use the scale.

## Gates (Definition of Done)

A component is done when **all** of these pass:

| Gate | Command | Requirement |
| --- | --- | --- |
| Types | `pnpm lint` | `tsc` clean, biome (JS/TS) clean |
| Tests | `pnpm test` | green — must render under SSR without throwing |
| Size | `pnpm build:size` | within the component's budget in `ROADMAP.md` |

Tests live in `src/__tests__/`. At minimum a component must survive the SSR smoke test
(`preact-render-to-string` must not throw without a DOM); add focused tests for any real behaviour.

## Size discipline

Size is the headline metric, not an afterthought. Every commit that touches `src/` **must record the
gzipped bundle delta in its message**, split by output:

```
feat(stack): add Stack layout primitive

CSS-only flex stack with gap/direction/align/justify via --k-* tokens.
JS Δ +0 B · CSS Δ +180 B (gzip, dist/)
```

Run `pnpm build:size` before and after your change to get the numbers. If a component blows its
budget, that is a design signal — find the native/CSS path that costs less, don't merge the bloat.
Non-bundle changes (docs, demo, config, benchmarks) are `JS Δ 0 B · CSS Δ 0 B`; say so explicitly.

## Commits

- One logical change per commit; never batch multiple components.
- Conventional-commit prefixes (`feat`, `fix`, `chore`, `docs`, `bench`, `refactor`).
- Include the size delta line as shown above.
