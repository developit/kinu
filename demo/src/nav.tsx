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
  Button,
} from 'pui';

export function Nav({
  class: className,
  left,
}: {class?: string; left?: ComponentChildren}) {
  return (
    <NavigationMenu class={className ?? 'home-nav'}>
      {left}
      <input
        id="pui-theme-default"
        class="theme-input"
        type="radio"
        name="pui-theme"
        defaultChecked
      />
      <input
        id="pui-theme-glass"
        class="theme-input"
        type="radio"
        name="pui-theme"
      />
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
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="icon"
                class="theme-trigger"
                aria-label="Theme options"
              >
                <svg
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M12 3.5c-5.3 0-9.5 3.8-9.5 8.6 0 4.1 3.1 7.4 7.5 8.2 1.2.2 2.4-.3 3.1-1.3l.7-1c.4-.6 1.1-.9 1.8-.9h1.2c3 0 5.4-2.1 5.4-4.7C22.2 7.3 17.5 3.5 12 3.5Zm-4.1 8.6a1.4 1.4 0 1 1 2.8 0 1.4 1.4 0 0 1-2.8 0Zm3-4.3a1.4 1.4 0 1 1 2.8 0 1.4 1.4 0 0 1-2.8 0Zm3.6 5.9a1.4 1.4 0 1 1 2.8 0 1.4 1.4 0 0 1-2.8 0Zm.7-4.8a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="theme-menu" to="left">
              <label
                class="theme-menu-item"
                data-theme="default"
                htmlFor="pui-theme-default"
              >
                Default
                <span class="theme-menu-indicator" aria-hidden="true" />
              </label>
              <label
                class="theme-menu-item"
                data-theme="glass"
                htmlFor="pui-theme-glass"
              >
                Glass
                <span class="theme-menu-indicator" aria-hidden="true" />
              </label>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
