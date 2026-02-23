const n=`# Dropdown Menu

Command-driven dropdown built on top of \`<dialog>\`.

## Usage

\`\`\`tsx
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from 'pui';

<DropdownMenu>
  <DropdownMenuTrigger><Button>Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| DropdownMenu | Dropdown menu | \`<span p="dropdown">\` |
| DropdownMenuTrigger | Menu trigger | — |
| DropdownMenuContent | Menu content | \`<dialog p="dropdown-content">\` |
| DropdownMenuItem | Menu item | \`p="dropdown-menu-item"\` |

## Props

### DropdownMenuProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Optional ID for the dropdown content. If not provided, one will be auto-generated. |

### DropdownMenuContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Override the auto-generated dialog ID. |
| command | \`string\` | 'close' | Command dispatched when the dialog receives the command event. |
| commandFor | \`string\` | — | Target dialog identifier for the command dispatch. |
| to | \`"left"\` | — | Align the menu panel to the trigger's left or right edge. |

### DropdownMenuItemProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| href | \`string\` | — | When provided, renders the item as an anchor element. |
| selected | \`boolean\` | — | Marks the item as selected for styling. |
| shortcut | \`string\` | — | Optional shortcut hint rendered on the trailing edge. |
| destructive | \`boolean\` | — | Applies destructive styling to the item. |

## Notes

- Menu items render as \`<button>\` elements by default.
- Automatically closes when an item dispatches the close command.

---

_Source: \`src/components/dropdown-menu/index.tsx\`
`;export{n as default};
//# sourceMappingURL=dropdown-menu-CjkJXx7h.js.map
