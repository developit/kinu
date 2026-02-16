# Drawer

Bottom sheet style overlay with trigger and close helpers.

## Usage

```tsx
import {Drawer, DrawerClose, DrawerContent, DrawerTrigger} from 'pui';

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>Content</DrawerContent>
</Drawer>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Drawer | `p="drawer"` | Renders markup that includes `p="drawer"`. |
| DrawerTrigger | — | Custom component implemented in the source file. |
| DrawerContent | `p="drawer-content"` | Renders markup that includes `p="drawer-content"`. |
| DrawerClose | — | Custom component implemented in the source file. |

## Props

### DrawerProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the drawer dialog. If not provided, one will be auto-generated. |

### DrawerContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Override the auto-generated dialog ID. |

### Static Shortcuts

- `Drawer.Trigger = DrawerTrigger`
- `Drawer.Content = DrawerContent`
- `Drawer.Close = DrawerClose`

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Positions content with CSS variables so you can change direction.
- Attach Drawer.Close to any element that should dismiss.

---

_Source: `src/components/drawer/index.tsx`
