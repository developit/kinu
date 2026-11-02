import {Rating} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Rating name="demo-interactive" value={3} />
      <Rating name="demo-readonly" value={4} readOnly />
      <Rating name="demo-large" value={5} size="lg" />
    </div>
  );
}

export const code = `<Rating name="rating" value={3} />
<Rating name="score" value={4} readOnly />`;

export default {Demo, code};
