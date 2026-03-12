import {Tab, TabList, TabPanel} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [tab, setTab] = useState<'first' | 'second'>('first');
  return (
    <div>
      <TabList>
        <Tab aria-selected={tab === 'first'} onClick={() => setTab('first')}>
          First
        </Tab>
        <Tab aria-selected={tab === 'second'} onClick={() => setTab('second')}>
          Second
        </Tab>
      </TabList>
      {tab === 'first' && <TabPanel>Content for first tab.</TabPanel>}
      {tab === 'second' && <TabPanel>Second tab panel.</TabPanel>}
    </div>
  );
}

export const code = `<TabList>...</TabList>`;

export default {Demo, code};
