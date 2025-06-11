# UI Toolkit Demo

Minimal demo app demonstrating the performance-focused Preact UI toolkit.

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## What This Demonstrates

- **Badge**: All variants (default, secondary, destructive, outline)
- **Button**: All variants and sizes, loading/disabled states
- **Input**: Controlled inputs, different sizes, validation states
- **Card**: Layout container with flexible padding
- **Dialog**: Native `<dialog>` element with compound API
- **Accordion**: Collapsible content styled like shadcn/ui with slide animation
- **Tabs**: TabList, Tab and TabPanel wrappers

## Architecture Highlights

- **Bundle size**: ~1.2KB JS + 4KB CSS for all components
- **Performance**: Zero runtime overhead, direct prop forwarding
- **Platform-native**: Uses HTML5 `<dialog>`, form validation, etc.
- **Tree-shakeable**: Import only what you use

## Usage

```tsx
import {
  Button,
  Card,
  Dialog,
  Input,
  Badge,
  Accordion,
  TabList,
  Tab,
  TabPanel,
} from '../src';

// Pure prop forwarding - no abstractions
<Input type="email" required value={email} onInput={handleInput} />

// CSS-driven variants and sizes
<Button variant="outline" size="lg">Click Me</Button>

// Platform-native dialog
<Dialog>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>Modal content</Dialog.Content>
</Dialog>
```
