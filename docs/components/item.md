# Item

Generic selectable item used across all list-like containers: List, Listbox, DropdownMenu, ContextMenu, and Combobox.

## Usage

```tsx
import {Item} from 'kinu';

<Item selected>Inbox</Item>
<Item href="/settings">Settings</Item>
<Item shortcut="⌘K">Command Palette</Item>
<Item destructive>Delete</Item>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Item | Selectable item | `<button k="item">` or `<a k="item">` |

Also available as `.Item` on parent components: `List.Item`, `Listbox.Item`, `DropdownMenu.Item`, `ContextMenu.Item`, `Combobox.Item`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| href | `string` | — | When provided, renders the item as an anchor element. |
| selected | `boolean` | — | Marks the item as selected for styling. |
| shortcut | `string` | — | Shortcut hint rendered on the trailing edge via CSS `::after`. |
| destructive | `boolean` | — | Applies destructive (red) styling to the item. |
| value | `string` | — | Native button value attribute. Used by Combobox to get the selection value. |

## Notes

- Renders as `<button>` by default, or `<a>` when `href` is provided.
- The same component works in every context — the parent container determines the styling and behavior.
- The `shortcut` attribute is pure CSS (no JS), rendered via `::after`.
- Keyboard navigation (arrow keys, Enter) is handled by the parent container.
- In a List, selected items use foreground/background contrast. In menus, they use primary color.

---

_Source: `src/components/item/index.tsx`
