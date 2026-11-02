import {Center} from 'kinu';

export function Demo() {
  return (
    <Center
      style={{
        height: '10rem',
        border: '1px dashed hsl(var(--k-border))',
        borderRadius: 'var(--k-radius)',
      }}
    >
      <span>Perfectly centered</span>
    </Center>
  );
}

export const code = `<Center style={{height: '10rem'}}>
  <span>Perfectly centered</span>
</Center>`;

export default {Demo, code};
