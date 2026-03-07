# Menubar

Horizontal command bar composed of styled buttons.

## Usage

```tsx
import {Menubar, MenubarItem} from 'kinu';

<Menubar>
  <MenubarItem>File</MenubarItem>
</Menubar>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Menubar | Horizontal menu | `<nav k="menubar">` |
| MenubarItem | Menu item | `<button k="menubar-item">` |

## Notes

- Pairs nicely with dropdowns for nested menus.

---

_Source: `src/components/menubar/index.tsx`
