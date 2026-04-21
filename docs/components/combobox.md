# Combobox

Autocomplete input with trigger, list, and option primitives.

## Usage

```tsx
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption} from 'kinu';

<Combobox>
  <ComboboxInput placeholder="Search" />
  <ComboboxList>
    <ComboboxOption>One</ComboboxOption>
  </ComboboxList>
</Combobox>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ComboboxInput | Search input | `<input k="combobox-input">` |
| ComboboxList | Results list | `<dialog k="combobox-list">` |
| ComboboxOption | Result option | Alias of Item |
| Combobox | Autocomplete input | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string | number | readonly string[] | undefined` | — | Input value for controlled usage. |
| placeholder | `string` | — | Placeholder text for the input. |
| onInput | `(event: InputEvent) => void` | — | Change handler for controlled inputs. |
| disabled | `boolean` | — | Disable the input. |

### Static Shortcuts

- `Combobox.Input = ComboboxInput`
- `Combobox.List = ComboboxList`
- `Combobox.Option = Item`

## Notes

- Uses command/commandFor attributes for disclosure logic.
- Keep option counts manageable for usability.

---

_Source: `src/components/combobox/index.tsx`
