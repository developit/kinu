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

| Name | DOM element | Description |
| --- | --- | --- |
| Popover | `<span>` | Context wrapper that wires the trigger and popover content. |
| PopoverTrigger | — | Decorator that opens the popover when its child is activated. |
| PopoverContent | `<dialog>` | Dialog element that renders the popover surface. |
| PopoverClose | — | Decorator that closes the popover for its child control. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| PopoverContent | open | boolean | Reflects whether the element is expanded. |

## Notes

- Control placement with the placement attribute on PopoverContent.
- Stays declarative thanks to the commands polyfill.

---

<source-ref src="src/components/popover/index.tsx"></source-ref>
