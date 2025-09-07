import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from 'pui';

export function Nav() {
  return (
    <NavigationMenu class="home-nav">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/getting-started">
            Getting Started
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/components">Components</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button p="navigation-menu-link" type="button">
                Demos
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <a p="dropdown-menu-item" href="/linear">
                Linear
              </a>
              <a p="dropdown-menu-item" href="/chat">
                Chat
              </a>
              <a p="dropdown-menu-item" href="/player">
                Music
              </a>
              <a p="dropdown-menu-item" href="/dashboard">
                Dashboard
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
