const n=`# Context Menu

Right-click context menu powered by the native dialog element.

## Usage

\`\`\`tsx
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from 'pui';

<ContextMenu>
  <ContextMenuTrigger>Open</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| ContextMenuTrigger | — | Decorator that equips its child with right-click menu behavior. |
| ContextMenu | — | Context provider that coordinates trigger and content. |
| ContextMenuContent | \`<dialog>\` | Dialog that renders the contextual menu surface. |
| ContextMenuItem | \`<button>\` | Button-style command inside the context menu. |

## Attributes

Inherits all native attributes from \`<button>\`. No additional styling attributes are required.

## Notes

- Installs the commands polyfill when rendered.
- Menu content is focus-trapped via \`<dialog>\`.

---

<source-ref src="src/components/context-menu/index.tsx"></source-ref>
`;export{n as default};
//# sourceMappingURL=context-menu-Atm3ctr2.js.map
