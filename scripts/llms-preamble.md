# kinu — Preact UI toolkit (LLM authoring guide)

kinu is a performance-first Preact UI toolkit. Components are thin pass-throughs from JSX to semantic
HTML: each attaches a `k="<component-name>"` attribute to a native element, and **all styling and most
behavior is driven by CSS attribute selectors** — not JavaScript.

> This file is generated from the component metadata on every build, so it never drifts. Do not edit
> it by hand.

## How to author kinu UI

- Prefer kinu components over hand-rolled markup. If you are about to write a `<div>` with utility
  classes to build something kinu already ships (a stack, a grid, a metric block, a star rating, a
  copy button, a number stepper…), use the component instead.
- Components forward every native attribute to the underlying element. Pass `min`, `max`, `disabled`,
  `name`, `required`, `aria-*`, `onInput`, `style`, etc. straight through.
- Variants and states are **attributes**, styled in CSS — there is no per-instance JS state for them:
  `<Button variant="outline" size="sm">`, `<Badge variant="secondary">`, `<Stat.Delta trend="up">`,
  `<Stack gap="lg" align="center">`.
- The styling hook is the `k` attribute. CSS targets `[k="button"]`, `[k="button"][variant="outline"]`,
  `[k="input"]:user-invalid`, and so on. (Earlier revisions of this file called the attribute `p` —
  that was a documentation bug. The emitted attribute is, and always has been, `k`.)

## Interaction model: commands, not handlers

Disclosure components (Dialog, Popover, DropdownMenu, ContextMenu, Drawer, Sheet, Sidebar) are driven
by the native `command` / `commandfor` attributes rather than click handlers:

```tsx
<Button commandfor="settings" command="show-modal">Open</Button>
<Dialog>
  <Dialog.Content id="settings">…</Dialog.Content>
</Dialog>
```

Custom commands (`--prev`, `--next`, `--step-up`, `--step-down`) ride the same bus, so new interactive
components add no new global event listeners.

## Forms

Validation is native. Use `required`, `type="email"`, `min` / `max`, `pattern`, etc., and let the
`:user-invalid` CSS layer surface errors only after interaction. Wrap a control in `Field` with
`Field.Label`, `Field.Description`, and `Field.Error` (which reveals only when the field is invalid).
No validation library and no "touched" state to manage.

## Toast

```tsx
import {toast, ToastContainer} from 'kinu';

toast.show('Saved', {title: 'Success'});
// Mount <ToastContainer /> once near the app root.
```

## Component reference

Every component below is a named export from `kinu`. The usage snippet shows its JSX shape; notes call
out behavior and attributes. Compound parts (e.g. `Dialog.Trigger`, `Stat.Value`) are accessed as
properties of the root export.
