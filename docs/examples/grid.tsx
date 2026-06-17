import {Card, Grid} from 'kinu';

export function Demo() {
  return (
    <Grid gap="md" min="sm">
      <Card>
        <h3>Revenue</h3>
        <p>$48,200</p>
      </Card>
      <Card>
        <h3>Active users</h3>
        <p>12,840</p>
      </Card>
      <Card>
        <h3>Churn</h3>
        <p>1.2%</p>
      </Card>
      <Card>
        <h3>NPS</h3>
        <p>62</p>
      </Card>
    </Grid>
  );
}

export const code = `<Grid gap="md" min="sm">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</Grid>`;

export default {Demo, code};
