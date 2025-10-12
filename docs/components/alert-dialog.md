# Alert Dialog

Convenience alias of `Dialog` for destructive confirmations. Use the same API but reserve it for flows that require explicit user acknowledgement.

## Import

```tsx
import {AlertDialog} from 'pui';
```

## Usage

```tsx
<AlertDialog>
  <AlertDialog.Trigger>
    <Button variant="destructive">Delete</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content role="alertdialog" aria-modal>
    <h3>Delete project?</h3>
    <p>This action cannot be undone.</p>
    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
      <AlertDialog.Close>
        <Button variant="outline">Cancel</Button>
      </AlertDialog.Close>
      <AlertDialog.Close>
        <Button variant="destructive">Delete</Button>
      </AlertDialog.Close>
    </div>
  </AlertDialog.Content>
</AlertDialog>
```

## Notes

All behaviours and CSS hooks are inherited from `Dialog`. Set `role="alertdialog"` on the content and provide strong copy for the destructive action.
