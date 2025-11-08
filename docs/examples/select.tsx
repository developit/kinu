import {Label, Select} from 'pui';
import {useState} from 'preact/hooks';

export function Demo() {
  const [select, setSelect] = useState('apple');
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Label htmlFor="fruit">Choose a fruit</Label>
      <Select
        id="fruit"
        value={select}
        onInput={(e: Event) => setSelect((e.target as HTMLSelectElement).value)}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
        <option value="grape">Grape</option>
      </Select>
      <Select disabled>
        <option>Disabled select</option>
      </Select>
    </div>
  );
}

export const code = `<Select>...</Select>`;

export default {Demo, code};
