# List

Interactive selectable list. Items are the generic `Item` component — the same one used in DropdownMenu, Combobox, and everywhere else.

## Usage

```tsx
import {Item, List} from 'kinu';

<List>
  <Item selected>Inbox</Item>
  <Item>Drafts</Item>
  <Item>Sent</Item>
</List>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| List | List container | `<div k="list">` |
| List.Item | Alias of Item | `<button k="item">` or `<a k="item">` |

## Props

### ListProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `"nav"` | — | Uses accent colors for hover/focus/selected instead of primary. |

### Item Props

See the [Item](/docs/item) docs for the full prop reference.

## Notes

- Selected items automatically use the foreground color as background with contrast-aware text — works in both light and dark mode.
- Use `variant="nav"` on the List for sidebar-style navigation with softer accent hover colors.
- Supports keyboard navigation with arrow keys when focused.

---

_Source: `src/components/list/index.tsx`
