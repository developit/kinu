# Textarea

Text area with matching input styling, variants, and sizes.

## Usage

```tsx
import {Textarea} from 'pui';

<Textarea rows={4} placeholder="Write here" />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Textarea | `<textarea>` | Wraps `<textarea>` and sets `p="textarea"`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| rows | `number` | — | Number of visible text rows. |
| placeholder | `string` | — | Placeholder text for the textarea. |
| value | `JSX.IntrinsicElements` | — | Textarea value. |
| onInput | `JSX.IntrinsicElements` | — | Change handler for controlled textareas. |
| disabled | `boolean` | — | Disables interactions and applies disabled styling. |

## Attributes

Inherits all native attributes from `<textarea>`. No additional styling attributes are required.

## Notes

- Wraps the native `<textarea>` for full form support.
- Use the resize attribute to control user resizing.

---

_Source: `src/components/textarea/index.tsx`
