# Context Menu

Custom right-click menu powered by `<dialog>`.

## Import

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from 'pui';
```

## Usage

```tsx
<ContextMenu>
  <ContextMenuTrigger>
    <div style={{padding: '1rem', border: '1px dashed'}}>Right-click me</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onClick={() => copy()}>Copy</ContextMenuItem>
    <ContextMenuItem onClick={() => paste()}>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Behaviour

The trigger intercepts the native `contextmenu` event, positions the dialog using CSS anchor positioning, and opens it. Clicking any menu item closes the dialog automatically.

## Accessibility

Consider providing alternate activation (e.g. a visible button) for keyboard users. You can expose the menu items as regular buttons so they remain focusable.

## CSS hooks

- `[p="context-menu"]` — floating panel anchored at the click position.
- `[p="context-menu-item"]` — inherits dropdown menu item styling.
