import {Tab, TabLabel, TabPanel, Tabs} from 'kinu';

export function Demo() {
  return (
    <Tabs>
      <Tab name="t" open>
        <TabLabel>Overview</TabLabel>
        <TabPanel>Content for the Overview tab.</TabPanel>
      </Tab>
      <Tab name="t">
        <TabLabel>Details</TabLabel>
        <TabPanel>Details panel content.</TabPanel>
      </Tab>
    </Tabs>
  );
}

export const code = `<Tabs>
  <Tab name="t" open>
    <TabLabel>Overview</TabLabel>
    <TabPanel>...</TabPanel>
  </Tab>
  <Tab name="t">
    <TabLabel>Details</TabLabel>
    <TabPanel>...</TabPanel>
  </Tab>
</Tabs>`;

export default {Demo, code};
