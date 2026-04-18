import {Item, Kbd, List} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
      </div>
      <List style={{maxWidth: '20rem'}}>
        <Item>
          Save
          <span style={{marginLeft: 'auto', display: 'flex', gap: '0.25rem'}}>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </span>
        </Item>
        <Item>
          Undo
          <span style={{marginLeft: 'auto', display: 'flex', gap: '0.25rem'}}>
            <Kbd>⌘</Kbd>
            <Kbd>Z</Kbd>
          </span>
        </Item>
      </List>
    </div>
  );
}

export const code = `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`;

export default {Demo, code};
