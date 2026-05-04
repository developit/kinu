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
import {ThemePicker} from './theme-picker.tsx';
import {KinuLogo} from './logo';
import {DensityPicker} from './density-picker.tsx';

export function Nav({
  class: className,
  left,
  brand = true,
}: {
  class?: string;
  left?: ComponentChildren;
  brand?: boolean;
}) {
  return (
    <NavigationMenu class={className ?? 'home-nav'}>
      {left}
      {brand && (
        <a class="home-nav-brand" href="/" aria-label="Kinu home">
          <KinuLogo size={20} />
        </a>
      )}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/getting-started">
            Get&nbsp;Started
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
      <div class="nav-actions">
        <DensityPicker />
        <ThemePicker />
      </div>
    </NavigationMenu>
  );
}
