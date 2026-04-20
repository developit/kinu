import {Status} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Status tone="online">Online</Status>
      <Status tone="away">Away</Status>
      <Status tone="busy">Busy</Status>
      <Status tone="offline">Offline</Status>
      <Status>Unknown</Status>
    </div>
  );
}

export const code = `<Status tone="online">Online</Status>
<Status tone="away">Away</Status>
<Status tone="busy">Busy</Status>
<Status tone="offline">Offline</Status>
<Status>Unknown</Status>`;

export default {Demo, code};
