import {AlertDialog, Button} from 'kinu';

export function Demo() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant="outline">Open Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <p style={{margin: '0 0 1rem 0'}}>Are you sure?</p>
        <div
          style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}
        >
          <AlertDialog.Close>
            <Button variant="outline">Cancel</Button>
          </AlertDialog.Close>
          <AlertDialog.Close>
            <Button>Ok</Button>
          </AlertDialog.Close>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export const code = `<AlertDialog>...</AlertDialog>`;

export default {Demo, code};
