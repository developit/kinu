import {Message, Thread} from 'kinu';

export function Demo() {
  return (
    <Thread
      scrollable
      style={{
        height: '16rem',
        padding: '0.75rem',
        border: '1px solid hsl(var(--k-border))',
        borderRadius: 'var(--k-radius)',
      }}
    >
      <Message from="assistant">
        <Message.Bubble>Hi! Ask me anything about kinu.</Message.Bubble>
      </Message>
      <Message from="user">
        <Message.Bubble>How big is the bundle?</Message.Bubble>
      </Message>
      <Message from="assistant">
        <Message.Bubble>About 6 KB for everything.</Message.Bubble>
      </Message>
      <Message from="user">
        <Message.Bubble>And how much JavaScript per component?</Message.Bubble>
      </Message>
      <Message from="assistant">
        <Message.Bubble>
          Most ship zero — they're CSS over native HTML. The few with behavior
          add a few hundred bytes.
        </Message.Bubble>
      </Message>
    </Thread>
  );
}

export const code = `<Thread scrollable style={{height: '16rem'}}>
  <Message from="assistant"><Message.Bubble>Hi!</Message.Bubble></Message>
  <Message from="user"><Message.Bubble>How big is it?</Message.Bubble></Message>
</Thread>`;

export default {Demo, code};
