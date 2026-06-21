# Motion & View Transitions

kinu keeps motion in the platform: CSS transitions and animations for component
state, and the native **View Transitions API** for larger changes like route
swaps and list reorders. There is no animation runtime to ship.

## Motion tokens

Easing lives in CSS custom properties so you can retune motion globally or per
component. The defaults are defined in `kinu/style.css`:

| Token | Use |
| --- | --- |
| `--k-ease` | the default easing (`--k-ease-out`) |
| `--k-ease-out` | enter/exit and most UI motion |
| `--k-ease-spring` | playful, slightly overshooting motion |
| `--k-ease-elastic` | pronounced overshoot for emphasis |

```css
:root {
  --k-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
}

[k="accordion"][open] {
  transition-duration: 200ms;
  transition-timing-function: var(--k-ease-spring);
}
```

Always respect reduced-motion. The base stylesheet already neutralizes
animations under `@media (prefers-reduced-motion: reduce)`; honor it in your own
overrides too.

## The `transition()` helper

For DOM updates that should animate as a View Transition, wrap the update in
`transition()`. It calls `document.startViewTransition` where available and
falls back to a synchronous update otherwise — so it is always safe to use,
including during SSR.

```tsx
import {transition} from 'kinu';

function navigate(next: string) {
  transition(() => {
    // mutate the DOM / set state synchronously here
    setRoute(next);
  });
}
```

### Naming transitioned elements

Give elements a stable `view-transition-name` so the browser can morph them
between states (a thumbnail expanding into a hero image, a row moving in a
reordered list):

```css
.card-hero {
  view-transition-name: hero;
}
```

Only one element may carry a given `view-transition-name` at a time. For list
reorders, derive the name from the item's id.

## Cross-document transitions (MPA)

For multi-page apps, opt into cross-document view transitions with a single
at-rule — no JavaScript at all:

```css
@view-transition {
  navigation: auto;
}
```

The browser then animates same-origin navigations using any matching
`view-transition-name`s on both pages.
