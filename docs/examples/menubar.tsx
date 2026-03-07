import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Menubar,
  MenubarItem,
  Separator,
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
    <Menubar>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenubarItem>File</MenubarItem>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={logText}>Open</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Save</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Save As...</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={logText}>Close</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenubarItem>Edit</MenubarItem>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={logText}>Cut</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Copy</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Paste</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>
            Paste without formatting
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenubarItem>View</MenubarItem>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={logText}>Explorer</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Search</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Source Control</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Run</DropdownMenuItem>
          <DropdownMenuItem onClick={logText}>Extensions</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Menubar>
  );
}

export const code = `<Menubar>...</Menubar>`;

export default {Demo, code};
