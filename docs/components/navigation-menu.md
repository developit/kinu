# Navigation Menu

Composable navigation with list, item, and link helpers.

## Usage

```tsx
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from 'kinu';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| NavigationMenu | Menu container | `<nav k="navigation-menu">` |
| NavigationMenuList | Menu list | `<ul k="navigation-menu-list">` |
| NavigationMenuItem | Menu item | `<li k="navigation-menu-item">` |
| NavigationMenuLink | Menu link | `<a k="navigation-menu-link">` |

## Notes

- Zero runtime state; rely on CSS for active styling.
- Ideal for top-level navigation bars.

---

_Source: `src/components/navigation-menu/index.tsx`
