import {Status} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
      {/* With label */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <Status tone="success">Online</Status>
        <Status tone="warning">Away</Status>
        <Status tone="info">Syncing</Status>
        <Status tone="destructive">Error</Status>
        <Status>Offline</Status>
      </div>

      {/* Animated ping for live states */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <Status pulse tone="success">Live</Status>
        <Status pulse tone="info">Recording</Status>
      </div>

      {/* Bare dot — no label. Provide aria-label for screen readers. */}
      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
        <Status tone="success" aria-label="Online" />
        <Status tone="warning" aria-label="Away" />
        <Status tone="info" aria-label="Syncing" />
        <Status tone="destructive" aria-label="Error" />
        <Status aria-label="Offline" />
        <Status pulse tone="success" aria-label="Live" />
      </div>

      {/* Scales with surrounding font-size */}
      <div style={{fontSize: '1.5rem'}}>
        <Status tone="success">Scales with text</Status>
      </div>
    </div>
  );
}

export const code = `{/* With a label */}
<Status tone="success">Online</Status>
<Status pulse tone="success">Live</Status>

{/* Bare dot — no children. Provide aria-label for a11y. */}
<Status tone="success" aria-label="Online" />

{/* Dot and gap scale with surrounding font-size (em-based). */}
<div style={{fontSize: '1.5rem'}}>
  <Status tone="success">Scales with text</Status>
</div>`;

export default {Demo, code};
