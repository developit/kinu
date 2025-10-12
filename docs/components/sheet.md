# Sheet

Side-docked dialog built on `<dialog>`. Ideal for settings panels and detail views.

## Import

```tsx
import {Sheet} from 'pui';
```

## Usage

```tsx
<Sheet>
  <Sheet.Trigger>
    <Button variant="outline">Open settings</Button>
  </Sheet.Trigger>
  <Sheet.Content>
    <h3>Settings</h3>
    <Sheet.Close>
      <Button variant="outline">Close</Button>
    </Sheet.Close>
  </Sheet.Content>
</Sheet>
```

## API

- `<Sheet>` — context provider that links trigger/content/close.
- `<Sheet.Trigger>` — clones trigger children and injects `command="show-modal"`.
- `<Sheet.Content>` — renders the sliding `<dialog>` pinned to the right edge.
- `<Sheet.Close>` — closes the sheet by dispatching the `close` command.

## Accessibility

Identical to `Dialog`: focus is trapped while open and ESC closes the sheet. Provide heading text and ensure primary actions are reachable.

## CSS hooks

- `[p="sheet-content"]` — sizing and slide-in animation.
- `[p="sheet-content"]::backdrop` — dimmed background.
