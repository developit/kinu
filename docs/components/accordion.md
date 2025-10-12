# Accordion

Wrapper around the `<details>` element. Use multiple accordion instances with a shared `name` when you need mutually exclusive disclosure.

## Import

```tsx
import {Accordion} from 'pui';
```

## Usage

```tsx
<Accordion name="faq">
  <summary>What is PUI?</summary>
  <p>PUI forwards attributes directly to native elements.</p>
</Accordion>
```

## Props

- Accepts all `<details>` attributes (`open`, `name`, etc.). Use the `name` attribute to link accordion items so only one stays open.
- Children are rendered directly, so pass a `<summary>` as the first child followed by content nodes.

## Accessibility

The native `<details>` element handles keyboard interaction. Provide descriptive summary text and ensure the expanded content includes semantic headings when necessary.

## CSS hooks

- `[p="accordion"]` — container styles and open/closed chevron animation.
- `[p="accordion"][open]` — open state hook.
- `::details-content` transitions are defined in `src/components/accordion/style.css`.
