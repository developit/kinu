import {Grid, Stat} from 'kinu';

export function Demo() {
  return (
    <Grid gap="md" min="sm">
      <Stat>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value>$48,200</Stat.Value>
        <Stat.Delta trend="up">+12.5% vs last month</Stat.Delta>
      </Stat>
      <Stat>
        <Stat.Label>Churn</Stat.Label>
        <Stat.Value>1.2%</Stat.Value>
        <Stat.Delta trend="down">−0.3% vs last month</Stat.Delta>
      </Stat>
      <Stat>
        <Stat.Label>Active users</Stat.Label>
        <Stat.Value>12,840</Stat.Value>
        <Stat.Delta trend="flat">No change</Stat.Delta>
      </Stat>
    </Grid>
  );
}

export const code = `<Stat>
  <Stat.Label>Revenue</Stat.Label>
  <Stat.Value>$48,200</Stat.Value>
  <Stat.Delta trend="up">+12.5%</Stat.Delta>
</Stat>`;

export default {Demo, code};
