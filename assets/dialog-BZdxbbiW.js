const n=`# Dialog

Composable modal built on the native \`<dialog>\` element.

## Usage

\`\`\`tsx
import {Dialog, DialogClose, DialogContent, DialogTrigger} from 'kinu';

<Dialog>
  <DialogTrigger><Button>Open</Button></DialogTrigger>
  <DialogContent>Modal body</DialogContent>
  <DialogClose><Button>Close</Button></DialogClose>
</Dialog>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Dialog | Modal overlay | — |
| DialogTrigger | Dialog trigger | — |
| DialogContent | Dialog content | \`<dialog k="dialog-content">\` |
| DialogClose | Close button | — |

## Props

### DialogProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Optional ID for the dialog. If not provided, one will be auto-generated. |

### DialogContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Override the auto-generated dialog ID. |

### Static Shortcuts

- \`Dialog.Trigger = DialogTrigger\`
- \`Dialog.Content = DialogContent\`
- \`Dialog.Close = DialogClose\`

## Notes

- Relies on command attributes instead of portal gymnastics.
- Dialog.Content forwards all native \`<dialog>\` props.

---

_Source: \`src/components/dialog/index.tsx\`
`;export{n as default};
//# sourceMappingURL=dialog-BZdxbbiW.js.map
