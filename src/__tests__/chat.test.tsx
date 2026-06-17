import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Message} from '../components/message';

describe('conversation components ssr', () => {
  it('renders Message with avatar + bubble without a DOM', () => {
    expect(() =>
      renderToString(
        <Message from="assistant">
          <Message.Avatar>AI</Message.Avatar>
          <Message.Bubble>Hello there</Message.Bubble>
        </Message>,
      ),
    ).not.toThrow();
  });
});
