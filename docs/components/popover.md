# Popover

Command-driven popover built from `<dialog>`. Works with the same `commandfor` attribute as other command components.

## Import

```tsx
import {Popover, PopoverTrigger, PopoverContent, PopoverClose} from 'pui';
```

## Usage

```tsx
<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Place arbitrary content here.</p>
    <PopoverClose>
      <Button variant="outline">Close</Button>
    </PopoverClose>
  </PopoverContent>
</Popover>
```

## API

- `<Popover id?>` — wraps trigger/content and ensures they share an id.
- `<PopoverTrigger>` — clones its child and issues `command="show"`/`commandfor` attributes for the associated dialog.
- `<PopoverContent>` — renders the anchored `<dialog>` that displays the panel.
- `<PopoverClose>` — optional helper for close buttons.

## Accessibility

The popover uses `<dialog>` so focus stays inside once opened. Provide descriptive content and ensure interactive elements are reachable. Combine with `aria-label`/`aria-labelledby` for labelling.

## CSS hooks

- `[p="popover"]` — anchor positioning.
- `[p="popover-content"]` — floating surface styles, reused by dropdown and context menu components.
