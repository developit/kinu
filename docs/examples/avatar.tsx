import {Avatar} from 'pui';

export function Demo() {
  return (
    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
      <Avatar src="https://github.com/developit.png" alt="Profile" />
      <Avatar>JD</Avatar>
      <Avatar size="sm">SM</Avatar>
      <Avatar size="lg">LG</Avatar>
    </div>
  );
}

export const code = `<Avatar src="..." />`;

export default {Demo, code};
