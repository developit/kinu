import {Button, Dialog} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
      <Dialog>
        <Dialog.Trigger>
          <Button variant="outline">Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <h3 style={{margin: '0 0 1rem 0'}}>Confirm Action</h3>
          <p
            style={{
              margin: '0 0 1rem 0',
              color: 'hsl(var(--k-muted-foreground))',
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

      <Dialog>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Controlled ({open ? 'open' : 'closed'})
        </Button>
        <Dialog.Content open={open} onClose={() => setOpen(false)}>
          <h3 style={{margin: '0 0 1rem 0'}}>React-controlled</h3>
          <p
            style={{
              margin: '0 0 1rem 0',
              color: 'hsl(var(--k-muted-foreground))',
            }}
          >
            This dialog is opened by setting <code>open={'{true}'}</code> on{' '}
            <code>Dialog.Content</code>. ESC, backdrop click, or the close
            button fire the native <code>close</code> event, which{' '}
            <code>onClose</code> uses to flip state back to <code>false</code>.
          </p>
          <div
            style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}
          >
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog>

      <Dialog>
        <a href="#confirm-delete">
          <Button variant="outline">Open via link (#confirm-delete)</Button>
        </a>
        <Dialog.Content id="confirm-delete">
          <h3 style={{margin: '0 0 1rem 0'}}>URL-routable</h3>
          <p
            style={{
              margin: '0 0 1rem 0',
              color: 'hsl(var(--k-muted-foreground))',
            }}
          >
            This variant uses the native <code>:target</code> pseudo-class.
            Open it via the link above and reload — the dialog stays open
            because the URL hash is part of the page state.
          </p>
          <div
            style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}
          >
            <a href="#">
              <Button>Close</Button>
            </a>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

export const code = `{/* Declarative (command-based) */}
<Dialog>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
</Dialog>

{/* React-controlled */}
<Dialog.Content open={open} onClose={() => setOpen(false)}>
  ...
</Dialog.Content>

{/* URL-routable via :target */}
<Dialog>
  <a href="#confirm-delete"><Button>Open</Button></a>
  <Dialog.Content id="confirm-delete">...</Dialog.Content>
</Dialog>`;

export default {Demo, code};
