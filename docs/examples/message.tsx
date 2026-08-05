import {Message} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
      <Message from="user">
        <Message.Avatar>JM</Message.Avatar>
        <Message.Bubble>How small is kinu, really?</Message.Bubble>
      </Message>
      <Message from="assistant">
        <Message.Avatar>AI</Message.Avatar>
        <Message.Bubble>
          About 6 KB for everything — and most components ship zero JavaScript.
        </Message.Bubble>
      </Message>
    </div>
  );
}

export const code = `<Message from="user">
  <Message.Avatar>JM</Message.Avatar>
  <Message.Bubble>How small is kinu?</Message.Bubble>
</Message>
<Message from="assistant">
  <Message.Bubble>About 6 KB.</Message.Bubble>
</Message>`;

export default {Demo, code};
