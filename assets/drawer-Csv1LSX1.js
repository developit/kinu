const e=`# Drawer

Bottom sheet style overlay with trigger and close helpers.

## Usage

\`\`\`tsx
import {Drawer, DrawerClose, DrawerContent, DrawerTrigger} from 'pui';

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>Content</DrawerContent>
</Drawer>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| Drawer | \`<div>\` | Container that provides drawer context and wraps the trigger and content. |
| DrawerTrigger | — | Decorator that opens the drawer when its child is activated. |
| DrawerContent | \`<dialog>\` | Dialog element that renders the sliding panel. |
| DrawerClose | — | Decorator that closes the drawer for its child control. |

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Positions content with CSS variables so you can change direction.
- Attach Drawer.Close to any element that should dismiss.

---

<source-ref src="src/components/drawer/index.tsx"></source-ref>
`;export{e as default};
//# sourceMappingURL=drawer-Csv1LSX1.js.map
