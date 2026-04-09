# Chip

Badge-like label with an optional inline action button.

## Usage

```tsx
import {Chip, ChipButton} from 'kinu';

<Chip>
  React
  <Chip.Button onClick={onRemove}>x</Chip.Button>
</Chip>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Chip | Chip container | `<span k="chip">` |
| ChipButton | Inline action button | `<button k="chip-button">` |
| Chip.Button | Alias of ChipButton | — |

## Props

### ChipProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ChipVariant` | 'default' | Visual style variant. |

### ChipButtonProps

All standard `<button>` props are forwarded.

## Variants

| Variant | Description |
| --- | --- |
| (default) | Primary background with primary foreground text. |
| secondary | Secondary muted background. |
| destructive | Destructive red background. |
| outline | Transparent background with border. |

## Notes

- Chip.Button fires standard click events. No custom events.
- Zero JS logic. Pure CSS component.
- Use for tag inputs, filter chips, or removable selections.

---

_Source: `src/components/chip/index.tsx`
