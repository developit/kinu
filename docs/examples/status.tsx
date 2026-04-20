import {Status} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Status tone="success">Online</Status>
      <Status tone="warning">Away</Status>
      <Status tone="info">Syncing</Status>
      <Status tone="destructive">Error</Status>
      <Status>Offline</Status>
    </div>
  );
}

export const code = `<Status tone="success">Online</Status>
<Status tone="warning">Away</Status>
<Status tone="info">Syncing</Status>
<Status tone="destructive">Error</Status>
<Status>Offline</Status>`;

export default {Demo, code};
