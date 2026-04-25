import {Alert} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Alert>
        <strong>Heads up:</strong> This is a default alert.
      </Alert>
      <Alert variant="info">
        <strong>Info:</strong> A new version is available.
      </Alert>
      <Alert variant="success">
        <strong>Success:</strong> Your changes have been saved.
      </Alert>
      <Alert variant="warning">
        <strong>Warning:</strong> Your session will expire soon.
      </Alert>
      <Alert variant="destructive">
        <strong>Error:</strong> Something went wrong.
      </Alert>
    </div>
  );
}

export const code = `<Alert variant="info">Heads up</Alert>`;

export default {Demo, code};
