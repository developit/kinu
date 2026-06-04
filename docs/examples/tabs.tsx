import {Tab, TabList, TabPanel} from 'kinu';

export function Demo() {
  return (
    <div>
      <TabList>
        <Tab defaultChecked>First</Tab>
        <Tab>Second</Tab>
      </TabList>
      <TabPanel>Content for first tab.</TabPanel>
      <TabPanel>Second tab panel.</TabPanel>
    </div>
  );
}

export const code = `<TabList>
  <Tab defaultChecked>First</Tab>
  <Tab>Second</Tab>
</TabList>
<TabPanel>Content for first tab.</TabPanel>
<TabPanel>Second tab panel.</TabPanel>`;

export default {Demo, code};
