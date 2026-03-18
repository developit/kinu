import {Checkbox, Label} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Checkbox
          id="agree"
          checked={checked}
          onInput={(e) => setChecked((e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="agree" style={{paddingInlineStart: '0.5rem'}}>I agree to the terms and conditions</Label>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" style={{paddingInlineStart: '0.5rem'}}>Disabled checkbox</Label>
      </div>
    </div>
  );
}

export const code = `<Checkbox />`;

export default {Demo, code};
