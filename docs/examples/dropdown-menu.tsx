import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Item,
  Separator,
  Slider,
  Switch,
  toast,
} from 'kinu';
import {useState} from 'preact/hooks';

function logText(e: MouseEvent | string) {
  const text =
    e instanceof Event ? (e.currentTarget as HTMLElement).textContent! : e;
  const title = e instanceof Event ? 'Selected item:' : 'Value:';
  toast.show(text, {title});
}

export function Demo() {
  const [darkMode, setDarkMode] = useState(false);
  const [autosave, setAutosave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [volume, setVolume] = useState(60);

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

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Preferences ▼</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Item.Field>
            <Checkbox
              checked={darkMode}
              onChange={(e: Event) =>
                setDarkMode((e.target as HTMLInputElement).checked)
              }
            />
            Dark mode
          </Item.Field>
          <Item.Field>
            <Checkbox
              checked={autosave}
              onChange={(e: Event) =>
                setAutosave((e.target as HTMLInputElement).checked)
              }
            />
            Autosave
          </Item.Field>
          <Item.Field>
            <Switch
              checked={notifications}
              onChange={(e: Event) =>
                setNotifications((e.target as HTMLInputElement).checked)
              }
            />
            Notifications
          </Item.Field>
          <Separator />
          <Item.Field>
            Volume
            <Slider
              min={0}
              max={100}
              value={volume}
              onInput={(e: Event) =>
                setVolume(Number((e.target as HTMLInputElement).value))
              }
              style={{flex: 1}}
            />
          </Item.Field>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const code = `{/* Actions */}
<DropdownMenuContent>
  <Item onClick={...}>Edit</Item>
</DropdownMenuContent>

{/* Form-control rows via Item.Field */}
<DropdownMenuContent>
  <Item.Field>
    <Checkbox checked={darkMode} onChange={...} />
    Dark mode
  </Item.Field>
  <Item.Field>
    Volume
    <Slider min={0} max={100} value={volume} style={{flex: 1}} />
  </Item.Field>
</DropdownMenuContent>`;

export default {Demo, code};
