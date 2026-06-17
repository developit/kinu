import {Badge, Button, Cluster} from 'kinu';

export function Demo() {
  return (
    <Cluster gap="sm">
      <Badge>React</Badge>
      <Badge variant="secondary">Preact</Badge>
      <Badge variant="outline">Solid</Badge>
      <Badge variant="secondary">Svelte</Badge>
      <Button size="sm" variant="outline">
        + Add
      </Button>
    </Cluster>
  );
}

export const code = `<Cluster gap="sm">
  <Badge>React</Badge>
  <Badge variant="secondary">Preact</Badge>
  <Button size="sm" variant="outline">+ Add</Button>
</Cluster>`;

export default {Demo, code};
