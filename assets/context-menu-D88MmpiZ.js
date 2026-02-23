const n=`# Context Menu

Right-click context menu powered by the native dialog element.

## Usage

\`\`\`tsx
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from 'pui';

<ContextMenu>
  <ContextMenuTrigger>Right click this area</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ContextMenuTrigger | Menu trigger | — |
| ContextMenu | Right-click menu | — |
| ContextMenuContent | Menu content | \`<dialog p="context-menu">\` |
| ContextMenuItem | Menu item | \`<button p="context-menu-item">\` |

## Props

### ContextMenuProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Optional ID for the context menu dialog. If not provided, one will be auto-generated. |

### ContextMenuContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Override the auto-generated dialog ID. |

### ContextMenuItemProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| selected | \`boolean\` | — | Marks the item as selected for styling. |
| shortcut | \`string\` | — | Optional shortcut hint rendered on the trailing edge. |
| destructive | \`boolean\` | — | Applies destructive styling to the item. |

## Notes

- Installs the commands polyfill when rendered.
- Menu content is focus-trapped via \`<dialog>\`.

---

_Source: \`src/components/context-menu/index.tsx\`
`;export{n as default};
//# sourceMappingURL=context-menu-D88MmpiZ.js.map
