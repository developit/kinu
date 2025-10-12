# Drawer

Bottom sheet dialog that slides up from the edge of the viewport.

## Import

```tsx
import {Drawer} from 'pui';
```

## Usage

```tsx
<Drawer>
  <Drawer.Trigger>
    <Button variant="outline">Open drawer</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <p>Place mobile-friendly UI here.</p>
    <Drawer.Close>
      <Button variant="outline">Close</Button>
    </Drawer.Close>
  </Drawer.Content>
</Drawer>
```

## API

Same as `Sheet`, but the `<dialog>` animates vertically from the bottom.

## CSS hooks

- `[p="drawer-content"]` — handles the slide-up animation and backdrop styling.
