# Base Styles

`pui/style.css` ships the entire styling surface for the toolkit. Import it once near your application root to get:

- A modern reset that normalises box-sizing, typography smoothing, and dialog/backdrop defaults.
- Design tokens for light and dark themes exposed as `--p-*` custom properties.
- Every component selector keyed off its `p` attribute so variants render immediately on first paint.

The file intentionally avoids opinionated typography or layout decisions. Layer your own fonts, spacing scale, and page chrome on top—PUI only ensures components start from a consistent baseline.

## Import Order

Load `pui/style.css` before any custom overrides so the shared tokens cascade correctly:

```ts
import 'pui/style.css';
```

If you already have a global reset, audit it against the defaults in `style.css`. Keep the root-level tokens and dialog/backdrop rules so overlay components remain functional.


## Accessibility Media Queries

PUI base styles include two accessibility-focused media queries:

- `@media (prefers-reduced-motion: reduce)` minimizes non-essential animation and long transitions.
  - Entry transitions for overlays (`dialog`, `drawer`, `sheet`) are disabled.
  - Continuous loaders (`spinner`, `skeleton`) become static fallbacks.
  - Toast movement/transition timing is reduced to avoid motion-heavy stacking.
- `@media (forced-colors: active)` preserves critical affordances in high-contrast environments.
  - Focus-visible state uses a system `Highlight` outline.
  - Key surfaces and controls retain visible borders.
  - Disabled and selected/active states remain distinguishable.

If you layer custom styles on top of PUI, prefer extending these same media queries rather than adding JS flags. Keep motion/contrast behavior declarative so it stays cheap and predictable.
