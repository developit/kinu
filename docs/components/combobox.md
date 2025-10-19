# Combobox

Autocomplete input with trigger, list, and option primitives.

## Usage

```tsx
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption} from 'pui';

<Combobox value={value} onChange={setValue}>
  <ComboboxInput />
  <ComboboxList>
    <ComboboxOption value="1">One</ComboboxOption>
  </ComboboxList>
</Combobox>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Combobox | `<span>` | Wraps `<span>` and sets p="combobox". Defaults props to {}. Attaches a ref callback for additional behaviour. |
| ComboboxInput | `<input>` | Wraps `<input>` and sets p="combobox-input". Defaults props to {}. Attaches a ref callback for additional behaviour. |
| ComboboxList | `<dialog>` | Wraps `<dialog>` and sets p="combobox-list". Defaults props to {
  onMouseDown: (e) => e.preventDefault(),
  onClick: (e) => e.currentTarget.close(),
}. |
| ComboboxOption | `<button>` | Wraps `<button>` and sets p="combobox-option". Defaults props to {
    tabIndex: -1,
  }. Attaches a ref callback for additional behaviour. |

### Static Shortcuts

- `Combobox.Input = ComboboxInput`
- `Combobox.List = ComboboxList`
- `Combobox.Option = ComboboxOption`

## Attributes

Inherits all native attributes from `<span>`. No additional styling attributes are required.

## Notes

- Uses command/commandfor attributes for disclosure logic.
- Keep option counts manageable for usability.

---

_Source: `src/components/combobox/index.tsx`
