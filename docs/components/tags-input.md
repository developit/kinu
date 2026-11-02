# Tags Input

Token / tags input that submits natively via a hidden field.

## Usage

```tsx
import {TagsInput} from 'kinu';

<TagsInput name="tags" value={['design', 'frontend']} placeholder="Add a tag…" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| TagsInput | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `string` | — | Form field name. A hidden input submits the tags joined by `separator`. |
| value | `string[]` | — | Initial tags. |
| separator | `string` | ',' | Character that joins the submitted value and also commits a typed tag. |
| max | `number` | — | Maximum number of tags. |
| duplicates | `boolean` | false | Allow duplicate tags. |
| placeholder | `string` | — | Placeholder for the text input. |

## Notes

- Type and press Enter (or the `separator`) to add a tag; Backspace on an empty field removes the last; click a chip’s × to remove it. Each change rewrites a hidden `<input name>` and fires `input`/`change`, so it submits with a normal form.
- A single per-instance ref manages the chips imperatively — no framework state store. SSR-safe: tags render on mount.
- The submitted value is the tags joined by `separator` (default `,`). API: `name`, `value` (string[]), `separator`, `max`, `duplicates`.

---

_Source: `src/components/tags-input/index.tsx`
