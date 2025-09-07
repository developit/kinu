import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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
              <NavigationMenuLink href="#" onClick={(e) => e.preventDefault()}>
                Demos
              </NavigationMenuLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[
                {href: '/linear', label: 'Linear'},
                {href: '/chat', label: 'Chat'},
                {href: '/player', label: 'Music'},
                {href: '/dashboard', label: 'Dashboard'},
              ].map((demo) => (
                <DropdownMenuItem
                  onClick={() => (location.href = demo.href)}
                >
                  {demo.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
