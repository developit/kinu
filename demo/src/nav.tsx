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
} from 'kinu';
import {ThemeCustomizer} from './theme-customizer.tsx';

export function Nav({
  class: className,
  left,
}: {class?: string; left?: ComponentChildren}) {
  return (
    <NavigationMenu class={className ?? 'home-nav'}>
      {left}
      <a href="/" class="nav-logo">
        KINU
      </a>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">Components</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/getting-started">
            Getting Started
          </NavigationMenuLink>
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
      <div class="nav-actions">
        <ThemeCustomizer />
        <a href="/getting-started" class="nav-cta">
          Get Started
        </a>
      </div>
    </NavigationMenu>
  );
}
