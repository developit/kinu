const e=`# Sheet

Side or bottom sheet overlay with directional variants.

## Usage

\`\`\`tsx
import {Sheet, SheetClose, SheetContent, SheetTrigger} from 'pui';

<Sheet side="right">
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>Panel</SheetContent>
</Sheet>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| Sheet | \`<div>\` | Container that provides sheet context and wraps its children. |
| SheetTrigger | — | Decorator that opens the sheet when its child is activated. |
| SheetContent | \`<dialog>\` | Dialog element that renders the sheet surface. |
| SheetClose | — | Decorator that closes the sheet for its child control. |

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Control the slide direction with the side attribute on SheetContent.
- SheetClose attaches the close command to any child element.

---

<source-ref src="src/components/sheet/index.tsx"></source-ref>
`;export{e as default};
//# sourceMappingURL=sheet-CGdDPYHs.js.map
