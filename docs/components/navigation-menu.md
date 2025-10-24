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

| Name | DOM element | Description |
| --- | --- | --- |
| NavigationMenu | `<nav>` | Navigation landmark for grouped menu links. |
| NavigationMenuList | `<ul>` | Unordered list that arranges navigation items. |
| NavigationMenuItem | `<li>` | List item wrapper for each navigation link. |
| NavigationMenuLink | `<a>` | Anchor styled for the navigation menu. |

## Attributes

Inherits all native attributes from `<nav>`. No additional styling attributes are required.

## Notes

- Zero runtime state; rely on CSS for active styling.
- Ideal for top-level navigation bars.

---

<source-ref src="src/components/navigation-menu/index.tsx"></source-ref>
