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

| Name | DOM element | Description |
| --- | --- | --- |
| DropdownMenu | \`<span>\` | Context wrapper that wires triggers and menu content. |
| DropdownMenuTrigger | — | Decorator that opens the menu for its child control. |
| DropdownMenuContent | \`<dialog>\` | Dialog element that displays the dropdown menu. |
| DropdownMenuItem | \`<button>\` | Button-style command within the menu. |

## Attributes

Inherits all native attributes from \`<button>\`. No additional styling attributes are required.

## Notes

- Menu items render as \`<button>\` elements by default.
- Automatically closes when an item dispatches the close command.

---

<source-ref src="src/components/dropdown-menu/index.tsx"></source-ref>
`;export{n as default};
//# sourceMappingURL=dropdown-menu-_FoKzBmC.js.map
