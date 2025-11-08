import {Badge} from 'pui';

export function Demo() {
  return (
    <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

export const code = `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`;

export default {Demo, code};
