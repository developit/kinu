# Architecture Overview

This document explains the technical architecture and design decisions behind kinu.

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
- **Declarative Commands**: `command`/`commandfor` attributes with a tiny polyfill
- **Event-Driven Toasts**: Lightweight global notifications

## Architecture

### Simple Components (Factory Pattern)
```tsx
export const Button = createSimpleComponent('button', 'button');
// <Button variant="outline" size="lg" loading />
// Renders: <button k="button" variant="outline" size="lg" loading />
```

### CSS-Driven Logic
```css
[k="button"] {
  /* Base styles + default variant */
}

[k="button"][variant="outline"] {
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
// Renders:
// <button commandfor="auto-id" command="show-modal">Open</button>
// <dialog id="auto-id">Modal content</dialog>
```

```tsx
// Simple accordion with slide animation
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

### Platform-Gating Policy

kinu deliberately adopts cutting-edge platform features (native `command`/`commandfor`, typed `attr()`, `@position-try` anchor positioning, `field-sizing`, `<details name>`). Using a feature before it is Baseline "widely available" is allowed, but it is **gated** so it never breaks a user:

1. **Progressive enhancement, never hard failure.** A component built on a newer feature must stay usable where the feature is absent — degrade via CSS `@supports`, a native fallback (a styled `<input type="range">` still works unstyled), or a documented graceful degradation. It must never throw or render unusable markup.
2. **Detect, then enhance.** Prefer native capability detection over version sniffing. The commands polyfill is the model: `installCommands()` no-ops when the browser already implements the API (`if ('commandFor' in HTMLButtonElement.prototype) return;`), so native support wins and the shim contributes nothing.
3. **SSR-safe by construction.** No module-level access to `document`/`window`; guard any DOM work with `typeof document === 'undefined'` (as `installCommands()` does). Every component must pass the SSR smoke test — render under `preact-render-to-string` without throwing.
4. **Document the baseline.** When a component depends on a feature newer than Baseline, state the minimum browser versions in its docs `notes` (see ProgressRing's typed-`attr()` note and Textarea's `field-sizing` fallback note).
5. **No polyfill bloat by default.** The only shipped shim is the tiny, on-demand `command`/`commandfor` polyfill. Do not add JavaScript to back-fill a CSS feature; prefer an `@supports` fallback. Any new platform shim must be justified against the size budget in [`ROADMAP.md`](./ROADMAP.md).

### Singletons & the Command Model

Two shared mechanisms keep interactive components stateless and provider-free. Reuse them instead of inventing per-component event wiring.

**Command attributes are the interaction primitive.** Disclosure components (Dialog, Popover, DropdownMenu, ContextMenu, Drawer, Sheet, Sidebar) are driven declaratively by the native `command`/`commandfor` attributes — a trigger points `commandfor` at a target `id` and names a `command` verb (`show-modal`, `close`, `toggle`, …) — rather than `onClick` state machines. The behaviour comes from small, layered installers in `src/lib/commands.ts`:

- `installCommands()` — the core `command`/`commandfor` polyfill.
- `installDialogsDropdowns()` — light-dismiss / outside-click closing.
- `installAdaptiveCommands()` — `beforetoggle`-based adaptation (e.g. responsive drawer/popover behaviour).
- `installMenuShortcuts()` — keyboard navigation for menus.

Components import only the installers they need (unused behaviour tree-shakes away) and call them at render time. Each installer is **idempotent and SSR-safe**: it returns early if already installed, if there is no `document`, or if the browser supports the feature natively — so calling it from every trigger costs nothing.

**Global singletons are event-driven, not context-driven.** The `toast` API is the template: a module-level `toast.show()` dispatches a DOM `CustomEvent`, and a single `<ToastContainer>` mounted once anywhere in the tree listens for it and renders. There is no provider and no context, and `toast.show()` works from outside the component tree entirely. New app-level singletons should follow the same shape — an import-and-call API, one mount point, decoupled by events, and safe to import under SSR.

## Components

- **Badge**: Inline status indicators
- **Button**: All variants, sizes, states
- **Input**: Form fields with validation
- **Card**: Layout containers
- **Dialog**: Native modal dialogs
- **Accordion**: Collapsible content styled like shadcn/ui with slide animation
- **Tabs**: TabList, Tab, TabPanel wrappers
- **Tooltip**: Hover text overlay
- **Progress**: Styled `<progress>` bar
- **Skeleton**: Animated loading placeholder
- **Toast**: Event-driven notifications
- **Textarea**: Styled `<textarea>` element
- **Label**: Form label text
- **Checkbox**: Custom checkbox inputs
- **RadioGroup**: Grouped radio buttons
- **Select**: Styled native `<select>`
- **Slider**: Range input slider
- **Separator**: Horizontal rule element
- **Avatar**: Circular user images
- **Toggle**: Pressable toggle button
- **ToggleGroup**: Group of toggles
- **AspectRatio**: Maintain responsive ratios
- **ScrollArea**: Scrollable container
- **Popover**: Small overlay menu
- **Alert**: Inline messages
- **AlertDialog**: Modal alert dialog
- **Table**: Basic styled table
- **Collapsible**: Toggle visibility of content
- **Resizable**: User-resizable panel
- **Sheet**: Sliding side panel
- **Sidebar**: Vertical navigation container
- **Breadcrumb**: Page hierarchy navigation
- **Menubar**: Horizontal menu of actions
- **NavigationMenu**: Complex nav menu
- **Pagination**: Page controls
- **Item**: Generic selectable item for all list-like containers
- **Combobox**: Input with suggestions
- **List**: Interactive selectable list
- **Listbox**: Non-modal filterable list (inline command palette)
- **Chip**: Badge with icon button
- **ContextMenu**: Right-click menu
- **Drawer**: Bottom sliding panel
- **DropdownMenu**: Triggered action list
- **HoverCard**: Card shown on hover
- **Calendar**: Date selection input
- **Carousel**: Horizontally scrollable list
- **DatePicker**: Simple date input
- **Typography**: Base text styles

## Philosophy

**Constraints drive creativity.** This toolkit:
- Enhances HTML instead of abstracting it
- Uses CSS for logic instead of JavaScript
- Prioritizes user experience over developer convenience
- Trusts web platform capabilities
- Eliminates entire categories of problems through good defaults

Built with the performance-first, minimalist approach of Jason Miller's work on Preact.
