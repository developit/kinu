import {Label, Slider} from 'pui';
import {useState} from 'preact/hooks';

export function Demo() {
  const [slider, setSlider] = useState(50);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Label>Value: {slider}</Label>
      <Slider
        min={0}
        max={100}
        value={slider}
        onInput={(e: Event) =>
          setSlider(Number((e.target as HTMLInputElement).value))
        }
      />
      <Slider min={0} max={100} value={25} disabled />
    </div>
  );
}

export const code = `<Slider min={0} max={100} />`;

export default {Demo, code};
