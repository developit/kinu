# Status

Inline status indicator with a colored dot prefix, usable with or without a label.

## Usage

```tsx
import {Status} from 'kinu';

<Status tone="success">Online</Status>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Status | Status indicator | `<span k="status">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tone | `StatusTone` | — | — |
| pulse | `boolean` | — | Animate the dot with a pulsing "ping" ring. |

## Notes

- Dual-purpose: render with children for a dot + label, or without children for a bare dot. When used as a bare dot, supply `aria-label` so screen readers have something to announce.
- Tones mirror the semantic color tokens: `success`, `warning`, `info`, `destructive`. Omit the tone for a neutral muted dot.
- The dot and gap are sized in `em`, so everything scales with the surrounding font-size — drop a Status inside a heading or a small footer and it follows.
- Pass `pulse` to animate a "ping" ring for live/loading states. Honors `prefers-reduced-motion` via the base stylesheet.

---

_Source: `src/components/status/index.tsx`
