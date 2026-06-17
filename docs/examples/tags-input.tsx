import {TagsInput} from 'kinu';

export function Demo() {
  return (
    <div style={{maxWidth: '24rem'}}>
      <TagsInput
        name="tags"
        value={['design', 'frontend']}
        placeholder="Add a tag and press Enter…"
      />
    </div>
  );
}

export const code = `<TagsInput
  name="tags"
  value={['design', 'frontend']}
  placeholder="Add a tag…"
/>`;

export default {Demo, code};
