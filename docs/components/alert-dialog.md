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

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| AlertDialog | — | Custom component implemented in the source file. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the dialog. If not provided, one will be auto-generated. |

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Re-exports Dialog so you get Trigger, Content, Close, and other helpers.
- Use when you want dialog markup that communicates a destructive decision.

---

_Source: `src/components/alert-dialog/index.tsx`
