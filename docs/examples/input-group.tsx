import {Button, Input, InputGroup} from 'pui';

export function Demo() {
  return (
    <div style={{display: 'grid', gap: '1rem'}}>
      <InputGroup>
        <Input placeholder="Search docs" />
        <Button>Search</Button>
      </InputGroup>

      <InputGroup>
        <legend>https://</legend>
        <Input placeholder="your-site.com" />
      </InputGroup>
    </div>
  );
}

export const code = `<InputGroup>\n  <Input placeholder="Search docs" />\n  <Button>Search</Button>\n</InputGroup>`;

export default {Demo, code};
