import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Composer} from '../components/composer';
import {Message} from '../components/message';
import {Textarea} from '../components/textarea';
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

  it('renders Composer with send + actions without a DOM', () => {
    expect(() =>
      renderToString(
        <Composer>
          <Textarea autosize rows={1} placeholder="Message…" />
          <Composer.Actions>
            <Composer.Send>Send</Composer.Send>
          </Composer.Actions>
        </Composer>,
      ),
    ).not.toThrow();
  });
});
