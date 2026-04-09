import {Listbox, ListboxInput, ListboxList, ListboxOption, Separator} from 'kinu';

export function Demo() {
  return (
    <Listbox style={{width: '16rem'}}>
      <ListboxInput placeholder="Search fruits..." />
      <ListboxList>
        <ListboxOption>Apple</ListboxOption>
        <ListboxOption>Banana</ListboxOption>
        <ListboxOption>Cherry</ListboxOption>
        <Separator />
        <ListboxOption>Dragonfruit</ListboxOption>
        <ListboxOption>Elderberry</ListboxOption>
        <ListboxOption>Fig</ListboxOption>
      </ListboxList>
    </Listbox>
  );
}

export const code = `<Listbox>
  <ListboxInput placeholder="Search fruits..." />
  <ListboxList>
    <ListboxOption>Apple</ListboxOption>
    <ListboxOption>Banana</ListboxOption>
    <ListboxOption>Cherry</ListboxOption>
  </ListboxList>
</Listbox>`;

export default {Demo, code};
