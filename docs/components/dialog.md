# Dialog

A thin wrapper around the native `<dialog>` element with helpers for trigger and close buttons.

## Import

```tsx
import {Dialog} from 'pui';
```

## Usage

```tsx
<Dialog>
  <Dialog.Trigger>
    <Button variant="outline">Open dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <h3>Confirm action</h3>
    <p>Dialog content goes here.</p>
    <Dialog.Close>
      <Button variant="outline">Cancel</Button>
    </Dialog.Close>
  </Dialog.Content>
</Dialog>
```

## API

- `<Dialog id?>` — wraps your dialog tree and generates a unique id when one is not provided.
- `<Dialog.Trigger>` — clones its children and injects the `command` attributes required to call `showModal()` on the dialog.
- `<Dialog.Content>` — renders the actual `<dialog>` element. Pass any native `<dialog>` attribute such as `open`, `class`, or `method`.
- `<Dialog.Close>` — injects `command="close"` into its children.

## Accessibility

The component uses the platform `<dialog>` semantics, so focus trapping and ESC to close work out of the box. Provide headings and descriptive copy. When you render forms inside the dialog ensure buttons call `Dialog.Close` or submit the form as appropriate.

## CSS hooks

- `[p="dialog-content"]` — surface styles, including open animation.
- `[p="dialog-content"]::backdrop` — overlay styling and animation.
