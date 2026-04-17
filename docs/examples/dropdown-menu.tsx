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
          <Item onClick={() => logText('Edit clicked')}>
            Edit
          </Item>
          <Item onClick={() => logText('Copy clicked')}>
            Copy
          </Item>
          <Item onClick={() => logText('Delete clicked')}>
            Delete
          </Item>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const code = `<DropdownMenu>...</DropdownMenu>`;

export default {Demo, code};
