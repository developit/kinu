import {Chip} from 'kinu';
import {useState} from 'preact/hooks';

const initial = ['React', 'Preact', 'Vue', 'Svelte'];

export function Demo() {
  const [tags, setTags] = useState(initial);
  const [active, setActive] = useState<string | null>(null);
  return (
    <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center'}}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          selected={active === tag}
          onClick={() => setActive(active === tag ? null : tag)}
        >
          {tag}
          <Chip.Button onClick={() => setTags(tags.filter((t) => t !== tag))}>
            ×
          </Chip.Button>
        </Chip>
      ))}
      <Chip variant="primary">Primary</Chip>
      <Chip variant="destructive">Destructive</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  );
}

export const code = `<Chip selected onClick={toggle}>
  React
  <Chip.Button onClick={onRemove}>×</Chip.Button>
</Chip>`;

export default {Demo, code};
