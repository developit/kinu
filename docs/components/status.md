# Status

Inline status indicator with a colored dot prefix.

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

## Notes

- Wraps a `<span>` and renders the dot via `::before` so any inline layout works.
- Tones mirror the semantic color tokens: `success`, `warning`, `info`, `destructive`. Omit the tone for a neutral muted dot.

---

_Source: `src/components/status/index.tsx`
