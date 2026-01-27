import {Combobox, ComboboxInput, ComboboxList, ComboboxOption} from 'pui';

export function Demo() {
  return (
    <Combobox>
      <ComboboxInput />
      <ComboboxList>
        <ComboboxOption>Apple</ComboboxOption>
        <ComboboxOption>Banana</ComboboxOption>
        <ComboboxOption>Orange</ComboboxOption>
      </ComboboxList>
    </Combobox>
  );
}

export const code = `<Combobox>...</Combobox>`;

export default {Demo, code};
