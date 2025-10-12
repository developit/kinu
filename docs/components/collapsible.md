# Collapsible

Disclosure container built on `<details>`. A hidden `<summary>` is injected so you control the trigger from outside.

## Import

```tsx
import {Collapsible} from 'pui';
```

## Usage

```tsx
<Button onClick={() => setOpen((prev) => !prev)}>Toggle details</Button>
<Collapsible open={open}>
  <p>Hidden content becomes visible when `open` is true.</p>
</Collapsible>
```

## Props

- Accepts `<details>` attributes. Control visibility by toggling the `open` attribute.

## Accessibility

Because the embedded `<summary>` is hidden, provide your own external control with proper labelling. Use `aria-controls` on the trigger to point to the collapsible `id` if needed.

## CSS hooks

- `[p="collapsible"]::details-content` — transition behaviour for the content region.
