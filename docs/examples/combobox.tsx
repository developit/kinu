import {Combobox, ComboboxInput, ComboboxList, Item} from 'kinu';

export function Demo() {
  return (
    <Combobox>
      <ComboboxInput />
      <ComboboxList>
        <Item>Apple</Item>
        <Item>Banana</Item>
        <Item>Orange</Item>
      </ComboboxList>
    </Combobox>
  );
}

export const code = `<Combobox>...</Combobox>`;

export default {Demo, code};
