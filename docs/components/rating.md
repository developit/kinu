# Rating

Star rating built from a native radio group — form-associated, zero JavaScript.

## Usage

```tsx
import {Rating} from 'kinu';

<Rating name="score" value={3} />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Rating | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `string` | — | Form field name. The rating submits its value under this name. |
| value | `number` | — | Initial rating (0 through `count`). |
| count | `number` | 5 | Number of stars. |
| readOnly | `boolean` | — | Render a non-interactive display of `value`. |
| size | `RatingSize` | 'md' | Star size. |

## Notes

- Zero JavaScript: a styled native `<input type="range">`. The fill follows the live value entirely in CSS — a thumb `box-shadow` paints the filled stars on WebKit and `::-moz-range-progress` on Firefox, masked into a star row; the star count reads from `max` via typed `attr()`.
- Keyboard-accessible and form-submittable natively: set `name` and an initial `value`, arrow keys adjust, and the value submits with the form.
- Pass `count` to change the number of stars (Baseline-2025 typed `attr()`; older engines fall back to 5), `readOnly` for a non-interactive display, and `size` (`sm`/`md`/`lg`) to scale.

---

_Source: `src/components/rating/index.tsx`
