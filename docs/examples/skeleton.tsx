import {Skeleton} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Skeleton style={{height: '1.5rem'}} />
      <Skeleton style={{height: '1.5rem', width: '60%'}} />
    </div>
  );
}

export const code = `<Skeleton style={{height: '1.5rem'}} />`;

export default {Demo, code};
