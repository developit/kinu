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

kinu ships with `data-theme="dark"` tokens ready to go. Toggle the attribute on `<html>` or any container:

```ts
document.documentElement.dataset.theme = 'dark';
```

Because tokens cascade, you can theme individual subtrees simply by setting `data-theme` on a wrapping element.

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

## Control Scaling

The `--k-scale` token is a unitless multiplier for interactive control dimensions (buttons, inputs, selects, switches,
checkboxes, etc.). The default is `1`. Components reference derived size tokens `--k-size-sm`, `--k-size-md`, and
`--k-size-lg` which incorporate the scale:

```css
:root {
  --k-scale: 0.9;  /* compact controls, normal text */
}
```

Because `--k-scale` is a CSS custom property, you can scope it to any container:

```css
.compact-sidebar { --k-scale: 0.85; }
.spacious-hero   { --k-scale: 1.1; }
```

This is independent of `font-size`—text stays at whatever size you set, while control dimensions scale separately. You
can also override the derived tokens directly if you need full control:

```css
:root {
  --k-size-sm: 2rem;
  --k-size-md: 2.25rem;
  --k-size-lg: 2.5rem;
}
```
