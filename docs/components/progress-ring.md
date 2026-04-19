# Progress Ring

Circular progress indicator rendered entirely in CSS via conic-gradient and a radial mask.

## Usage

```tsx
import {ProgressRing} from 'kinu';

<ProgressRing value={60} max={100} />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ProgressRing | Component | `<div k="progress-ring">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | — | Current progress value. Omit (or pass `undefined`) to render as indeterminate. |
| max | `number` | — | Maximum progress value. Defaults to 100. |
| size | `"sm" | "lg"` | — | Preset size. |

## Notes

- Pure CSS: uses typed `attr()` to read `value`/`max` directly from the DOM (Chrome 133+, Safari 18.4+, Firefox 140+).
- Omit `value` (or pass `undefined`) to render an indeterminate spinning ring, matching native `<progress>` semantics.
- Override `--k-progress-ring-size` and `--k-progress-ring-thickness` to customise dimensions.

---

_Source: `src/components/progress-ring/index.tsx`
