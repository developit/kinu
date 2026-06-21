import {Avatar, Badge, Button, Indicator} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
      <Indicator>
        <Avatar alt="JM" />
        <Badge variant="destructive">3</Badge>
      </Indicator>
      <Indicator dot>
        <Button variant="outline">Inbox</Button>
      </Indicator>
    </div>
  );
}

export const code = `<Indicator>
  <Avatar alt="JM" />
  <Badge variant="destructive">3</Badge>
</Indicator>

<Indicator dot>
  <Button variant="outline">Inbox</Button>
</Indicator>`;

export default {Demo, code};
