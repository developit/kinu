import {Resizable} from 'kinu';

export function Demo() {
  return (
    <Resizable style={{width: '150px', height: '80px'}}>Resize me</Resizable>
  );
}

export const code = `<Resizable>Resize me</Resizable>`;

export default {Demo, code};
