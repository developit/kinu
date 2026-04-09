import {List, ListItem, Separator} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [selected, setSelected] = useState('inbox');
  return (
    <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
      <List style={{width: '14rem'}}>
        <ListItem selected={selected === 'inbox'} onClick={() => setSelected('inbox')}>
          Inbox
        </ListItem>
        <ListItem selected={selected === 'drafts'} onClick={() => setSelected('drafts')}>
          Drafts
        </ListItem>
        <ListItem selected={selected === 'sent'} onClick={() => setSelected('sent')}>
          Sent
        </ListItem>
        <Separator />
        <ListItem selected={selected === 'trash'} onClick={() => setSelected('trash')} destructive>
          Trash
        </ListItem>
      </List>
      <List variant="nav" style={{width: '14rem'}}>
        <ListItem selected={selected === 'inbox'} onClick={() => setSelected('inbox')}>
          Inbox
        </ListItem>
        <ListItem selected={selected === 'drafts'} onClick={() => setSelected('drafts')}>
          Drafts
        </ListItem>
        <ListItem selected={selected === 'sent'} onClick={() => setSelected('sent')}>
          Sent
        </ListItem>
      </List>
    </div>
  );
}

export const code = `<List>
  <ListItem selected>Inbox</ListItem>
  <ListItem>Drafts</ListItem>
</List>

<List variant="nav">
  <ListItem selected>Inbox</ListItem>
  <ListItem>Drafts</ListItem>
</List>`;

export default {Demo, code};
