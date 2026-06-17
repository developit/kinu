import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Command} from '../components/command';
import {CopyButton} from '../components/copy-button';
import {Dialog} from '../components/dialog';
import {Form} from '../components/form';
import {Item} from '../components/item';
import {NumberField} from '../components/number-field';
import {Rating} from '../components/rating';
import {TagsInput} from '../components/tags-input';

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

  it('renders CopyButton without a DOM', () => {
    expect(() =>
      renderToString(<CopyButton value="hello" label="Copy" />),
    ).not.toThrow();
  });

  it('renders Form without a DOM', () => {
    expect(() =>
      renderToString(
        <Form>
          <input type="email" name="email" required />
          <button type="submit">Go</button>
        </Form>,
      ),
    ).not.toThrow();
  });

  it('renders Command palette without a DOM', () => {
    expect(() =>
      renderToString(
        <Dialog id="cmdk">
          <Command>
            <Command.Input placeholder="Search" />
            <Command.List>
              <Item>One</Item>
            </Command.List>
          </Command>
        </Dialog>,
      ),
    ).not.toThrow();
  });

  it('renders TagsInput without a DOM', () => {
    expect(() =>
      renderToString(
        <TagsInput name="tags" value={['a', 'b']} placeholder="Add…" />,
      ),
    ).not.toThrow();
  });
});
