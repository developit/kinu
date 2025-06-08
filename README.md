# Performance-Focused Preact UI Toolkit

A minimal, constraint-driven UI toolkit that enhances HTML instead of replacing it.

## Project Structure

```
src/                 # UI toolkit source
├── lib/            # Factory function
├── components/     # All components
├── variables.css   # Design tokens
├── base.css        # Reset styles
└── index.ts        # Main exports

demo/               # Demo application
├── src/           # Demo source
└── vite.config.ts # Demo build config
```

## Key Features

- **Tiny Bundle**: ~1.2KB JS + 4KB CSS for all components
- **Zero Runtime Overhead**: Pure prop forwarding, no abstractions
- **Platform-Native**: Uses HTML5 `<dialog>`, form validation, CSS custom properties
- **Tree-Shakeable**: Import only what you use
- **Type-Safe**: Full TypeScript support
- **Pattern-Driven**: 80% of components use a simple factory function

## Architecture
See [Architecture Overview](docs/architecture.md) for the full technical breakdown.

### Simple Components (Factory Pattern)
```tsx
export const Button = createSimpleComponent('button', 'button');
// <Button variant="outline" size="lg" loading />
// Renders: <button p="button" variant="outline" size="lg" loading />
```

### CSS-Driven Logic
```css
[p="button"] {
  /* Base styles + default variant */
}

[p="button"][variant="outline"] {
  /* Override delta only */
}
```

### Platform Wrappers (Custom Components)
```tsx
// Uses native <dialog> with minimal enhancements
<Dialog>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>Modal content</Dialog.Content>
</Dialog>
```

```tsx
// Simple accordion built on <details>
<Accordion open>
  <summary>Title</summary>
  <p>More info</p>
</Accordion>
```

```tsx
// Basic tabs composed from lightweight wrappers
<TabList>
  <Tab aria-selected="true">First</Tab>
  <Tab>Second</Tab>
</TabList>
<TabPanel>Panel content</TabPanel>
```

## Components

- **Badge**: Inline status indicators
- **Button**: All variants, sizes, states
- **Input**: Form fields with validation
- **Card**: Layout containers
- **Dialog**: Native modal dialogs
- **Accordion**: Native `<details>` wrapper
- **Tabs**: TabList, Tab, TabPanel wrappers

## Quick Start

```bash
# Run the demo app
cd demo
npm install
npm run dev
```

The demo is automatically deployed to **GitHub Pages** on every push to `main`.

## Philosophy

**Constraints drive creativity.** This toolkit:
- Enhances HTML instead of abstracting it
- Uses CSS for logic instead of JavaScript
- Prioritizes user experience over developer convenience
- Trusts web platform capabilities
- Eliminates entire categories of problems through good defaults

Built with the performance-first, minimalist approach of Jason Miller's work on Preact.
