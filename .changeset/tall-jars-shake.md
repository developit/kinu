---
'kinu': patch
---

Fix ref forwarding, which only worked in the narrowest case.

`ref` now reaches the DOM element for every component that renders one, and follows Preact's own attach/detach semantics.
Four separate defects are fixed:

- **Hand-written components never forwarded `ref` at all.** `AspectRatio`, `Avatar`, and the `Content`/`Trigger`/`Close`
  parts of `Dialog`, `Drawer`, `Sheet`, `Popover`, `DropdownMenu` and `ContextMenu`, plus `CarouselPrevious`/`CarouselNext`/
  `CarouselContent`, were plain function components. Preact assigned `ref.current` the internal Preact `Component` instance,
  so refs appeared to work but never yielded a DOM node.
- **Components with `defaultProps` or an internal ref froze the first ref they saw.** The proxy was bound once per instance,
  so a ref that arrived on a later render, or was swapped for another, was ignored forever.
- **Those components also never detached.** The proxy always returned a cleanup function, which opts a ref into Preact's
  cleanup protocol and suppresses the `null` call — object refs kept pointing at removed DOM nodes and callback refs were
  never called with `null`.
- **Ref callbacks returning a non-function value could throw on unmount.** A cleanup is now only run when one was actually
  returned.

`forwardRef` no longer wraps: it tags a component so `ref` arrives as a normal prop, which is both smaller and one less
function call per render. `CarouselContent` now forwards the rest of its props to the underlying element as its type always
promised. `Dialog.Trigger` and the other trigger components forward `ref` to the child they decorate.
