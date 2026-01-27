import {Switch} from 'pui';
import {useState} from 'preact/hooks';

export function Demo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
      <Switch
        checked={enabled}
        onInput={(e) => setEnabled((e.target as HTMLInputElement).checked)}
      />
      <span>{enabled ? 'On' : 'Off'}</span>
    </div>
  );
}

export const code = `<Switch />`;

export default {Demo, code};
