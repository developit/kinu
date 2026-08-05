# Theming & Tokens

kinu exposes all visual styling through CSS Custom Properties declared in the bundled `kinu/style.css` (sourced from
`src/variables.css`). The defaults define both light and dark palettes, radii, spacing, and motion tokens. Because components
forward props as attributes, you override the design by setting CSS variables or adding new attribute selectors—no JavaScript
theme provider required.

## Changing Tokens

Override tokens at the root or within a scope. Tokens follow the `--k-*` naming convention:

```css
:root {
  --k-radius: 0.625rem;
  --k-primary: 221 83% 53%;
  --k-primary-foreground: 0 0% 100%;
}

[data-theme='dark'] {
  --k-background: 224 71% 4%;
  --k-foreground: 210 40% 98%;
}
```

Because values are stored as space-separated `h s l` triplets, components call `hsl(var(--k-primary))` to render consistent
colors. You can replace tokens with your own palette or plug in design system values.

## Spacing Scale

Layout primitives and `gap`-style props read from a fixed, theme-independent spacing scale. Reach for these tokens instead of
hard-coded lengths so spacing stays consistent across components:

| Token | Value | Pixels |
| --- | --- | --- |
| `--k-space-0` | `0` | 0 |
| `--k-space-xs` | `0.25rem` | 4px |
| `--k-space-sm` | `0.5rem` | 8px |
| `--k-space-md` | `1rem` | 16px |
| `--k-space-lg` | `1.5rem` | 24px |
| `--k-space-xl` | `2.5rem` | 40px |

The step names mirror kinu's `sm`/`md`/`lg` size convention, so a `gap="md"` prop maps to `--k-space-md`. Override a step at
the root to rescale spacing everywhere at once:

```css
:root {
  --k-space-md: 1.25rem; /* roomier default gap */
}
```

## Component Variants via Attributes

Each component maps props to attributes, letting you target them with CSS selectors:

```css
[k="button"][variant="brand"] {
  background-color: hsl(var(--brand));
  color: hsl(var(--brand-foreground));
}
```

Keep selectors minimal—apply only the delta from the base style to preserve small bundle size. For boolean props, target the
presence of the attribute: `[k="button"][loading] { opacity: 0.6; }`.

## Dark Mode

kinu ships light and dark palettes. Dark mode follows the OS by default
(`@media (prefers-color-scheme: dark)`); to force a scheme, set
`data-color-scheme` on `<html>` or any container:

```ts
document.documentElement.dataset.colorScheme = 'dark'; // or 'light'
```

Because tokens cascade, you can theme individual subtrees simply by setting `data-color-scheme` on a wrapping element.

## Animations & Motion

Animation curves live in `--k-ease` and related tokens. Adjust them globally or per component:

```css
:root {
  --k-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
}

[k="accordion"][open] {
  transition-duration: 200ms;
}
```

When you need reduced motion support, respect the `prefers-reduced-motion` media query and reduce durations or disable
animations in your overrides.

## Token Contract

The `--k-*` custom properties are kinu's **public theming API** — a stable surface you can rely on. Restyle the whole library
by overriding tokens; you rarely need to touch component selectors. The groups:

| Group | Tokens |
| --- | --- |
| Surfaces | `--k-background`, `--k-foreground`, `--k-card`, `--k-popover`, `--k-sidebar`, `--k-muted`, `--k-accent` (+ `-foreground`) |
| Brand | `--k-primary`, `--k-primary-foreground`, `--k-primary-hover`, `--k-primary-soft`, `--k-secondary` (+ states) |
| Semantic | `--k-success`, `--k-warning`, `--k-info`, `--k-destructive` (+ `-foreground`) |
| Lines & focus | `--k-border`, `--k-input`, `--k-ring` |
| Shape & spacing | `--k-radius`, `--k-space-0…xl` |
| Motion | `--k-ease`, `--k-ease-out`, `--k-ease-spring`, `--k-ease-elastic` |

Colors are stored as space-separated `h s l` triplets (not finished colors) so components can apply alpha:
`hsl(var(--k-primary) / 0.15)`. Keep that format when overriding, and derive related shades from a base where it helps —
e.g. `--k-primary-soft: var(--k-primary) / 0.15`.

## Preset Themes

Two ready-made brand palettes ship as standalone stylesheets. Import one after the base styles to recolor the whole library
(light and dark both covered):

```ts
import 'kinu/style.css';
import 'kinu/themes/violet.css'; // or 'kinu/themes/emerald.css'
```

Each preset overrides only the brand tokens (`--k-primary*`, `--k-ring`), so everything else — surfaces, semantic colors,
spacing — stays consistent. Copy one as a starting point for your own brand: it is just a handful of token declarations across
the light, system-dark, and explicit-dark scopes.

## Density, RTL & High Contrast

**Density.** The `--k-density` scalar multiplies control heights and padding. The default is `1`; lower it for compact
dashboards or raise it for touch:

```css
[k="dashboard"] {
  --k-density: 0.875; /* tighter controls in this subtree */
}
```

`Button` is the reference implementation; the same `calc(... * var(--k-density))` pattern applies to any control.

**RTL.** Components use CSS logical properties (`inset-inline`, `padding-inline`, `margin-inline-start`, …), so they mirror
automatically under `dir="rtl"` — no separate stylesheet.

**Forced colors.** Under Windows High Contrast (`forced-colors: active`), `box-shadow` focus rings are dropped, so the base
stylesheet restores a system-color `outline` on focus for interactive components. Keep custom focus styles outline-based (or
add a `forced-colors` fallback) so keyboard focus stays visible there.
