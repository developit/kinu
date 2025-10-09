import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Dialog} from '../components/dialog';

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
});
