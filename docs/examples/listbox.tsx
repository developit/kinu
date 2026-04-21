import {Item, Listbox, ListboxInput, ListboxList} from 'kinu';
import {useState} from 'preact/hooks';

const fruits = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry', 'Fig'];

export function Demo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Listbox style={{width: '16rem'}}>
      <ListboxInput placeholder="Search fruits..." />
      <ListboxList>
        {fruits.map((fruit) => (
          <Item
            key={fruit}
            selected={selected === fruit}
            onClick={() => setSelected(fruit)}
          >
            {fruit}
          </Item>
        ))}
      </ListboxList>
    </Listbox>
  );
}

export const code = `<Listbox>
  <ListboxInput placeholder="Search fruits..." />
  <ListboxList>
    <Item selected={sel === 'Apple'} onClick={() => setSel('Apple')}>
      Apple
    </Item>
  </ListboxList>
</Listbox>`;

export default {Demo, code};
