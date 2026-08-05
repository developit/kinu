# Command

Command palette — a modal Dialog hosting a filterable Listbox.

## Usage

```tsx
import {Command} from 'kinu';

<Dialog id="cmdk">
  <Dialog.Trigger><Button>⌘K</Button></Dialog.Trigger>
  <Command>
    <Command.Input placeholder="Search…" />
    <Command.List>
      <Item>Search docs</Item>
    </Command.List>
  </Command>
</Dialog>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Command | Component | — |

### Static Shortcuts

- `Command.Input = ListboxInput`
- `Command.List = ListboxList`

## Notes

- A pure composition of shipped parts: a modal `Dialog` hosting a `Listbox`. The Listbox supplies substring filtering (`Command.Input`) and keyboard navigation; the Dialog supplies the modal + focus trap. No fuzzy-search engine.
- Place it inside a `Dialog` and open with a `Dialog.Trigger` or a hotkey (`commandfor` + `command="show-modal"`).
- Items are regular `Item`s, so they support `shortcut`, `destructive`, and `href`.

---

_Source: `src/components/command/index.tsx`
