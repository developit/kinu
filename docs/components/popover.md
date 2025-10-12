# Popover

Lightweight popover using native dialog with trigger/content primitives.

## Usage

```tsx
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from 'pui';

<Popover>
  <PopoverTrigger><Button>Open</Button></PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Popover | p="popover" | Renders markup that includes p="popover". |
| PopoverTrigger | — | Custom component implemented in the source file. |
| PopoverContent | p="popover-content" | Renders markup that includes p="popover-content". |
| PopoverClose | — | Custom component implemented in the source file. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| PopoverContent | open | boolean | Reflects whether the element is expanded. |

## Notes

- Control placement with the placement attribute on PopoverContent.
- Stays declarative thanks to the commands polyfill.

---

_Source: `src/components/popover/index.tsx`
