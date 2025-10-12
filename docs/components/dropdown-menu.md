# Dropdown Menu

Command-driven dropdown built on top of <dialog>.

## Usage

```tsx
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from 'pui';

<DropdownMenu>
  <DropdownMenuTrigger><Button>Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| DropdownMenu | p="dropdown" | Renders markup that includes p="dropdown". |
| DropdownMenuTrigger | — | Custom component implemented in the source file. |
| DropdownMenuContent | p="dropdown-content" | Renders markup that includes p="dropdown-content". |
| DropdownMenuItem | <button> | Wraps <button> and sets p="dropdown-menu-item". |

## Attributes

Inherits all native attributes from <button>. No additional styling attributes are required.

## Notes

- Menu items render as <button> elements by default.
- Automatically closes when an item dispatches the close command.

---

_Source: `src/components/dropdown-menu/index.tsx`
