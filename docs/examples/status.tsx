import {Status} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
      {/* With label */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <Status variant="success">Online</Status>
        <Status variant="warning">Away</Status>
        <Status variant="info">Syncing</Status>
        <Status variant="destructive">Error</Status>
        <Status>Offline</Status>
      </div>

      {/* Animated ping for live states */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <Status pulse variant="success">Live</Status>
        <Status pulse variant="info">Recording</Status>
      </div>

      {/* Bare dot — aria-label is announced to screen readers AND
          shown as a tooltip on hover/focus. */}
      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
        <Status variant="success" aria-label="Online" />
        <Status variant="warning" aria-label="Away" />
        <Status variant="info" aria-label="Syncing" />
        <Status variant="destructive" aria-label="Error" />
        <Status aria-label="Offline" />
        <Status pulse variant="success" aria-label="Live" />
      </div>

      {/* Scales with surrounding font-size */}
      <div style={{fontSize: '1.5rem'}}>
        <Status variant="success">Scales with text</Status>
      </div>
    </div>
  );
}

export const code = `{/* With a label */}
<Status variant="success">Online</Status>
<Status pulse variant="success">Live</Status>

{/* Bare dot — aria-label drives both screen-reader text AND
    the on-hover tooltip, so sighted users see what SR users hear. */}
<Status variant="success" aria-label="Online" />

{/* Dot and gap scale with surrounding font-size (em-based). */}
<div style={{fontSize: '1.5rem'}}>
  <Status variant="success">Scales with text</Status>
</div>`;

export default {Demo, code};
