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

### Static Shortcuts

- `List.Item = Item`

## Notes

- Items render as `<button>` by default, or `<a>` when href is provided.
- Use variant="nav" for sidebar-style navigation with softer accent colors.
- Shares the same item styles as DropdownMenuItem and ComboboxOption.

---

_Source: `src/components/list/index.tsx`
