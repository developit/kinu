# Menubar

Horizontal command bar composed of styled buttons.

## Usage

```tsx
import {Menubar, MenubarItem} from 'pui';

<Menubar>
  <MenubarItem>File</MenubarItem>
</Menubar>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Menubar | `<nav>` | Wraps `<nav>` and sets `p="menubar"`. |
| MenubarItem | `<button>` | Wraps `<button>` and sets `p="menubar-item"`. Defaults props to `{
    onMouseEnterCapture(e) {
      const el = e.currentTarget
        .closest('[p="menubar"]')
        ?.querySelector<HTMLDialogElement>('[p="dropdown-content"][open]');
      if (el) e.currentTarget.click();
    },
  }`. |

## Attributes

Inherits all native attributes from `<nav>`. No additional styling attributes are required.

## Notes

- Pairs nicely with dropdowns for nested menus.

---

_Source: `src/components/menubar/index.tsx`
