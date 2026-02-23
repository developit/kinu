# Dropdown Menu

Command-driven dropdown built on top of `<dialog>`.

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

| Name | Description | Rendered HTML |
| --- | --- | --- |
| DropdownMenu | Dropdown menu | `<span p="dropdown">` |
| DropdownMenuTrigger | Menu trigger | — |
| DropdownMenuContent | Menu content | `<dialog p="dropdown-content">` |
| DropdownMenuItem | Menu item | `p="dropdown-menu-item"` |

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
| commandfor | `string` | — | Target dialog identifier for the command dispatch. |

### DropdownMenuItemProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| href | `string` | — | When provided, renders the item as an anchor element. |
| selected | `boolean` | — | Marks the item as selected for styling. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| DropdownMenuContent | to | left | Forwarded attribute used by the component styling. |
| DropdownMenuContent | role | separator | Forwarded attribute used by the component styling. |
| DropdownMenuItem | shortcut | boolean | Forwarded attribute used by the component styling. |
| DropdownMenuItem | selected | boolean | Forwarded attribute used by the component styling. |
| DropdownMenuItem | destructive | boolean | Forwarded attribute used by the component styling. |

## Notes

- Menu items render as `<button>` elements by default.
- Automatically closes when an item dispatches the close command.

---

_Source: `src/components/dropdown-menu/index.tsx`
