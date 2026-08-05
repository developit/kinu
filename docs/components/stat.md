# Stat

Metric block with a label, large value, and a trend-colored delta.

## Usage

```tsx
import {Stat} from 'kinu';

<Stat>
  <Stat.Label>Revenue</Stat.Label>
  <Stat.Value>$48,200</Stat.Value>
  <Stat.Delta trend="up">+12.5%</Stat.Delta>
</Stat>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Stat | Component | — |
| Stat.Label | Component | `<div k="stat-label">` |
| Stat.Value | Component | `<div k="stat-value">` |
| Stat.Delta | Component | `<span k="stat-delta">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| trend | `StatTrend` | — | Trend direction — colors the delta (up = success, down = destructive). |

## Notes

- Pure CSS presentation. Compound parts: `Stat.Label`, `Stat.Value`, `Stat.Delta`.
- `Stat.Delta` takes `trend` (`up` / `down` / `flat`) which colors it via the semantic success/destructive tokens.
- Drops naturally into a `Grid` for dashboard stat rows.

---

_Source: `src/components/stat/index.tsx`
