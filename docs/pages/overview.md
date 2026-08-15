# kinu Overview

kinu is a constraint-driven collection of Preact components that enhance the platform instead of replacing it. Every component
forwards props directly to the underlying HTML element so you keep semantics, accessibility, and native performance. CSS drives
state, variants, and animation; JavaScript only wires up the parts the platform cannot express on its own.

## Key Ideas

- **Platform first.** Components wrap native elements like `<button>`, `<dialog>`, and `<details>` instead of rebuilding them.
- **CSS as logic.** Props map to attributes that selectors read, eliminating runtime prop filtering and branching.
- **Tiny runtime.** The entire kit ships as ~1.2 KB of JavaScript with 4 KB of CSS. There is no client-side router, store, or theme engine.
- **Composable primitives.** Complex widgets like Dialog, Dropdown Menu, and Date Picker stitch together smaller building blocks.
- **Tree-shakeable.** Import only what you need; everything is exported individually from `kinu`.

## Installing

```bash
pnpm add kinu
# or
npm install kinu
```

kinu declares `preact` as a peer dependency. Make sure your project already depends on `preact@^10.26.8` or later.

## Minimum Setup

1. Import the toolkit stylesheet once in your application entry point. It bundles the reset, tokens, and every component style so the attributes render correctly everywhere:

   ```ts
   import 'kinu/style.css';
   ```

2. Import components as you need them. Each component maps props to attributes that the shared stylesheet reads:

   ```tsx
   import {Button, Card, Input} from 'kinu';

   export function Example() {
     return (
       <Card>
         <h2>Welcome</h2>
         <Input placeholder="Your email" type="email" />
         <Button variant="outline">Join the beta</Button>
       </Card>
     );
   }
   ```

## Anatomy of a kinu Component

Most components are generated through a `createSimpleComponent` factory that sets a `p` attribute for styling and forwards every
other prop untouched. When you render `<Button variant="secondary" />` you literally get `<button k="button" variant="secondary" />`.
That means:

- Standard browser form behavior continues to work.
- TypeScript knows the exact HTML attributes you can pass.
- CSS handles sizing, variants, and state with high specificity selectors.

More complex components like Dialog install a small command polyfill that attaches to the native `<dialog>` element. Even then,
the markup stays as close to HTML as possible, and styling still keys off attributes.

## Refs

`ref` is forwarded to the DOM element a component renders, not to anything of kinu's own. Object refs, callback refs, and
callback refs that return a cleanup all behave exactly as they would on the bare element:

```tsx
const input = useRef<HTMLInputElement>(null);

<Input ref={input} />;          // input.current is the <input>
<Dialog.Content ref={dialog} />; // dialog.current is the <dialog>
```

Refs detach on unmount (`ref.current` returns to `null`, callback refs are called with `null`), and swapping a ref between
renders detaches the old one before attaching the new one.

Trigger components — `Dialog.Trigger`, `Popover.Trigger`, `Sheet.Trigger`, and friends — decorate the child you give them
rather than rendering an element, so a `ref` on a trigger lands on that child:

```tsx
<Dialog.Trigger ref={button}>
  <Button>Open</Button>
</Dialog.Trigger>
```

Components that only supply context and render nothing of their own — `Dialog`, `ContextMenu` — do not accept a `ref`.

## When to Reach for kinu

- You want sensible defaults and polished styling while keeping semantic markup.
- You value bundle size and runtime performance over abstraction layers.
- You need a starting point that embraces progressive enhancement instead of fighting the platform.

If you need a fully managed state library or headless primitives, kinu is intentionally not that. It focuses on the simple case
first and gives you the hooks to scale when necessary.
