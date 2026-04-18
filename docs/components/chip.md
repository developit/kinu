# Chip

Badge-like label with an optional inline action button.

## Usage

```tsx
import {Chip, ChipButton} from 'kinu';

<Chip>Tag<Chip.Button onClick={remove}>×</Chip.Button></Chip>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ChipButton | Component | `<span k="chip-button">` |
| Chip | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ChipVariant` | — | Visual variant for the chip. |
| selected | `boolean` | — | Marks the chip as selected for styling. |

### Static Shortcuts

- `Chip.Button = ChipButton`

## Notes

- Chip.Button fires standard click events with no custom event wiring.
- Use the selected attribute to mark a chip as active.
- Chip.Button automatically spans the full height and hugs the rounded edge.

---

_Source: `src/components/chip/index.tsx`
