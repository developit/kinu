import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Rating} from '../components/rating';

describe('form controls ssr', () => {
  it('renders Rating without a DOM', () => {
    expect(() =>
      renderToString(<Rating name="score" value={3} />),
    ).not.toThrow();
  });

  it('renders a read-only Rating', () => {
    expect(() =>
      renderToString(
        <Rating name="avg" value={4} count={5} readOnly size="sm" />,
      ),
    ).not.toThrow();
  });
});
