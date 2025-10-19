# Context Menu

Right-click context menu powered by the native dialog element.

## Usage

```tsx
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from 'pui';

<ContextMenu>
  <ContextMenuTrigger>Open</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| ContextMenuTrigger | — | Custom component implemented in the source file. |
| ContextMenu | — | Custom component implemented in the source file. |
| ContextMenuContent | p="context-menu" | Renders markup that includes p="context-menu". |
| ContextMenuItem | `<button>` | Wraps `<button>` and sets p="context-menu-item". Defaults props to {tabIndex: 0}. |

## Attributes

Inherits all native attributes from `<button>`. No additional styling attributes are required.

## Notes

- Installs the commands polyfill when rendered.
- Menu content is focus-trapped via `<dialog>`.

---

_Source: `src/components/context-menu/index.tsx`
