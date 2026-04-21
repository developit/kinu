# Context Menu

Right-click context menu powered by the native dialog element.

## Usage

```tsx
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from 'kinu';

<ContextMenu>
  <ContextMenuTrigger>Right click this area</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ContextMenuTrigger | Menu trigger | — |
| ContextMenu | Right-click menu | — |
| ContextMenuContent | Menu content | — |
| ContextMenuItem | Menu item | Alias of Item |

## Props

### ContextMenuProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the context menu dialog. If not provided, one will be auto-generated. |

### ContextMenuContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Override the auto-generated dialog ID. |
| mobile | `"drawer"` | — | When set to `"drawer"`, renders as a bottom-sheet drawer on mobile (≤640px)
while keeping context-menu behavior on larger screens. |

## Notes

- Installs the commands polyfill when rendered.
- Menu content is focus-trapped via `<dialog>`.
- Set `mobile="drawer"` on `ContextMenuContent` to render as a bottom-sheet on narrow viewports (≤640px).

---

_Source: `src/components/context-menu/index.tsx`
