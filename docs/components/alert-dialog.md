# Alert Dialog

Alias of Dialog with alert-focused styling defaults.

## Usage

```tsx
import {AlertDialog} from 'kinu';

<AlertDialog>
  <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
  <AlertDialog.Content>Confirm action</AlertDialog.Content>
</AlertDialog>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| AlertDialog | Alert modal | — |
| AlertDialog.Content | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the dialog. If not provided, one will be auto-generated. |

### Static Shortcuts

- `AlertDialog.Trigger = DialogTrigger`
- `AlertDialog.Close = DialogClose`

## Notes

- Builds on Dialog, so Trigger, Content and Close work the same way.
- Unlike Dialog, an alert does not close on an outside click — dismissing it takes an explicit choice. Escape still closes it. Set `closedby="any"` on AlertDialog.Content to opt back into light dismiss.
- Use when you want dialog markup that communicates a destructive decision.

---

_Source: `src/components/alert-dialog/index.tsx`
