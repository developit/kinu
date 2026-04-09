# Listbox

Non-modal filterable list for inline search and selection. Like Combobox but always visible.

## Usage

```tsx
import {Item, Listbox, ListboxInput, ListboxList} from 'kinu';

<Listbox>
  <ListboxInput placeholder="Filter..." />
  <ListboxList>
    <Item>Apple</Item>
    <Item>Banana</Item>
  </ListboxList>
</Listbox>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Listbox | Outer container | `<div k="listbox">` |
| ListboxInput | Filter input | `<input k="listbox-input">` |
| ListboxList | Options container | `<div k="listbox-list">` |
| Listbox.Item | Alias of Item | `<button k="item">` |

## Props

### ListboxInputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string | number | readonly string[] | undefined` | — | Input value for controlled usage. |
| placeholder | `string` | — | Placeholder text for the input. |
| onInput | `(event: InputEvent) => void` | — | Change handler for controlled inputs. |
| disabled | `boolean` | — | Disable the input. |

### Item Props

See the [Item](/docs/item) docs for the full prop reference.

## Notes

- Selection state is developer-controlled — set `selected` on items yourself via `onClick`.
- Filtering only shows/hides items; it does not change selection.
- Shares filtering logic with Combobox via the `filterItems` utility.
- Unlike Combobox, the list is always visible (no dialog/popover).
- Arrow keys navigate items while the input is focused.
- Compose with Dialog to build a command palette.

---

_Source: `src/components/listbox/index.tsx`
