import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Stat} from '../components/stat';

describe('display components ssr', () => {
  it('renders Stat with compound parts without a DOM', () => {
    expect(() =>
      renderToString(
        <Stat>
          <Stat.Label>Revenue</Stat.Label>
          <Stat.Value>$48,200</Stat.Value>
          <Stat.Delta trend="up">+12.5%</Stat.Delta>
        </Stat>,
      ),
    ).not.toThrow();
  });
});
