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
              <NavigationMenuLink href="#">Demos</NavigationMenuLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem href="/linear">Linear</DropdownMenuItem>
              <DropdownMenuItem href="/chat">Chat</DropdownMenuItem>
              <DropdownMenuItem href="/player">Music</DropdownMenuItem>
              <DropdownMenuItem href="/dashboard">Dashboard</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
