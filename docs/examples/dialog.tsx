import {Button, Dialog} from 'kinu';

export function Demo() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <h3 style={{margin: '0 0 1rem 0'}}>Confirm Action</h3>
        <p
          style={{
            margin: '0 0 1rem 0',
            color: 'hsl(var(--p-muted-foreground))',
          }}
        >
          This is a native HTML5 dialog element with minimal styling and
          behavior.
        </p>
        <div
          style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}
        >
          <Dialog.Close>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Confirm</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

export const code = `<Dialog>...</Dialog>`;

export default {Demo, code};
