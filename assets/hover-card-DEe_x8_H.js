const e=`# Hover Card

Delayed hover preview card with trigger/content primitives.

## Usage

\`\`\`tsx
import {HoverCard, HoverCardContent, HoverCardTrigger} from 'pui';

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Details</HoverCardContent>
</HoverCard>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| HoverCard | \`<div>\` | Wrapper that manages hover timing for the preview. |
| HoverCardTrigger | \`<span>\` | Inline element that reveals the hover card. |
| HoverCardContent | \`<div>\` | Panel that displays the hover card details. |

## Attributes

Inherits all native attributes from \`<div>\`. No additional styling attributes are required.

## Notes

- Uses CSS-only timers for opening and closing.
- Content positioning is handled via data attributes.

---

<source-ref src="src/components/hover-card/index.tsx"></source-ref>
`;export{e as default};
//# sourceMappingURL=hover-card-DEe_x8_H.js.map
