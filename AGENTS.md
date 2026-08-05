# Performance-Focused Preact UI Toolkit

## Project Vision

A pattern-driven toolkit that enhances standard HTML elements. Built using a constraint-driven approach inspired by Jason Miller, the library focuses on user experience and aggressive minimalism.

## Core Principles

1. Prototype to discover possibilities, then tighten constraints
2. Technical excellence before DX conveniences
3. Treat annoyance in code as a signal for improvement
4. High signal-to-noise APIs so developers write much less code
5. Handle the simple case first, then provide fallbacks for complexity

## Contributing & Roadmap

- **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** — the runbook for adding a component: folder layout, the `createSimpleComponent` factory, docs wiring, the Definition-of-Done gates, and the size-first commit discipline. Read it before adding or changing a component.
- **[`ROADMAP.md`](./ROADMAP.md)** — what to build next, in priority order, with per-component gzipped size budgets and the decisions log.
- **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** — the platform-first rationale, the command-attribute model, and the conventions that keep runtime JS near zero.

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

All simple components are located in `src/components/` and import their own `style.css`.

#### How to use CSS to implement defaults/fallbacks/overrides

We never use JavaScript to express basic logic when the same outcome can be achieved in CSS. For example, rather than destructuring props to add a fallback value of "default" for "variant", we simply include the empty case in our CSS selector:

```css
[p="button"][variant="default"],
[p="button"]:not([variant]) {
  background-color: hsl(var(--p-background));
  border: 1px solid hsl(var(--p-border));
}
```

Alternatively, for a enum/boolean prop that has a default value like the above, it's often the case that the set of CSS properties applied dependent on the prop value are always the same. When this is true, you can omit the entire `[p="button"][variant="default"], [p="button"]:not([variant])` selector entirely and simply apply the default CSS properties in the element's base selector (`[p="button"]`).

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

## Inspecting the demo in a browser

Start the demo dev server with `pnpm -F demo dev` (vite, http://localhost:5173).

This repo configures the Playwright MCP server in `.mcp.json`, so an agent can
drive a real Chromium with the `browser_*` tools — navigate, snapshot, click,
type, read console messages, screenshot, and inspect network/performance (the
`devtools` capability is enabled). Prefer these tools over ad-hoc shell
scripting for any view/inspect/debug task.

In the Claude Code cloud container, `.claude/hooks/session-start.sh` runs at
session start and (a) installs the matching Chromium build via
`@playwright/mcp install-browser`, so Playwright's built-in resolution finds
it with no hard-coded path, and (b) installs `mcp-later` and warms its cache.
`.mcp.json` wraps the Playwright server in `mcp-later` so it only boots when a
`browser_*` tool is actually called -- sessions that never touch the browser
pay no startup cost. The hook is a no-op outside the cloud container.

