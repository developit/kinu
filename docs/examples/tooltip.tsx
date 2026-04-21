import {Button, Tooltip} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
      <Tooltip title="Save">
        <Button size="icon">💾</Button>
      </Tooltip>
      <Tooltip title="Delete">
        <Button size="icon" variant="destructive">
          🗑
        </Button>
      </Tooltip>
    </div>
  );
}

export const code = `<Tooltip title="Save"><Button /></Tooltip>`;

export default {Demo, code};
