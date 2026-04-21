import {Button, Collapsible} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Button onClick={() => setCollapsed(!collapsed)} variant="outline">
        {collapsed ? 'Show' : 'Hide'} Details
      </Button>
      <Collapsible open={!collapsed}>
        <div style={{padding: '1rem 0'}}>
          <p>This content can be collapsed and expanded.</p>
          <p>It's useful for showing/hiding additional information.</p>
        </div>
      </Collapsible>
    </div>
  );
}

export const code = `<Collapsible open>...</Collapsible>`;

export default {Demo, code};
