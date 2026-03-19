import type {ComponentChildren} from 'preact';
import {
  Button,
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
    <nav class={`atelier-nav ${className ?? ''}`}>
      <div class="atelier-nav-inner">
        <div class="nav-left">
          {left}
          <a href="/" class="atelier-logo">Kinu</a>
        </div>
        <div class="atelier-links">
          <a href="/docs" class="atelier-link">Docs</a>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button type="button" class="atelier-link">Demos</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
        </div>
        <div class="nav-actions">
          <Button href="/getting-started">Get Started</Button>
          <ThemeCustomizer />
        </div>
      </div>
    </nav>
  );
}
