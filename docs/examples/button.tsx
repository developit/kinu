import {Button} from 'kinu';

export function Demo() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem',
        }}
      >
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🚀</Button>
      </div>
    </div>
  );
}

export const code = `<Button>Default</Button>`;

export default {Demo, code};
