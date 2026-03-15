import {Alert} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Alert>
        <strong>Info:</strong> This is an informational alert.
      </Alert>
      <Alert variant="destructive">
        <strong>Error:</strong> Something went wrong.
      </Alert>
    </div>
  );
}

export const code = `<Alert>Info</Alert>`;

export default {Demo, code};
