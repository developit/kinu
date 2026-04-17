import {
  Item,
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
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
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          style={{
            width: '200px',
            height: '100px',
            background: 'hsl(var(--k-muted))',
          }}
        >
          Right-click me
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Item onClick={() => logText('Cut')}>Cut</Item>
        <Item onClick={() => logText('Copy')}>Copy</Item>
        <Item onClick={() => logText('Paste')}>
          Paste
        </Item>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const code = `<ContextMenu>...</ContextMenu>`;

export default {Demo, code};
