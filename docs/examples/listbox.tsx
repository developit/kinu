import {Listbox, ListboxInput, ListboxList, ListboxOption, Separator} from 'kinu';
import {useState} from 'preact/hooks';

const fruits = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry', 'Fig'];

export function Demo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Listbox style={{width: '16rem'}}>
      <ListboxInput placeholder="Search fruits..." />
      <ListboxList>
        {fruits.map((fruit) => (
          <ListboxOption
            key={fruit}
            selected={selected === fruit}
            onClick={() => setSelected(fruit)}
          >
            {fruit}
          </ListboxOption>
        ))}
      </ListboxList>
    </Listbox>
  );
}

export const code = `<Listbox>
  <ListboxInput placeholder="Search fruits..." />
  <ListboxList>
    <ListboxOption selected={sel === 'Apple'} onClick={() => setSel('Apple')}>
      Apple
    </ListboxOption>
  </ListboxList>
</Listbox>`;

export default {Demo, code};
