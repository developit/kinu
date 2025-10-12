# Dropdown Menu

Command-based dropdown built on `<dialog>`. Shares styling primitives with popovers.

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'pui';
```

## Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Actions ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Behaviour

Triggers inject `command="show"`/`commandfor` so the dropdown opens using the browser’s command API. Items are simple `<button>` elements; supply `type="button"` or `href` if you prefer links.

## Accessibility

Provide context with `aria-label` or an adjacent heading. You can set `role="menu"`/`role="menuitem"` on the content and items if you need menu semantics.

## CSS hooks

- `[p="dropdown"]` — anchor wrapper.
- `[p="dropdown-content"]` — floating surface (inherits from popover styles).
- `[p="dropdown-menu-item"]` — individual option styling (hover/focus states defined in CSS).
