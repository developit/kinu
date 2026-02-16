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

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Drawer | Slide-out panel | `p="drawer"` |
| DrawerTrigger | Drawer trigger | — |
| DrawerContent | Drawer content | `p="drawer-content"` |
| DrawerClose | Close button | — |

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

## Notes

- Positions content with CSS variables so you can change direction.
- Attach Drawer.Close to any element that should dismiss.

---

_Source: `src/components/drawer/index.tsx`
