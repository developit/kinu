import {Button, Command, Dialog, Item, Kbd} from 'kinu';

export function Demo() {
  return (
    <Dialog id="demo-cmdk">
      <Dialog.Trigger>
        <Button variant="outline">
          Open command palette
          <Kbd style={{marginLeft: '0.5rem'}}>⌘K</Kbd>
        </Button>
      </Dialog.Trigger>
      <Command>
        <Command.Input placeholder="Type a command or search…" />
        <Command.List>
          <Item>Search docs</Item>
          <Item>Create new project</Item>
          <Item>Toggle theme</Item>
          <Item destructive>Delete workspace</Item>
        </Command.List>
      </Command>
    </Dialog>
  );
}

export const code = `<Dialog id="cmdk">
  <Dialog.Trigger><Button>⌘K</Button></Dialog.Trigger>
  <Command>
    <Command.Input placeholder="Search…" />
    <Command.List>
      <Item>Search docs</Item>
      <Item destructive>Delete</Item>
    </Command.List>
  </Command>
</Dialog>`;

export default {Demo, code};
