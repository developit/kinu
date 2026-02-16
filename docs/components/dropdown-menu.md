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

| Name | DOM element | Details |
| --- | --- | --- |
| DropdownMenu | `p="dropdown"` | Renders markup that includes `p="dropdown"`. |
| DropdownMenuTrigger | — | Custom component implemented in the source file. |
| DropdownMenuContent | `p="dropdown-content"` | Renders markup that includes `p="dropdown-content"`. |
| DropdownMenuItem | `p="dropdown-menu-item"` | Resolves the underlying element at runtime using `(props) => (props.href ? 'a' : 'button')`. |

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

## Notes

- Menu items render as `<button>` elements by default.
- Automatically closes when an item dispatches the close command.

---

_Source: `src/components/dropdown-menu/index.tsx`
