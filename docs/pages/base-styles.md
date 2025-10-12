# Base Styles

`pui/base.css` provides the minimal reset and structural utilities every component expects. Import it once near your application
root; the stylesheet includes:

- Modern CSS reset based on `@preact/signals` defaults with sensible tweaks.
- Box-sizing border-box, focus outline normalisation, and typography smoothing.
- Body-level color tokens wired to `variables.css` so text remains legible before hydration.
- Utility classes for the demo site (grid, layout) that you can reuse or ignore.

The file intentionally avoids opinionated typography or layout decisions. Customize fonts, spacing, and page chrome in your own
stylesheets—PUI only ensures components start from a consistent baseline.

## Import Order

Load `base.css` before any component CSS so cascading variables resolve correctly:

```ts
import 'pui/base.css';
import 'pui/variables.css'; // optional if you want direct access to tokens
```

If you already have a global reset, audit it against `base.css`. The critical pieces to keep are the custom properties declared on
`:root` and the dialog/backdrop rules required for overlay components.
