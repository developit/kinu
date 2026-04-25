# Dropdown Menu

Command-driven dropdown built on top of `<dialog>`.

## Usage

```tsx
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from 'kinu';

<DropdownMenu>
  <DropdownMenuTrigger><Button>Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| DropdownMenu | Dropdown menu | — |
| DropdownMenuTrigger | Menu trigger | — |
| DropdownMenuContent | Menu content | — |
| DropdownMenuItem | Menu item | Alias of Item |

## Props

### DropdownMenuProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the dropdown content. If not provided, one will be auto-generated. |

### DropdownMenuContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Override the auto-generated dialog ID. |
| command | `string` | 'close' | Command dispatched when the dialog receives the command event. |
| commandFor | `string` | — | Target dialog identifier for the command dispatch. |
| to | `"left"` | — | Align the menu panel to the trigger's left or right edge. |
| mobile | `"drawer"` | — | When set to `"drawer"`, renders as a bottom-sheet drawer on mobile (≤640px)
while keeping menu behavior on larger screens. |

## Notes

- Menu items render as `<button>` elements by default.
- Automatically closes when an item dispatches the close command.
- Set `mobile="drawer"` on `DropdownMenuContent` to adapt to a bottom-sheet on narrow viewports (≤640px).

---

_Source: `src/components/dropdown-menu/index.tsx`
