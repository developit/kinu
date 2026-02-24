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

- `@media (prefers-reduced-motion: reduce)` applies a global transition/animation clamp so interaction remains immediate by default.
- `@media (forced-colors: active)` preserves critical affordances in high-contrast environments (focus ring, borders, disabled, selected/active states).

Component-level fallbacks for motion-heavy primitives (`dialog`, `drawer`, `sheet`, `spinner`, `skeleton`, `toast`) stay in each component stylesheet so behavior is explicit at the source of motion.

If you layer custom styles on top of PUI, extend these same media queries rather than introducing JS feature flags where CSS already solves it.
