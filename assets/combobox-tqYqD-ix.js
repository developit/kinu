const o=`# Combobox

Autocomplete input with trigger, list, and option primitives.

## Usage

\`\`\`tsx
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption} from 'pui';

<Combobox>
  <ComboboxInput placeholder="Search" />
  <ComboboxList>
    <ComboboxOption>One</ComboboxOption>
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
| value | \`string | number | readonly string[] | undefined\` | — | Input value for controlled usage. |
| placeholder | \`string\` | — | Placeholder text for the input. |
| onInput | \`(event: InputEvent) => void\` | — | Change handler for controlled inputs. |
| disabled | \`boolean\` | — | Disable the input. |

### ComboboxOptionProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| selected | \`boolean\` | — | Marks the option as selected for styling. |
| shortcut | \`string\` | — | Optional shortcut hint rendered on the trailing edge. |
| destructive | \`boolean\` | — | Applies destructive styling to the option. |

## Notes

- Uses command/commandFor attributes for disclosure logic.
- Keep option counts manageable for usability.

---

_Source: \`src/components/combobox/index.tsx\`
`;export{o as default};
//# sourceMappingURL=combobox-tqYqD-ix.js.map
