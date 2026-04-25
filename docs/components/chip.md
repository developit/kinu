# Chip

Badge-like label with an optional inline action button.

## Usage

```tsx
import {Chip} from 'kinu';

<Chip>Tag<Chip.Button onClick={remove}>×</Chip.Button></Chip>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Chip | Component | — |
| Chip.Button | Component | `<span k="chip-button">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ChipVariant` | — | Visual variant for the chip. |
| selected | `boolean` | — | Marks the chip as selected for styling. |

## Notes

- Chip.Button fires standard click events with no custom event wiring.
- Use the selected attribute to mark a chip as active.
- Chip.Button automatically spans the full height and hugs the rounded edge.

---

_Source: `src/components/chip/index.tsx`
