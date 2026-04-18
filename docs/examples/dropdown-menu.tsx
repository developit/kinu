import {
  Button,
  Item,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  toast,
} from 'kinu';

function logText(e: MouseEvent | string) {
  const text =
    e instanceof Event ? (e.currentTarget as HTMLElement).textContent! : e;
  const title = e instanceof Event ? 'Selected item:' : 'Value:';
  toast.show(text, {title});
}

export function Demo() {
  return (
    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Actions ▼</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Item onClick={() => logText('Edit clicked')}>Edit</Item>
          <Item onClick={() => logText('Copy clicked')}>Copy</Item>
          <Item onClick={() => logText('Delete clicked')}>Delete</Item>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Adaptive ↕</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent mobile="drawer">
          <Item onClick={() => logText('Profile')}>Profile</Item>
          <Item onClick={() => logText('Settings')}>Settings</Item>
          <Item onClick={() => logText('Billing')}>Billing</Item>
          <Item onClick={() => logText('Sign out')}>Sign out</Item>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const code = `{/* Standard menu */}
<DropdownMenu>
  <DropdownMenuTrigger><Button>Actions</Button></DropdownMenuTrigger>
  <DropdownMenuContent>...</DropdownMenuContent>
</DropdownMenu>

{/* Adaptive: menu on desktop, drawer on mobile */}
<DropdownMenu>
  <DropdownMenuTrigger><Button>Adaptive</Button></DropdownMenuTrigger>
  <DropdownMenuContent mobile="drawer">...</DropdownMenuContent>
</DropdownMenu>`;

export default {Demo, code};
