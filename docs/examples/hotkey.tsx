import {Button, Command, Dialog, Hotkey, Item, Kbd} from 'kinu';

export function Demo() {
  return (
    <Dialog id="demo-hotkey-cmdk">
      <Hotkey keys="mod+k" command="show-modal" commandfor="demo-hotkey-cmdk" />
      <Dialog.Trigger>
        <Button variant="outline">
          Search
          <Kbd style={{marginLeft: '0.5rem'}}>⌘K</Kbd>
        </Button>
      </Dialog.Trigger>
      <Command>
        <Command.Input placeholder="Type to search…" />
        <Command.List>
          <Item>Open settings</Item>
          <Item>Invite teammate</Item>
          <Item>View shortcuts</Item>
        </Command.List>
      </Command>
    </Dialog>
  );
}

export const code = `<Dialog id="cmdk">
  <Hotkey keys="mod+k" command="show-modal" commandfor="cmdk" />
  <Dialog.Trigger><Button>Search <Kbd>⌘K</Kbd></Button></Dialog.Trigger>
  <Command>
    <Command.Input placeholder="Search…" />
    <Command.List><Item>Result</Item></Command.List>
  </Command>
</Dialog>`;

export default {Demo, code};
