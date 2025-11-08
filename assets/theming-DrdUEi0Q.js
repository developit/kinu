const e=`# Theming & Tokens

PUI exposes all visual styling through CSS Custom Properties declared in the bundled \`pui/style.css\` (sourced from
\`src/variables.css\`). The defaults define both light and dark palettes, radii, spacing, and motion tokens. Because components
forward props as attributes, you override the design by setting CSS variables or adding new attribute selectors—no JavaScript
theme provider required.

## Changing Tokens

Override tokens at the root or within a scope. Tokens follow the \`--p-*\` naming convention:

\`\`\`css
:root {
  --p-radius: 0.625rem;
  --p-primary: 221 83% 53%;
  --p-primary-foreground: 0 0% 100%;
}

[data-theme='dark'] {
  --p-background: 224 71% 4%;
  --p-foreground: 210 40% 98%;
}
\`\`\`

Because values are stored as space-separated \`h s l\` triplets, components call \`hsl(var(--p-primary))\` to render consistent
colors. You can replace tokens with your own palette or plug in design system values.

## Component Variants via Attributes

Each component maps props to attributes, letting you target them with CSS selectors:

\`\`\`css
[p="button"][variant="brand"] {
  background-color: hsl(var(--brand));
  color: hsl(var(--brand-foreground));
}
\`\`\`

Keep selectors minimal—apply only the delta from the base style to preserve small bundle size. For boolean props, target the
presence of the attribute: \`[p="button"][loading] { opacity: 0.6; }\`.

## Dark Mode

PUI ships with \`data-theme="dark"\` tokens ready to go. Toggle the attribute on \`<html>\` or any container:

\`\`\`ts
document.documentElement.dataset.theme = 'dark';
\`\`\`

Because tokens cascade, you can theme individual subtrees simply by setting \`data-theme\` on a wrapping element.

## Animations & Motion

Animation curves live in \`--p-ease\` and related tokens. Adjust them globally or per component:

\`\`\`css
:root {
  --p-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
}

[p="accordion"][open] {
  transition-duration: 200ms;
}
\`\`\`

When you need reduced motion support, respect the \`prefers-reduced-motion\` media query and reduce durations or disable
animations in your overrides.
`;export{e as default};
//# sourceMappingURL=theming-DrdUEi0Q.js.map
