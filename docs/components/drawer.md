# Drawer

Bottom sheet style overlay with trigger and close helpers.

## Usage

```tsx
import {Drawer, DrawerClose, DrawerContent, DrawerTrigger} from 'kinu';

<Drawer>
  <DrawerTrigger><Button>Open</Button></DrawerTrigger>
  <DrawerContent>Content</DrawerContent>
  <DrawerClose><Button>Close</Button></DrawerClose>
</Drawer>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Drawer | Slide-out panel | `<div k="drawer">` |
| DrawerTrigger | Drawer trigger | — |
| DrawerContent | Drawer content | `<dialog k="drawer-content">` |
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
