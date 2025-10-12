# Navigation Menu

Horizontal navigation list for site headers.

## Import

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from 'pui';
```

## Usage

```tsx
<NavigationMenu aria-label="Primary">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/">Home</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Accessibility

Set `aria-label` on the `NavigationMenu` or nest it inside a `<header>`. Mark the current page link with `aria-current="page"` when appropriate.

## CSS hooks

- `[p="navigation-menu-list"]` — flex layout.
- `[p="navigation-menu-link"]` — link styling and hover states.
