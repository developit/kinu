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

const zoneStyle = {
  width: '200px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'hsl(var(--k-muted))',
  borderRadius: 'var(--k-radius)',
  color: 'hsl(var(--k-muted-foreground))',
  userSelect: 'none' as const,
};

export function Demo() {
  return (
    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div style={zoneStyle}>Right-click me</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <Item onClick={() => logText('Cut')}>Cut</Item>
          <Item onClick={() => logText('Copy')}>Copy</Item>
          <Item onClick={() => logText('Paste')}>Paste</Item>
        </ContextMenuContent>
      </ContextMenu>

      <ContextMenu>
        <ContextMenuTrigger>
          <div style={zoneStyle}>Long-press (mobile) ↕</div>
        </ContextMenuTrigger>
        <ContextMenuContent mobile="drawer">
          <Item onClick={() => logText('Reply')}>Reply</Item>
          <Item onClick={() => logText('Forward')}>Forward</Item>
          <Item onClick={() => logText('Star')}>Star</Item>
          <Item destructive onClick={() => logText('Delete')}>
            Delete
          </Item>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

export const code = `{/* Standard context menu */}
<ContextMenu>
  <ContextMenuTrigger>...</ContextMenuTrigger>
  <ContextMenuContent>...</ContextMenuContent>
</ContextMenu>

{/* Adaptive: context menu on desktop, drawer on mobile */}
<ContextMenu>
  <ContextMenuTrigger>...</ContextMenuTrigger>
  <ContextMenuContent mobile="drawer">...</ContextMenuContent>
</ContextMenu>`;

export default {Demo, code};
