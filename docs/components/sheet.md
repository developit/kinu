# Sheet

Side or bottom sheet overlay with directional variants.

## Usage

```tsx
import {Sheet, SheetClose, SheetContent, SheetTrigger} from 'kinu';

<Sheet>
  <SheetTrigger><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">Panel</SheetContent>
  <SheetClose><Button>Close</Button></SheetClose>
</Sheet>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Sheet | Overlay panel | — |
| SheetTrigger | Sheet trigger | — |
| SheetContent | Sheet content | — |
| SheetClose | Close button | — |

## Props

### SheetProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the sheet dialog. If not provided, one will be auto-generated. |

### SheetContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Override the auto-generated dialog ID. |

### Static Shortcuts

- `Sheet.Trigger = SheetTrigger`
- `Sheet.Content = SheetContent`
- `Sheet.Close = SheetClose`

## Notes

- Control the slide direction with the side attribute on SheetContent.
- SheetClose attaches the close command to any child element.
- On touch devices the sheet is swipeable: it slides in from the edge and is
  dismissed by swiping it back off-screen, using native CSS scroll-snapping.

---

_Source: `src/components/sheet/index.tsx`
