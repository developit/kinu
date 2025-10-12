# Separator

Horizontal rule used to divide content blocks.

## Import

```tsx
import {Separator} from 'pui';
```

## Usage

```tsx
<section>
  <h3>Billing</h3>
  <Separator />
  <p>Account details go here.</p>
</section>
```

## Props

- Renders a `<div>`; add `role="separator"` if you need explicit semantics.
- Adjust thickness or margins via inline styles or utility classes.

## CSS hooks

- `[p="separator"]` — base style. Override `height` and `background-color` for alternative presentations.
