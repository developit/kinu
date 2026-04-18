# Listbox

Non-modal filterable list for inline search and selection.

## Usage

```tsx
import {Listbox, ListboxInput, ListboxList, ListboxOption} from 'kinu';

<Listbox>
  <ListboxInput placeholder="Filter..." />
  <ListboxList>
    <ListboxOption>Apple</ListboxOption>
  </ListboxList>
</Listbox>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ListboxInput | Component | `<input k="listbox-input">` |
| ListboxList | Component | `<div k="listbox-list">` |
| ListboxOption | Component | Alias of Item |
| Listbox | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string | number | readonly string[] | undefined` | — | Input value for controlled usage. |
| placeholder | `string` | — | Placeholder text for the input. |
| onInput | `(event: InputEvent) => void` | — | Change handler for controlled inputs. |
| disabled | `boolean` | — | Disable the input. |

### Static Shortcuts

- `Listbox.Input = ListboxInput`
- `Listbox.List = ListboxList`
- `Listbox.Option = Item`

## Notes

- Selection is developer-controlled via the selected attribute on options.
- Shares filtering logic with Combobox via the filterItems utility.
- Unlike Combobox, the list is always visible with no dialog or popover.
- Compose with Dialog to build a command palette.

---

_Source: `src/components/listbox/index.tsx`
