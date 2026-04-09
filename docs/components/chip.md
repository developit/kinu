# Chip

Badge-like label with an optional inline action button.

## Usage

```tsx
import {Chip, ChipButton} from 'kinu';

<Chip>
  React
  <Chip.Button onClick={onRemove}>×</Chip.Button>
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
| selected | `boolean` | — | Marks the chip as selected for styling. |

### ChipButtonProps

All standard `<button>` props are forwarded.

## Variants

| Variant | Description |
| --- | --- |
| (default) | Secondary muted background. |
| primary | Primary background with primary foreground text. |
| destructive | Destructive red background. |
| outline | Transparent background with border. |

## Notes

- Chip.Button fires standard click events. No custom events.
- Chip.Button automatically spans the full height and hugs the rounded edge.
- Place Chip.Button as the first or last child — border radius adjusts automatically.
- Use `selected` to mark a chip as active (consistent with menu items).
- Zero JS logic. Pure CSS component.

---

_Source: `src/components/chip/index.tsx`
