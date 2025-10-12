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

| Name | DOM element | Details |
| --- | --- | --- |
| HoverCard | <div> | Wraps <div> and sets p="hover-card". |
| HoverCardTrigger | <span> | Wraps <span> and sets p="hover-card-trigger". |
| HoverCardContent | <div> | Wraps <div> and sets p="hover-card-content". |

## Attributes

Inherits all native attributes from <div>. No additional styling attributes are required.

## Notes

- Uses CSS-only timers for opening and closing.
- Content positioning is handled via data attributes.

---

_Source: `src/components/hover-card/index.tsx`
