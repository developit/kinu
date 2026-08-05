import {Composer, Textarea} from 'kinu';

export function Demo() {
  return (
    <Composer onSubmit={(e) => e.preventDefault()}>
      <Textarea
        autosize
        rows={1}
        placeholder="Message kinu…  (Enter to send, Shift+Enter for a newline)"
      />
      <Composer.Actions>
        <Composer.Send>Send</Composer.Send>
      </Composer.Actions>
    </Composer>
  );
}

export const code = `<Composer onSubmit={send}>
  <Textarea autosize rows={1} placeholder="Message…" />
  <Composer.Actions>
    <Composer.Send>Send</Composer.Send>
  </Composer.Actions>
</Composer>`;

export default {Demo, code};
