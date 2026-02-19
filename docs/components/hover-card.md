# Hover Card

Delayed hover preview card with trigger/content primitives.

## Usage

```tsx
import {HoverCard, HoverCardContent, HoverCardTrigger} from 'pui';

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Details</HoverCardContent>
</HoverCard>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| HoverCard | Hover preview | `<div p="hover-card">` |
| HoverCardTrigger | Hover target | `<span p="hover-card-trigger">` |
| HoverCardContent | Preview content | `<div p="hover-card-content">` |

## Notes

- Uses CSS-only timers for opening and closing.
- Content positioning is handled via data attributes.

---

_Source: `src/components/hover-card/index.tsx`
