# Dialog

Composable modal built on the native <dialog> element.

## Usage

```tsx
import {Dialog, DialogClose, DialogContent, DialogTrigger} from 'pui';

<Dialog>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>Modal body</Dialog.Content>
  <Dialog.Close><Button>Close</Button></Dialog.Close>
</Dialog>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Dialog | — | Custom component implemented in the source file. |
| DialogTrigger | — | Custom component implemented in the source file. |
| DialogContent | p="dialog-content" | Renders markup that includes p="dialog-content". |
| DialogClose | — | Custom component implemented in the source file. |

### Static Shortcuts

- `Dialog.Trigger = DialogTrigger`
- `Dialog.Content = DialogContent`
- `Dialog.Close = DialogClose`

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| DialogContent | open | boolean | Reflects whether the element is expanded. |

## Notes

- Relies on command attributes instead of portal gymnastics.
- Dialog.Content forwards all native <dialog> props.

---

_Source: `src/components/dialog/index.tsx`
