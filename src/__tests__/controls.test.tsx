import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {NumberField} from '../components/number-field';
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

  it('renders NumberField without a DOM', () => {
    expect(() =>
      renderToString(
        <NumberField defaultValue={2} min={0} max={10} step={1} />,
      ),
    ).not.toThrow();
  });
});
