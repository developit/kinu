import {Item, Kbd, List} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
        Press <Kbd>⌘K</Kbd> to open the command palette.
      </div>
      <List style={{maxWidth: '20rem'}}>
        <Item>
          Save
          <Kbd style={{marginLeft: 'auto'}}>⌘S</Kbd>
        </Item>
        <Item>
          Undo
          <Kbd style={{marginLeft: 'auto'}}>⌘Z</Kbd>
        </Item>
      </List>
    </div>
  );
}

export const code = `<Kbd>⌘K</Kbd>`;

export default {Demo, code};
