import {Item, List, Separator} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [selected, setSelected] = useState('inbox');
  return (
    <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
      <List style={{width: '14rem'}}>
        <Item selected={selected === 'inbox'} onClick={() => setSelected('inbox')}>
          Inbox
        </Item>
        <Item selected={selected === 'drafts'} onClick={() => setSelected('drafts')}>
          Drafts
        </Item>
        <Item selected={selected === 'sent'} onClick={() => setSelected('sent')}>
          Sent
        </Item>
        <Separator />
        <Item selected={selected === 'trash'} onClick={() => setSelected('trash')} destructive>
          Trash
        </Item>
      </List>
      <List variant="nav" style={{width: '14rem'}}>
        <Item selected={selected === 'inbox'} onClick={() => setSelected('inbox')}>
          Inbox
        </Item>
        <Item selected={selected === 'drafts'} onClick={() => setSelected('drafts')}>
          Drafts
        </Item>
        <Item selected={selected === 'sent'} onClick={() => setSelected('sent')}>
          Sent
        </Item>
      </List>
    </div>
  );
}

export const code = `<List>
  <Item selected>Inbox</Item>
  <Item>Drafts</Item>
</List>

<List variant="nav">
  <Item selected>Inbox</Item>
  <Item>Drafts</Item>
</List>`;

export default {Demo, code};
