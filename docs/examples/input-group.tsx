import {Button, Input, InputGroup} from 'pui';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <InputGroup>
        <Input placeholder="Search docs" />
        <Button variant="outline">Search</Button>
      </InputGroup>

      <InputGroup>
        <legend>@</legend>
        <Input placeholder="username" />
      </InputGroup>
    </div>
  );
}

export const code = `<InputGroup>\n  <Input placeholder="Search docs" />\n  <Button variant="outline">Search</Button>\n</InputGroup>`;

export default {Demo, code};
