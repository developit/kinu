import type {ComponentChildren} from 'preact';
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

export function Nav({
  class: className,
  left,
}: {class?: string; left?: ComponentChildren}) {
  return (
    <NavigationMenu class={className ?? 'home-nav'}>
      {left}
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
          <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <NavigationMenuLink href="#">Demos</NavigationMenuLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent to="left">
              <DropdownMenuItem as="a" href="/linear">
                Linear Demo
              </DropdownMenuItem>
              <DropdownMenuItem as="a" href="/chat">
                Chat Demo
              </DropdownMenuItem>
              <DropdownMenuItem as="a" href="/player">
                Music Demo
              </DropdownMenuItem>
              <DropdownMenuItem as="a" href="/dashboard">
                Dashboard Demo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
