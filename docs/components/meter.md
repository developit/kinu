# Meter

Native `<meter>` wrapper for measurement values (disk quota, password strength, rating summary).

## Usage

```tsx
import {Meter} from 'kinu';

<Meter value={0.7} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Meter | Measurement gauge | `<meter k="meter">` |

## Notes

- Forwards every native `<meter>` attribute.
- Fill color reflects the value range: primary when in the optimum band, warning in the suboptimum band, destructive outside.

---

_Source: `src/components/meter/index.tsx`
