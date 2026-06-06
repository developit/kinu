# Command Attributes

Many interactive components rely on a lightweight command polyfill that mirrors the proposed HTML `command`/`commandfor`
attributes. When you render `<Dialog.Trigger>` or `<DropdownMenuTrigger>`, kinu adds these attributes so the browser can open the
corresponding `<dialog>` element without extra wiring. The polyfill follows the [HTML Command API draft on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCommandElement),
bridging support until browsers ship the attribute natively.

## Why Commands?

- Keeps markup declarative—no imperative refs or event handlers to toggle dialogs.
- Plays nicely with nested components; commands bubble through the DOM so any child can trigger its parent dialog.
- Works server-side because the attributes exist in the HTML.

## Using Commands Manually

Commands install automatically the first time any dialog, dropdown, or sheet component renders. If you build custom triggers,
just apply the attributes on your markup and the polyfill will handle the rest:

```tsx
<button command="show-modal" commandfor="my-dialog">Open</button>
<dialog id="my-dialog">...</dialog>
```

Components such as Dialog, DropdownMenu, Drawer, Sheet, and Combobox also install the focus helpers used by dropdown-style
overlays, so there is no separate setup step.

## Available Commands

- `show-modal` — calls `showModal()` on a dialog element.
- `show` — calls `show()` on a dialog, used by dropdown style menus.
- `close` — closes the target dialog.

## Swipeable Overlays

Drawer, Sheet, and Sidebar install one extra helper, `installSwipe`, alongside
the command polyfill. On touch devices their `<dialog>` becomes a native CSS
scroll-snap container — the panel sits beside an empty "rail" you can fling it
into — so the gesture, momentum, and snap-back are all the browser's. The
helper only touches the scroller at the open/close boundaries:

- On open (`beforetoggle`) it jumps to the rail and smooth-scrolls the panel in.
- On `scrollend`, if a dismiss gesture has flung the panel off-screen, it calls
  `close()`.

CSS opts a dialog in by setting `--swipe: 1` inside the relevant media query, so
the same markup renders a transform-animated overlay on desktop and a
gesture-driven one on touch with no branching in JavaScript.

Commands dispatch as CustomEvents so you can intercept them if you need custom behavior:

```ts
document.addEventListener('kinu-command', (event) => {
  // event.detail: {command: string, target: HTMLElement}
});
```
