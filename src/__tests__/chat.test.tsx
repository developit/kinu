import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Message} from '../components/message';
import {Thread} from '../components/thread';

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

  it('renders Thread with messages without a DOM', () => {
    expect(() =>
      renderToString(
        <Thread scrollable>
          <Message from="user">
            <Message.Bubble>Hi</Message.Bubble>
          </Message>
        </Thread>,
      ),
    ).not.toThrow();
  });
});
