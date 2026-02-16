# Navigation Menu

Composable navigation with list, item, and link helpers.

## Usage

```tsx
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from 'pui';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| NavigationMenu | `<nav>` | Wraps `<nav>` and sets `p="navigation-menu"`. |
| NavigationMenuList | `<ul>` | Wraps `<ul>` and sets `p="navigation-menu-list"`. |
| NavigationMenuItem | `<li>` | Wraps `<li>` and sets `p="navigation-menu-item"`. |
| NavigationMenuLink | `<a>` | Wraps `<a>` and sets `p="navigation-menu-link"`. |

## Attributes

Inherits all native attributes from `<nav>`. No additional styling attributes are required.

## Notes

- Zero runtime state; rely on CSS for active styling.
- Ideal for top-level navigation bars.

---

_Source: `src/components/navigation-menu/index.tsx`
