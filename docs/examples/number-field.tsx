import {NumberField} from 'kinu';

export function Demo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '14rem',
      }}
    >
      <NumberField defaultValue={3} min={0} max={10} />
      <NumberField defaultValue={1.5} min={0} max={5} step={0.5} />
    </div>
  );
}

export const code = `<NumberField defaultValue={3} min={0} max={10} />`;

export default {Demo, code};
