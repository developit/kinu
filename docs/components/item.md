# Item

Generic selectable item for lists, menus, comboboxes, and more.

## Usage

```tsx
import {Item} from 'kinu';

<Item selected>Inbox</Item>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Item | Component | `p="item"` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| href | `string` | — | When provided, renders the item as an anchor element. |
| selected | `boolean` | — | Marks the item as selected for styling. |
| shortcut | `string` | — | Optional shortcut hint rendered on the trailing edge. |
| destructive | `boolean` | — | Applies destructive styling to the item. |

## Notes

- Renders as <button> by default, or <a> when href is provided.
- The same component works in every list-like context: List, Listbox, DropdownMenu, ContextMenu, Combobox.
- Also available as .Item on parent components (e.g. DropdownMenu.Item).

---

_Source: `src/components/item/index.tsx`
