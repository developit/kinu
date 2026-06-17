import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Stack} from '../components/stack';

describe('layout primitives ssr', () => {
  it('renders Stack without a DOM', () => {
    expect(() =>
      renderToString(
        <Stack gap="md" align="center" justify="between">
          <div>One</div>
          <div>Two</div>
        </Stack>,
      ),
    ).not.toThrow();
  });
});
