# Listbox

Non-modal filterable list for inline search and selection. Like Combobox but always visible.

## Usage

```tsx
import {Listbox, ListboxInput, ListboxList, ListboxOption} from 'kinu';

<Listbox>
  <ListboxInput placeholder="Filter..." />
  <ListboxList>
    <ListboxOption>Apple</ListboxOption>
    <ListboxOption>Banana</ListboxOption>
    <ListboxOption>Cherry</ListboxOption>
  </ListboxList>
</Listbox>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Listbox | Outer container | `<div k="listbox">` |
| ListboxInput | Filter input | `<input k="listbox-input">` |
| ListboxList | Options container | `<div k="listbox-list">` |
| ListboxOption | Selectable option | `<button k="listbox-option">` |
| Listbox.Input | Alias of ListboxInput | — |
| Listbox.List | Alias of ListboxList | — |
| Listbox.Option | Alias of ListboxOption | — |

## Props

### ListboxInputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string | number | readonly string[] | undefined` | — | Input value for controlled usage. |
| placeholder | `string` | — | Placeholder text for the input. |
| onInput | `(event: InputEvent) => void` | — | Change handler for controlled inputs. |
| disabled | `boolean` | — | Disable the input. |

### ListboxOptionProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| selected | `boolean` | — | Marks the option as selected for styling. |
| shortcut | `string` | — | Optional shortcut hint rendered on the trailing edge. |
| destructive | `boolean` | — | Applies destructive styling to the option. |

## Notes

- Selection state is developer-controlled — set `selected` on options yourself via `onClick`.
- Filtering only shows/hides options; it does not change selection.
- Shares filtering logic with Combobox via the `filterItems` utility.
- Unlike Combobox, the list is always visible (no dialog/popover).
- Arrow keys navigate options while the input is focused.
- Compose with Dialog to build a command palette.

---

_Source: `src/components/listbox/index.tsx`
