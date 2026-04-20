# Dialog

Composable modal built on the native `<dialog>` element.

## Usage

```tsx
import {Dialog, DialogClose, DialogContent, DialogTrigger} from 'kinu';

<Dialog>
  <DialogTrigger><Button>Open</Button></DialogTrigger>
  <DialogContent>Modal body</DialogContent>
  <DialogClose><Button>Close</Button></DialogClose>
</Dialog>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Dialog | Modal overlay | — |
| DialogTrigger | Dialog trigger | — |
| DialogContent | Dialog content | — |
| DialogClose | Close button | — |

## Props

### DialogProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the dialog. If not provided, one will be auto-generated. |

### DialogContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Override the auto-generated dialog ID. |

### Static Shortcuts

- `Dialog.Trigger = DialogTrigger`
- `Dialog.Content = DialogContent`
- `Dialog.Close = DialogClose`

## Notes

- Relies on command attributes instead of portal gymnastics.
- Dialog.Content forwards all native `<dialog>` props.
- For React-controlled state, pass `open` to `Dialog.Content` and wire `onClose` — the native `open` attribute is promoted to a modal via the `beforetoggle` hook, and the browser's `close` event drives the state-sync callback.
- For URL-routable dialog state (shareable, back-button friendly), give `Dialog.Content` an `id` and link to it with `<a href="#confirm">Open</a>`. The native `:target` pseudo-class means the dialog open state survives refresh and is part of browser history. No Kinu code required.

---

_Source: `src/components/dialog/index.tsx`
