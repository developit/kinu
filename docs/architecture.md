# Performance-Focused Preact UI Toolkit

## Project Vision

A pattern-driven toolkit that enhances standard HTML elements. Built using a constraint-driven approach inspired by Jason Miller, the library focuses on user experience and aggressive minimalism.

## Core Principles

1. Prototype to discover possibilities, then tighten constraints
2. Technical excellence before DX conveniences
3. Treat annoyance in code as a signal for improvement
4. High signal-to-noise APIs so developers write much less code
5. Handle the simple case first, then provide fallbacks for complexity

## Technical Architecture

### Simple Components

Most components are generated via a small factory that forwards props directly to the DOM. This keeps runtime cost near zero:
Example definition:

```tsx
export const Button = createSimpleComponent('button', 'button');
```

### Custom Logic

More complex elements (for example `Dialog`) wrap native platform APIs and add minimal behaviour while still forwarding attributes directly:

```tsx
export function Dialog({defaultOpen, children}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (defaultOpen) dialogRef.current?.showModal();
  }, [defaultOpen]);
  return <DialogCtx.Provider value={dialogRef}>{children}</DialogCtx.Provider>;
}
```

### CSS Driven

Styling is handled with attribute selectors. Component props are forwarded to attributes so CSS controls variants and states:

```css
[p="button"] {
  background-color: hsl(var(--p-primary));
  color: hsl(var(--p-primary-foreground));
}

[p="button"][variant="outline"] {
  background-color: hsl(var(--p-background));
  border: 1px solid hsl(var(--p-border));
}
```

Design tokens live in `src/variables.css` with both light and dark definitions.

## Component Inventory

Implemented components:

- **Badge** – status indicators
- **Button** – variants and sizes
- **Input** – text inputs with validation styling
- **Card** – layout container with padding variants
- **Dialog** – native `<dialog>` element with compound subcomponents
- **Accordion** – native `<details>` wrapper styled like shadcn/ui
- **Tabs** – TabList, Tab, and TabPanel wrappers

All simple components are located in `src/components/` and import their own `style.css`.

## Repository Structure

```
src/
  lib/
  components/
  variables.css
  base.css
  index.ts

demo/
  src/
  vite.config.ts
```

Run `pnpm install` and `pnpm run build` in `demo/` to build the demo app.

