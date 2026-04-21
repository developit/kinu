# Base Styles

`kinu/style.css` ships the entire styling surface for the toolkit. Import it once near your application root to get:

- A modern reset that normalises box-sizing, typography smoothing, and dialog/backdrop defaults.
- Design tokens for light and dark themes exposed as `--k-*` custom properties.
- Every component selector keyed off its `p` attribute so variants render immediately on first paint.

The file intentionally avoids opinionated typography or layout decisions. Layer your own fonts, spacing scale, and page chrome on top—kinu only ensures components start from a consistent baseline.

## Import Order

Load `kinu/style.css` before any custom overrides so the shared tokens cascade correctly:

```ts
import 'kinu/style.css';
```

If you already have a global reset, audit it against the defaults in `style.css`. Keep the root-level tokens and dialog/backdrop rules so overlay components remain functional.
