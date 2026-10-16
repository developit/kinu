# ViewStack

Lazy screens with native horizontal swipe navigation. CSS scroll snap handles gestures and momentum; scroll-driven animations progressively add parallax, dimming and shadows. **ViewStack never reads or writes browser history, changes URLs, or intercepts links.**

## Usage

```tsx
import {Button, ViewStack} from 'kinu';

<ViewStack id="settings" style={{height: '24rem'}} aria-label="Settings">
  <ViewStack.View id="settings-home" aria-label="Settings home">
    <h2>Settings</h2>
    <Button command="--view-account" commandFor="settings">Account →</Button>
  </ViewStack.View>
  <ViewStack.View id="account" aria-label="Account">
    {() => <>
      <Button command="--prev" commandFor="settings">← Back</Button>
      <h2>Account</h2>
      <input aria-label="Display name" />
    </>}
  </ViewStack.View>
</ViewStack>
```

## Exports

| Name | Rendered HTML | Description |
| --- | --- | --- |
| ViewStack | `<div k="view-stack">` | Horizontal scroll-snap viewport; defaults to `100dvh` tall |
| ViewStack.View | `<div k="view-stack-view">` | Snap target with an internal, vertically scrolling content wrapper |

Both forward native div attributes and DOM refs. Supply direct `ViewStack.View` children in stable drill-down order (not fragments or wrapper components). Use stable keys when adding, removing, or replacing views. The first view is initially active. Give each view an accessible name using `aria-label` or `aria-labelledby`.

## Navigation

Use native buttons (or kinu `Button`) with `commandFor` pointing to the stack's ID:

- `--next`: move one view deeper.
- `--prev`: move back one view.
- `--view-ID`: navigate to the direct view whose `id` is `ID`.

Unknown commands and out-of-bounds moves are ignored. Supply explicit back buttons for keyboard and pointer users; touch and trackpad users can also swipe. Normal links retain their normal behavior. Routing/history integration, if desired, belongs to the application.

## Lazy rendering and accessibility

Only the first view's content is rendered initially, including on the server. Other view shells stay in the layout as snap targets. Navigation renders the destination before programmatic scrolling; swipes render it when it becomes the active snap target. JSX children are supported; a function child additionally defers constructing the content until the first visit. It is a render function, not a one-time initializer: it can run again on subsequent renders. Put hooks in child components, not in this function.

Visited content stays mounted, retaining form values, scroll position and component state. It is **not** pruned on back navigation. Remove a view from the application tree to dispose of it. Every inactive view is `inert`, preventing off-screen interaction and accessibility-tree leakage. On a snap change, focus returns to the previously focused element in the destination, or the destination view itself, using `preventScroll`.

## Styling and browser support

Override the stack's height to embed it in a page. Each view's internal `[k="view-stack-content"]` wrapper fills the viewport and scrolls vertically. Customize that wrapper for padding/background; transforms never touch the snap targets.

`scrollsnapchange` determines the active view, with an `IntersectionObserver` fallback in browsers without snap events. Scroll-driven effects are gated behind `@supports`; unsupported browsers retain functional scroll-snap navigation. Reduced-motion preferences disable smooth scrolling and parallax. No JavaScript gesture or animation loop is used.

Inspired by the [Stack Drill Down guide](https://github.com/GoogleChrome/modern-web-guidance-src/blob/main/guides/ui-components/stack-drill-down/guide.md), without its router/history coupling.
