const e=`# File Upload

Native file input with a styled button for selecting local files.

## Usage

\`\`\`tsx
import {FileUpload} from 'pui';

<FileUpload />
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| FileUpload | File input | \`<input p="file-upload">\` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | \`(event: Event) => void\` | — | Called when the user selects files. Access selected files via \`event.target.files\`. |
| accept | \`string\` | — | Allowed file types as MIME types or extensions (e.g. \`"image/*"\` or \`".pdf,.docx"\`). |
| multiple | \`boolean\` | — | Allow selecting multiple files. |
| disabled | \`boolean\` | — | Disable the input. |
| name | \`string\` | — | Input name used for form submissions. |

## Notes

- Sets type="file" for you and forwards all native input props.
- Use \`accept\` to restrict selectable file types.
- Use \`capture="user"\` or \`capture="environment"\` to invoke the camera on mobile.

---

_Source: \`src/components/file-upload/index.tsx\`
`;export{e as default};
//# sourceMappingURL=file-upload-DwvJhrFu.js.map
