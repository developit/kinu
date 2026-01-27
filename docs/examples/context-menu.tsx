import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  toast,
} from 'pui';

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
            background: 'hsl(var(--p-muted))',
          }}
        >
          Right-click me
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => logText('Cut')}>Cut</ContextMenuItem>
        <ContextMenuItem onClick={() => logText('Copy')}>Copy</ContextMenuItem>
        <ContextMenuItem onClick={() => logText('Paste')}>
          Paste
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const code = `<ContextMenu>...</ContextMenu>`;

export default {Demo, code};
