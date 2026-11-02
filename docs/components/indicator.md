# Indicator

Corner overlay for notification counts or status dots.

## Usage

```tsx
import {Indicator} from 'kinu';

<Indicator>
  <Avatar alt="JM" />
  <Badge variant="destructive">3</Badge>
</Indicator>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Indicator | Component | `<span k="indicator">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| placement | `IndicatorPlacement` | 'top-end' | Which corner to place the overlay in. |
| dot | `boolean` | — | Show a small dot instead of a counted Badge child. |

## Notes

- Pure CSS: a `<span k="indicator">` that positions a `Badge` child (or a `[dot]`) at a corner of whatever it wraps — an Avatar, Button, icon, etc.
- Set `placement` (`top-end` default, `top-start`, `bottom-end`, `bottom-start`). Pass `dot` for a small status dot with no count.

---

_Source: `src/components/indicator/index.tsx`
