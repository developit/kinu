import {Toggle} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [toggle, setToggle] = useState(false);
  return (
    <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
      <Toggle pressed={toggle} onClick={() => setToggle((v) => !v)}>
        Bold
      </Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  );
}

export const code = `<Toggle>Bold</Toggle>`;

export default {Demo, code};
