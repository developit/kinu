import type {ComponentChildren} from 'preact';
import {Button} from 'kinu';
import {ThemeCustomizer} from './theme-customizer.tsx';

export function Nav({
  class: className,
  left,
}: {class?: string; left?: ComponentChildren}) {
  return (
    <nav class={`atelier-nav ${className ?? ''}`}>
      <div class="atelier-nav-inner">
        {left}
        <a href="/" class="atelier-logo">Kinu</a>
        <div class="atelier-links">
          <a href="/docs" class="atelier-link">Docs</a>
          <a href="/linear" class="atelier-link">Demos</a>
        </div>
        <div class="nav-actions">
          <Button href="/getting-started">Get Started</Button>
          <ThemeCustomizer />
        </div>
      </div>
    </nav>
  );
}
