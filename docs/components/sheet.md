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
- On touch devices the sheet is swipeable — swipe it back toward the edge it came from to dismiss. The gesture is native CSS scroll-snapping, so momentum and snap-back come from the browser.
- SheetContent wraps your children in a `[k="sheet-panel"]` element: the dialog is the swipe scroller and the panel is the surface, which keeps content in normal block flow at every breakpoint. Style through the panel if you target direct children (`[k="sheet-content"] > …`); descendant selectors are unaffected.

---

_Source: `src/components/sheet/index.tsx`
