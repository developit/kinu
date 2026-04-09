import {Chip, ChipButton} from 'kinu';
import {useState} from 'preact/hooks';

const initial = ['React', 'Preact', 'Vue', 'Svelte'];

export function Demo() {
  const [tags, setTags] = useState(initial);
  return (
    <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
      {tags.map((tag) => (
        <Chip key={tag}>
          {tag}
          <ChipButton onClick={() => setTags(tags.filter((t) => t !== tag))}>
            x
          </ChipButton>
        </Chip>
      ))}
      <Chip variant="secondary">TypeScript</Chip>
      <Chip variant="destructive">Deprecated</Chip>
      <Chip variant="outline">Draft</Chip>
    </div>
  );
}

export const code = `<Chip>
  React
  <ChipButton onClick={onRemove}>x</ChipButton>
</Chip>
<Chip variant="secondary">TypeScript</Chip>
<Chip variant="destructive">Deprecated</Chip>
<Chip variant="outline">Draft</Chip>`;

export default {Demo, code};
