import {Button, Input, InputGroup, Select} from 'pui';

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

      <InputGroup>
        <Select defaultValue="all" aria-label="Filter scope">
          <option value="all">All docs</option>
          <option value="components">Components</option>
          <option value="foundations">Foundations</option>
        </Select>
        <Button variant="outline">Apply</Button>
      </InputGroup>
    </div>
  );
}

export const code = `<InputGroup>\n  <Input placeholder="Search docs" />\n  <Button variant="outline">Search</Button>\n</InputGroup>`;

export default {Demo, code};
