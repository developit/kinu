# Chip

Clickable pill label with an optional inline action affordance (typically for remove).

## Usage

```tsx
import {Chip} from 'kinu';

<Chip onClick={toggle}>
  React
  <Chip.Button onClick={onRemove}>×</Chip.Button>
</Chip>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Chip | Chip container | `<button k="chip">` |
| ChipButton | Inline action affordance | `<span k="chip-button" role="button">` |
| Chip.Button | Alias of ChipButton | — |

## Props

### ChipProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ChipVariant` | — | Visual style variant. |
| selected | `boolean` | — | Marks the chip as selected for styling. |

All standard `<button>` props are forwarded.

### ChipButtonProps

All standard `<span>` props are forwarded. `onClick` works via event bubbling.

## Variants

| Variant | Description |
| --- | --- |
| (default) | Secondary muted background. |
| primary | Primary background with primary foreground text. |
| destructive | Destructive red background. |
| outline | Transparent background with border. |

## Notes

- Chip renders as a real `<button>`, so it gets native keyboard activation (Enter/Space), focus ring, and accessible button role for free.
- Chip.Button renders as a `<span>` so it can be nested inside Chip's `<button>` without breaking HTML validity (nested `<button>` elements would be reparented by the HTML parser).
- Chip.Button's click events bubble to Chip, but the component installs a default `onClickCapture` that calls `stopPropagation()`, so clicking the button fires only its own `onClick` — not the Chip's.
- Chip.Button is not independently focusable by default. If you need keyboard access to a remove action, add `tabIndex={0}` and a `keydown` handler yourself, or handle Backspace on the Chip itself.
- Chip.Button uses `aria-hidden="true"` so screen readers read only the Chip's button text, not the `×` glyph.

---

_Source: `src/components/chip/index.tsx`
