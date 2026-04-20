# Status

Inline status indicator with a colored dot prefix.

## Usage

```tsx
import {Status} from 'kinu';

<Status tone="online">Online</Status>
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
- Tones: `online`, `away`, `offline`, `busy`. Omit the tone for a neutral muted dot.

---

_Source: `src/components/status/index.tsx`
