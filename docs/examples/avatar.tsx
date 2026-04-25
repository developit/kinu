import {Avatar} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <Avatar src="https://github.com/developit.png" alt="Profile" />
        <Avatar>JD</Avatar>
        <Avatar size="sm">SM</Avatar>
        <Avatar size="lg">LG</Avatar>
      </div>
      <Avatar.Group>
        <Avatar src="https://github.com/developit.png" alt="JM" />
        <Avatar>JD</Avatar>
        <Avatar>AS</Avatar>
        <Avatar>+3</Avatar>
      </Avatar.Group>
    </div>
  );
}

export const code = `<Avatar.Group>\n  <Avatar src="..." />\n  <Avatar>JD</Avatar>\n  <Avatar>+3</Avatar>\n</Avatar.Group>`;

export default {Demo, code};
