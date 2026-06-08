import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Dialog} from '../components/dialog';
import {Drawer} from '../components/drawer';

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

  it('renders drawer without wrapper elements', () => {
    const html = renderToString(
      <Drawer>
        <Drawer.Trigger>
          <button type="button">Open</button>
        </Drawer.Trigger>
        <Drawer.Content>
          <p>Body</p>
        </Drawer.Content>
      </Drawer>,
    );
    expect(html).toContain('k="drawer-content"');
    expect(html).not.toContain('drawer-rail');
    expect(html).not.toContain('drawer-panel');
  });
});
