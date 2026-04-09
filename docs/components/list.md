# List

Interactive selectable list. ListItem shares styling with DropdownMenuItem and ComboboxOption.

## Usage

```tsx
import {List, ListItem} from 'kinu';

<List>
  <ListItem selected>Inbox</ListItem>
  <ListItem>Drafts</ListItem>
  <ListItem>Sent</ListItem>
</List>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| List | List container | `<div k="list">` |
| ListItem | Selectable item | `<button k="list-item">` or `<a k="list-item">` |
| List.Item | Alias of ListItem | — |

## Props

### ListProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `"nav"` | — | Uses accent colors for hover/focus/selected instead of primary. |

### ListItemProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| href | `string` | — | When provided, renders the item as an anchor element. |
| selected | `boolean` | — | Marks the item as selected for styling. |
| shortcut | `string` | — | Optional shortcut hint rendered on the trailing edge. |
| destructive | `boolean` | — | Applies destructive styling to the item. |

## Notes

- Items render as `<button>` by default, or `<a>` when `href` is provided.
- Selected items automatically use the foreground color as background with contrast-aware text — works in both light and dark mode.
- Use `variant="nav"` on the List for sidebar-style navigation with softer accent hover colors.
- Supports keyboard navigation with arrow keys when focused.
- Uses the same item styles as DropdownMenuItem and ComboboxOption.

---

_Source: `src/components/list/index.tsx`
