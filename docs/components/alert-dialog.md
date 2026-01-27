# Alert Dialog

Alias of Dialog with alert-focused styling defaults.

## Usage

```tsx
import {AlertDialog} from 'pui';

<AlertDialog>
  <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
  <AlertDialog.Content>Confirm action</AlertDialog.Content>
</AlertDialog>
```

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Re-exports Dialog so you get Trigger, Content, Close, and other helpers.
- Use when you want dialog markup that communicates a destructive decision.

---

<source-ref src="src/components/alert-dialog/index.tsx"></source-ref>
