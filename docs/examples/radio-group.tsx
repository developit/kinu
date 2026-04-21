import {Label, Radio, RadioGroup} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [radio, setRadio] = useState('option1');
  return (
    <RadioGroup>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Radio
          id="option1"
          name="options"
          value="option1"
          checked={radio === 'option1'}
          onInput={() => setRadio('option1')}
        />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Radio
          id="option2"
          name="options"
          value="option2"
          checked={radio === 'option2'}
          onInput={() => setRadio('option2')}
        />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Radio
          id="option3"
          name="options"
          value="option3"
          checked={radio === 'option3'}
          onInput={() => setRadio('option3')}
        />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  );
}

export const code = `<RadioGroup>...</RadioGroup>`;

export default {Demo, code};
