# PUI Overview

PUI is a constraint-driven component toolkit built on top of Preact. Every component forwards attributes directly to native HTML elements so you can compose features without paying extra runtime cost. Styles are controlled through attribute selectors and CSS custom properties.

## Installation

```bash
pnpm add pui
```

After installing the package, import the shared styles once in your application entry point:

```tsx
import 'pui/base.css';
```

## Design principles

- **Prototype → tighten constraints → lock boundaries** — start simple, then codify the rules that shake out of real usage.
- **Technical excellence before DX** — APIs expose the minimum needed surface so users write dramatically less code.
- **Simple case first** — components default to the native element behaviour; opt into complexity with explicit attributes.

## Working with components

1. Import the component (and any subcomponents) from `pui`.
2. Pass native attributes directly. PUI forwards them to the underlying element.
3. Use attributes such as `variant`, `size`, or `tone` to opt into the provided style hooks.
4. Override the design tokens in `:root` if you need custom theming.

```tsx
import {Button, Card} from 'pui';

export function Example() {
  return (
    <Card>
      <h2>Quick start</h2>
      <p>This card uses native HTML semantics with PUI styles.</p>
      <Button variant="secondary">Click me</Button>
    </Card>
  );
}
```

## Theming and tokens

Design tokens live in `src/variables.css`. Override them at runtime using CSS custom properties:

```css
:root {
  --p-primary: 220 100% 60%;
  --p-radius: 0.75rem;
}
```

Set dark mode tokens on `[data-theme="dark"]` or any other selector you control.

## Accessibility

Components lean on native HTML semantics. Always provide the same attributes you would on plain HTML elements: `aria-*` for labelling, `role` for semantic hints, and `id`/`for` pairs for form controls. Composite components (dialogs, popovers, menus) wire required attributes automatically, but you remain in control of labelling copy.

## Where to go next

Browse each component below for specific props, CSS hooks, and live examples. Every section pairs the Markdown reference with an interactive demo so you can see how the API behaves before you ship it.
