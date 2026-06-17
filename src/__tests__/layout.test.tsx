import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {AppShell} from '../components/app-shell';
import {Cluster} from '../components/cluster';
import {Grid} from '../components/grid';
import {Row} from '../components/row';
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

  it('renders Row without a DOM', () => {
    expect(() =>
      renderToString(
        <Row gap="sm" align="center" justify="between" wrap>
          <span>One</span>
          <span>Two</span>
        </Row>,
      ),
    ).not.toThrow();
  });

  it('renders AppShell with all compound parts without a DOM', () => {
    expect(() =>
      renderToString(
        <AppShell>
          <AppShell.Header>Acme</AppShell.Header>
          <AppShell.Sidebar>Nav</AppShell.Sidebar>
          <AppShell.Main>Content</AppShell.Main>
          <AppShell.Footer>Footer</AppShell.Footer>
        </AppShell>,
      ),
    ).not.toThrow();
  });
});
