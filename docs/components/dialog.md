# Dialog

Composable modal built on the native `<dialog>` element.

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

| Name | DOM element | Description |
| --- | --- | --- |
| Dialog | — | Context wrapper that connects trigger, content, and close helpers. |
| DialogTrigger | — | Decorator that opens the dialog when its child is activated. |
| DialogContent | `<dialog>` | Dialog element that renders the modal surface. |
| DialogClose | — | Decorator that closes the dialog when its child is activated. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| DialogContent | open | boolean | Reflects whether the element is expanded. |

## Notes

- Relies on command attributes instead of portal gymnastics.
- Dialog.Content forwards all native `<dialog>` props.

---

<source-ref src="src/components/dialog/index.tsx"></source-ref>
