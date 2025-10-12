# Command Attributes

Many interactive components rely on a lightweight command polyfill that mirrors the proposed HTML `command`/`commandfor`
attributes. When you render `<Dialog.Trigger>` or `<DropdownMenuTrigger>`, PUI adds these attributes so the browser can open the
corresponding `<dialog>` element without extra wiring.

## Why Commands?

- Keeps markup declarative—no imperative refs or event handlers to toggle dialogs.
- Plays nicely with nested components; commands bubble through the DOM so any child can trigger its parent dialog.
- Works server-side because the attributes exist in the HTML.

## Using Commands Manually

If you build your own trigger, apply the attributes yourself and call `installCommands()` once:

```tsx
import {installCommands} from 'pui/lib/commands';

installCommands();

<button command="show-modal" commandfor="my-dialog">Open</button>
<dialog id="my-dialog">...</dialog>
```

`installDialogsDropdowns()` installs the small focus management helpers used by dropdown-style components. It is automatically
invoked by Dialog, DropdownMenu, Drawer, Sheet, and friends, so you rarely need to call it yourself.

## Available Commands

- `show-modal` — calls `showModal()` on a dialog element.
- `show` — calls `show()` on a dialog, used by dropdown style menus.
- `close` — closes the target dialog.

Commands dispatch as CustomEvents so you can intercept them if you need custom behavior:

```ts
document.addEventListener('pui-command', (event) => {
  // event.detail: {command: string, target: HTMLElement}
});
```
