# List

Interactive selectable list with shared item styling.

## Usage

```tsx
import {List} from 'kinu';

<List>
  <List.Item selected>Inbox</List.Item>
  <List.Item>Drafts</List.Item>
</List>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| List | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `"nav"` | — | Visual variant for the list.
- `nav`: Uses accent colors for hover/focus/selected (sidebar-style). |
| virtual | `boolean` | — | Render rows on demand via CSS content-visibility — keeps very long lists
fast without a virtualization library, while rows stay in the DOM for
find-in-page and assistive tech. |

### Static Shortcuts

- `List.Item = Item`

## Notes

- Items render as `<button>` by default, or `<a>` when href is provided.
- Use variant="nav" for sidebar-style navigation with softer accent colors.
- Shares the same item styles as DropdownMenuItem and ComboboxOption.
- Add `virtual` for very long lists: rows render on demand via CSS `content-visibility`, with no virtualization library. Unlike JS virtualization the rows stay in the DOM, so find-in-page and assistive tech still reach them.

---

_Source: `src/components/list/index.tsx`
