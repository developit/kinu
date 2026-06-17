import {CopyButton} from 'kinu';

export function Demo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <CopyButton value="npm install kinu" />
      <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
        <code
          id="copy-token"
          style={{
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--k-radius)',
            background: 'hsl(var(--k-muted))',
            fontSize: '0.875rem',
          }}
        >
          sk-live-1234
        </code>
        <CopyButton for="#copy-token" label="Copy key" copiedLabel="Copied!" />
      </div>
    </div>
  );
}

export const code = `<CopyButton value="npm install kinu" />

<code id="token">sk-live-1234</code>
<CopyButton for="#token" label="Copy key" />`;

export default {Demo, code};
