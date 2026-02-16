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

| Name | DOM element | Details |
| --- | --- | --- |
| Sheet | `p="sheet"` | Renders markup that includes `p="sheet"`. |
| SheetTrigger | — | Custom component implemented in the source file. |
| SheetContent | `p="sheet-content"` | Renders markup that includes `p="sheet-content"`. |
| SheetClose | — | Custom component implemented in the source file. |

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

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Control the slide direction with the side attribute on SheetContent.
- SheetClose attaches the close command to any child element.

---

_Source: `src/components/sheet/index.tsx`
