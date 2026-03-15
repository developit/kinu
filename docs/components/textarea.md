# Textarea

Text area with matching input styling, variants, and sizes.

## Usage

```tsx
import {Textarea} from 'kinu';

<Textarea rows={4} placeholder="Write here" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Textarea | Multi-line text input | `<textarea p="textarea">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| rows | `number` | — | Number of visible text rows. |
| placeholder | `string` | — | Placeholder text for the textarea. |
| value | `string | number | readonly string[] | undefined` | — | Textarea value. |
| onInput | `(event: InputEvent) => void` | — | Change handler for controlled textareas. |
| disabled | `boolean` | — | Disables interactions and applies disabled styling. |

## Notes

- Wraps the native `<textarea>` for full form support.
- Use the resize attribute to control user resizing.

---

_Source: `src/components/textarea/index.tsx`
