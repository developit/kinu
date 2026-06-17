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
| name | `string` | — | Radio-group name. Required so the rating is form-associated. |
| value | `number` | — | Initially selected rating (1 through `count`). |
| count | `number` | 5 | Number of stars. |
| readOnly | `boolean` | — | Render a non-interactive display of `value` (disables the inputs). |
| size | `RatingSize` | 'md' | Star size. |

## Notes

- Pure CSS: renders N `<input type="radio">` + `<label>` pairs inside a `<span k="rating">`. Keyboard-accessible and form-submittable for free.
- Set `name` (required) and an optional initial `value`; the chosen star submits with the form.
- Pass `readOnly` to show an average as a non-interactive display, `count` to change the number of stars, and `size` (`sm`/`md`/`lg`) to scale.

---

_Source: `src/components/rating/index.tsx`
