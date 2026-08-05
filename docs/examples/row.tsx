import {Button, Row} from 'kinu';

export function Demo() {
  return (
    <Row gap="sm" justify="between">
      <strong>Project settings</strong>
      <Row gap="sm">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </Row>
    </Row>
  );
}

export const code = `<Row gap="sm" justify="between">
  <strong>Title</strong>
  <Row gap="sm">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </Row>
</Row>`;

export default {Demo, code};
