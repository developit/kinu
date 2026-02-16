# Sheet

Side or bottom sheet overlay with directional variants.

## Usage

```tsx
import {Sheet, SheetClose, SheetContent, SheetTrigger} from 'pui';

<Sheet side="right">
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>Panel</SheetContent>
</Sheet>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Sheet | Overlay panel | `p="sheet"` |
| SheetTrigger | Sheet trigger | — |
| SheetContent | Sheet content | `p="sheet-content"` |
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

---

_Source: `src/components/sheet/index.tsx`
