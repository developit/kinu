# ViewStack

Lazy screens with native horizontal swipe navigation. CSS scroll snap handles gestures and momentum; scroll-driven animations progressively add parallax, dimming and shadows. **ViewStack never reads or writes browser history, changes URLs, or intercepts links.**

## Usage

```tsx
import {Button, ViewStack} from 'kinu';

<ViewStack style={{height: '24rem'}} aria-label="Settings">
  <ViewStack.View id="settings-home" aria-label="Settings home">
    <h2>Settings</h2>
    <Button command="--show" commandFor="account">Account →</Button>
  </ViewStack.View>
  <ViewStack.View id="account" aria-label="Account">
    {() => <>
      <Button command="--show" commandFor="settings-home">← Back</Button>
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
| ViewStack.View | `<div k="view-stack-view" tabindex="-1">` | Focusable snap target with an internal, vertically scrolling content wrapper |

Both forward native div attributes and DOM refs. Supply direct `ViewStack.View` children in drill-down order (not fragments or wrapper components). Give each view an accessible name using `aria-label` or `aria-labelledby`.

## Navigation

**Navigation is focus.** Focusing a view scrolls it into its snap position natively — the browser does the scrolling, honoring `scroll-behavior` and reduced-motion preferences, in either text direction. There is no navigation API beyond that:

- Declaratively: any command whose `commandFor` is a view's `id` focuses that view (`command="--show"` by convention; the name is not inspected).
- Imperatively: `document.getElementById('account').focus()`, or `.focus()` on a view ref.

The focused view is announced by its accessible name. Supply explicit back buttons for keyboard and pointer users. By default, touch users can swipe back; use commands to drill forward. Normal links retain their normal behavior. Routing/history integration, if desired, belongs to the application.

### Touch swipe direction

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| swipe | `'back' \| 'both'` | `'back'` (CSS) | Controls the initial direction of native touch panning |

```tsx
<ViewStack swipe="both">{/* Allow forward and backward touch swipes */}</ViewStack>
```

`swipe` is forwarded unchanged to the stack element. CSS attribute selectors implement the default and opt-in via directional `touch-action`, automatically reversing the allowed direction in RTL. There are no JavaScript gesture handlers or prop defaults. Vertical scrolling and pinch zoom remain available, and focus/command navigation works in either mode. The live demo lets you switch policies.

This is a touch-input policy, not a navigation guard: wheel/trackpad scrolling, keyboard scrolling, and programmatic scrolling are unaffected. Browsers evaluate directional `touch-action` at the start of a gesture and may allow reversing direction once an allowed pan has begun. Application-level restrictions should determine which screens exist, rather than rely on gesture policy.

### Can a hard flick skip the next screen?

For native momentum flicks, no: each view sets `scroll-snap-stop: always`, so the browser must stop at the next snap point in that direction rather than coast through multiple screens. `scroll-snap-type: x mandatory` alone would only guarantee landing on *some* screen, not the adjacent one. `overscroll-behavior-x: none` also prevents chaining at the ends of the stack.

This is a native scroll-snap guarantee, not a JavaScript gesture lock. A continuous drag, repeated gestures, or wheel/trackpad input that the browser treats as a position-based scroll can still traverse multiple screens. Focusing a view can also jump to a non-adjacent view. Enforcing exactly one screen for every possible input sequence would require intercepting native scrolling; ViewStack intentionally does not do that.

## Lazy rendering and accessibility

Plain children render immediately, including on the server. A **function child** is deferred until the view's first visit: it renders as soon as the view is focused — before the scroll animation starts — or, for views reached by swiping, when the view becomes the majority-visible one. Afterwards it is a normal render function (it re-runs when the application re-renders), so put hooks in child components, not in the function itself.

Visited content stays mounted, retaining form values, scroll position and component state; remove a view from the application tree to dispose of it. Rendering a view for its first visit doesn't touch other views: their VNodes are unchanged, so Preact skips them.

Whichever view is majority-visible is active; every other view's content wrapper is `inert`, preventing off-screen interaction and accessibility-tree leakage. The view shells themselves stay focusable, since focusing one is how you navigate to it.

## Styling and browser support

Override the stack's height to embed it in a page. Each view's internal `[k="view-stack-content"]` wrapper fills the viewport and scrolls vertically. Customize that wrapper for padding/background; transforms never touch the snap targets.

An `IntersectionObserver` per view determines the active view; views added or removed later need no coordination. Scroll-driven effects are gated behind `@supports`; unsupported browsers retain functional scroll-snap navigation. Reduced-motion preferences disable smooth scrolling and parallax. No JavaScript gesture or animation loop is used.

Inspired by the [Stack Drill Down guide](https://github.com/GoogleChrome/modern-web-guidance-src/blob/main/guides/ui-components/stack-drill-down/guide.md), without its router/history coupling.
