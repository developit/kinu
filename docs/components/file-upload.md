# File Upload

Native file input with a styled button for selecting local files.

## Usage

```tsx
import {FileUpload} from 'kinu';

<FileUpload accept="image/*" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| FileUpload | Component | `<input k="file-upload">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | `(event: Event) => void` | — | Change handler called when the user selects files. |
| accept | `string` | — | Allowed file types as MIME types or extensions (e.g. "image/*" or ".pdf"). |
| multiple | `boolean` | — | Allow selecting multiple files. |
| disabled | `boolean` | — | Disable the input. |
| name | `string` | — | Input name used for form submissions. |

## Notes

- Sets type="file" for you and forwards all native input props.
- Use the accept prop to restrict selectable file types.
- Use capture="user" or capture="environment" to invoke the camera on mobile.

---

_Source: `src/components/file-upload/index.tsx`
