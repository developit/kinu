import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Cluster} from '../components/cluster';
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

  it('renders Cluster without a DOM', () => {
    expect(() =>
      renderToString(
        <Cluster gap="sm" align="baseline" justify="between">
          <span>One</span>
          <span>Two</span>
        </Cluster>,
      ),
    ).not.toThrow();
  });
});
