import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Cluster} from '../components/cluster';
import {Grid} from '../components/grid';
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

  it('renders Grid without a DOM', () => {
    expect(() =>
      renderToString(
        <Grid gap="md" min="sm" cols={3}>
          <div>One</div>
          <div>Two</div>
          <div>Three</div>
        </Grid>,
      ),
    ).not.toThrow();
  });
});
