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

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ComboboxInput | Search input | \`<input p="combobox-input">\` |
| ComboboxList | Results list | \`<dialog p="combobox-list">\` |
| ComboboxOption | Result option | \`<button p="combobox-option">\` |
| Combobox | Autocomplete input | — |

## Props

### ComboboxInputProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | \`JSX.IntrinsicElements\` | — | Input value for controlled usage. |
| placeholder | \`string\` | — | Placeholder text for the input. |
| onInput | \`JSX.IntrinsicElements\` | — | Change handler for controlled inputs. |
| disabled | \`boolean\` | — | Disable the input. |

### ComboboxOptionProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| selected | \`boolean\` | — | Marks the option as selected for styling. |

## Notes

- Uses command/commandfor attributes for disclosure logic.
- Keep option counts manageable for usability.

---

_Source: \`src/components/combobox/index.tsx\`
`;export{o as default};
//# sourceMappingURL=combobox-jws__T8L.js.map
