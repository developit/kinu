import {Separator} from 'pui';

export function Demo() {
  return (
    <div>
      <p>Content above separator</p>
      <Separator />
      <p>Content below separator</p>
    </div>
  );
}

export const code = `<Separator />`;

export default {Demo, code};
