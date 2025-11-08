const o=`# Combobox

Autocomplete input with trigger, list, and option primitives.

## Usage

\`\`\`tsx
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption} from 'pui';

<Combobox value={value} onChange={setValue}>
  <ComboboxInput />
  <ComboboxList>
    <ComboboxOption value="1">One</ComboboxOption>
  </ComboboxList>
</Combobox>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| Combobox | \`<span>\` | Root wrapper that provides context for the input, list, and options. |
| ComboboxInput | \`<input>\` | Text field that filters and toggles the option list. |
| ComboboxList | \`<dialog>\` | Dialog surface that displays the available options. |
| ComboboxOption | \`<button>\` | Button representing a selectable option. |

## Attributes

Inherits all native attributes from \`<span>\`. No additional styling attributes are required.

## Notes

- Uses command/commandfor attributes for disclosure logic.
- Keep option counts manageable for usability.

---

<source-ref src="src/components/combobox/index.tsx"></source-ref>
`;export{o as default};
//# sourceMappingURL=combobox-D47gEQlb.js.map
