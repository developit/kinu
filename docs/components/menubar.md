# Menubar

Horizontal navigation bar that pairs nicely with dropdown menus.

## Import

```tsx
import {Menubar, MenubarItem} from 'pui';
```

## Usage

```tsx
<Menubar aria-label="Main menu">
  <DropdownMenu>
    <DropdownMenuTrigger>
      <MenubarItem>File</MenubarItem>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>New</DropdownMenuItem>
      <DropdownMenuItem>Save</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</Menubar>
```

## Behaviour

When a dropdown is open, hovering another `MenubarItem` automatically clicks it so the menu switches without an extra click. Otherwise the component behaves like a simple flex container.

## Accessibility

Set `aria-label` on the `Menubar` and treat the dropdown menus as separate menu surfaces with their own semantics.

## CSS hooks

- `[p="menubar"]` — flex layout.
- `[p="menubar-item"]` — button reset with hover styles. Extend or override to match your theme.
