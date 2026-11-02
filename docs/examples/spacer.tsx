import {Button, Row, Spacer} from 'kinu';

export function Demo() {
  return (
    <Row
      style={{
        border: '1px dashed hsl(var(--k-border))',
        borderRadius: 'var(--k-radius)',
        padding: '0.5rem',
      }}
    >
      <Button variant="outline" size="sm">
        Back
      </Button>
      <Spacer />
      <Button size="sm">Next</Button>
    </Row>
  );
}

export const code = `<Row>
  <Button>Back</Button>
  <Spacer />
  <Button>Next</Button>
</Row>`;

export default {Demo, code};
