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
| ComboboxInput | `<input>` | Wraps `<input>` and sets `p="combobox-input"`. Defaults props to `{}`. Attaches a ref callback for additional behaviour. |
| ComboboxList | `<dialog>` | Wraps `<dialog>` and sets `p="combobox-list"`. Defaults props to `{
    onMouseDown: (e) => e.preventDefault(),
    onClick: (e) => e.currentTarget.close(),
  }`. |
| ComboboxOption | `<button>` | Wraps `<button>` and sets `p="combobox-option"`. Defaults props to `{
    tabIndex: -1,
  }`. Attaches a ref callback for additional behaviour. |
| Combobox | — | Custom component implemented in the source file. |

## Props

### ComboboxInputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `JSX.IntrinsicElements` | — | Input value for controlled usage. |
| placeholder | `string` | — | Placeholder text for the input. |
| onInput | `JSX.IntrinsicElements` | — | Change handler for controlled inputs. |
| disabled | `boolean` | — | Disable the input. |

### ComboboxOptionProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| selected | `boolean` | — | Marks the option as selected for styling. |

## Attributes

Inherits all native attributes from `<input>`. No additional styling attributes are required.

## Notes

- Uses command/commandfor attributes for disclosure logic.
- Keep option counts manageable for usability.

---

_Source: `src/components/combobox/index.tsx`
