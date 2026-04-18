# List

Interactive selectable list with shared item styling.

## Usage

```tsx
import {List, ListItem} from 'kinu';

<List>
  <ListItem selected>Inbox</ListItem>
  <ListItem>Drafts</ListItem>
</List>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ListItem | Component | Alias of Item |
| List | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `"nav"` | — | Visual variant for the list.
- `nav`: Uses accent colors for hover/focus/selected (sidebar-style). |

## Notes

- Items render as `<button>` by default, or `<a>` when href is provided.
- Use variant="nav" for sidebar-style navigation with softer accent colors.
- Shares the same item styles as DropdownMenuItem and ComboboxOption.

---

_Source: `src/components/list/index.tsx`
