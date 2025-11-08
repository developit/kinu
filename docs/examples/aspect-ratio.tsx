import {AspectRatio} from 'pui';

export function Demo() {
  return (
    <AspectRatio
      ratio={16 / 9}
      style={{
        backgroundColor: 'hsl(var(--p-muted))',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>16:9 Aspect Ratio</span>
    </AspectRatio>
  );
}

export const code = `<AspectRatio ratio={16/9}>...</AspectRatio>`;

export default {Demo, code};
