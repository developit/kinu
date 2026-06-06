import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Dialog} from '../components/dialog';
import {Drawer} from '../components/drawer';
import {Sheet} from '../components/sheet';
import {Sidebar} from '../components/sidebar';

describe('ssr smoke test', () => {
  it('renders dialog trigger without a DOM', () => {
    expect(() =>
      renderToString(
        <Dialog>
          <Dialog.Trigger>
            <button type="button">Open</button>
          </Dialog.Trigger>
          <Dialog.Content />
        </Dialog>,
      ),
    ).not.toThrow();
  });

  it('renders the swipeable overlays with their rail + panel scaffolding', () => {
    const drawer = renderToString(
      <Drawer>
        <Drawer.Trigger>
          <button type="button">Open</button>
        </Drawer.Trigger>
        <Drawer.Content>
          <p>Body</p>
        </Drawer.Content>
      </Drawer>,
    );
    expect(drawer).toContain('k="drawer-rail"');
    expect(drawer).toContain('k="drawer-panel"');

    const sheet = renderToString(
      <Sheet>
        <Sheet.Content>
          <p>Body</p>
        </Sheet.Content>
      </Sheet>,
    );
    expect(sheet).toContain('k="sheet-rail"');
    expect(sheet).toContain('k="sheet-panel"');

    const sidebar = renderToString(
      <Sidebar id="nav">
        <nav>Links</nav>
      </Sidebar>,
    );
    expect(sidebar).toContain('k="sidebar-panel"');
    expect(sidebar).toContain('k="sidebar-rail"');
  });
});
