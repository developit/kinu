# Popover

Lightweight popover using native dialog with trigger/content primitives.

## Usage

```tsx
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from 'kinu';

<Popover>
  <PopoverTrigger><Button>Open</Button></PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
  <PopoverClose><Button>Close</Button></PopoverClose>
</Popover>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Popover | Floating content | — |
| PopoverTrigger | Popover trigger | — |
| PopoverContent | Popover content | — |
| PopoverClose | Component | — |

## Props

### PopoverProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the popover content. If not provided, one will be auto-generated. |

### PopoverContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Override the auto-generated dialog ID. |
| mobile | `"drawer"` | — | When set to `"drawer"`, renders as a bottom-sheet drawer on mobile (≤640px)
while keeping popover behavior on larger screens. |

## Notes

- Control placement with the placement attribute on PopoverContent.
- Set `mobile="drawer"` on PopoverContent to render as a bottom-sheet drawer on small screens (≤640px). It takes `--k-drawer-height` for a detent, same as Drawer.
- Stays declarative thanks to the commands polyfill.

---

_Source: `src/components/popover/index.tsx`
