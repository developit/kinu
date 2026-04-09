import {Item} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.125rem', width: '14rem'}}>
      <Item selected={selected === 'a'} onClick={() => setSelected('a')}>Default</Item>
      <Item selected={selected === 'b'} onClick={() => setSelected('b')} shortcut="⌘K">With shortcut</Item>
      <Item href="/docs">Link item</Item>
      <Item destructive>Destructive</Item>
      <Item disabled>Disabled</Item>
    </div>
  );
}

export const code = `<Item selected>Default</Item>
<Item shortcut="⌘K">With shortcut</Item>
<Item href="/docs">Link item</Item>
<Item destructive>Destructive</Item>`;

export default {Demo, code};
