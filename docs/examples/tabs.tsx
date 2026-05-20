import {Tab, TabPanel, Tabs} from 'kinu';

export function Demo() {
  return (
    <Tabs>
      <Tab checked>Overview</Tab>
      <TabPanel>Content for the Overview tab.</TabPanel>
      <Tab>Details</Tab>
      <TabPanel>Details panel content.</TabPanel>
    </Tabs>
  );
}

export const code = `<Tabs>
  <Tab checked>Overview</Tab>
  <TabPanel>...</TabPanel>
  <Tab>Details</Tab>
  <TabPanel>...</TabPanel>
</Tabs>`;

export default {Demo, code};
