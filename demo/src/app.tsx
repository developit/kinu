import {
  Badge,
  Button,
  Card,
  Input,
  Dialog,
  Accordion,
  TabList,
  Tab,
  TabPanel,
  Tooltip,
  Progress,
  Skeleton,
  Switch,
  ToastContainer,
  toast,
  Textarea,
  Label,
  Checkbox,
  RadioGroup,
  Radio,
  Select,
  Slider,
  Separator,
  Avatar,
  Toggle,
  ToggleGroup,
  AspectRatio,
  Alert,
  Table,
  Collapsible,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'pui';
import {useState} from 'preact/hooks';

export function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [tab, setTab] = useState<'first' | 'second'>('first');
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState('option1');
  const [select, setSelect] = useState('apple');
  const [slider, setSlider] = useState(50);
  const [toggle, setToggle] = useState(false);
  const [toggleGroup, setToggleGroup] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        background: 'hsl(var(--p-background))',
        color: 'hsl(var(--p-foreground))',
        minHeight: '100vh',
      }}
    >
      <ToastContainer />
      <h1>UI Toolkit Demo</h1>

      {/* Badge Examples */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Badges</h2>
        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Card>

      {/* Progress Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Progress</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <Progress value={25} max={100} />
          <Progress value={75} max={100} />
        </div>
      </Card>

      {/* Skeleton Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Skeleton</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <Skeleton style={{height: '1.5rem'}} />
          <Skeleton style={{height: '1.5rem', width: '60%'}} />
        </div>
      </Card>

      {/* Button Examples */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Buttons</h2>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>

        <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem'}}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </Card>

      {/* Input Examples */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Inputs</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onInput={(e: Event) =>
              setEmail((e.target as HTMLInputElement).value)
            }
          />

          <Input
            placeholder="Your name"
            value={name}
            onInput={(e: Event) =>
              setName((e.target as HTMLInputElement).value)
            }
          />

          <Input placeholder="Small input" size={'sm' as any} />
          <Input placeholder="Large input" size={'lg' as any} />
          <Input placeholder="Disabled input" disabled />
        </div>
      </Card>

      {/* Accordion Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Accordion</h2>
        <Accordion>
          <summary>More Info</summary>
          <p style={{margin: '0.5rem 0 0 0'}}>
            Hidden content that becomes visible when the summary is clicked.
          </p>
        </Accordion>
      </Card>

      {/* Tabs Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Tabs</h2>
        <TabList>
          <Tab aria-selected={tab === 'first'} onClick={() => setTab('first')}>
            First
          </Tab>
          <Tab
            aria-selected={tab === 'second'}
            onClick={() => setTab('second')}
          >
            Second
          </Tab>
        </TabList>
        {tab === 'first' && <TabPanel>Content for first tab.</TabPanel>}
        {tab === 'second' && <TabPanel>Second tab panel.</TabPanel>}
      </Card>

      {/* Switch Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Switch</h2>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <Switch
            checked={enabled}
            onInput={(e) => setEnabled((e.target as HTMLInputElement).checked)}
          />
          <span>{enabled ? 'On' : 'Off'}</span>
        </div>
      </Card>

      {/* Tooltip Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Tooltip</h2>
        <p>Hover over the buttons to see tooltips.</p>
        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          <Tooltip title="Save">
            <Button size="icon">💾</Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button size="icon" variant="destructive">
              🗑
            </Button>
          </Tooltip>
        </div>
      </Card>

      {/* Toast Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Toast</h2>
        <Button onClick={() => toast.show('Hello from toast!')}>
          Show Toast
        </Button>
      </Card>

      {/* Dialog Example */}
      <Card>
        <h2>Dialog</h2>
        <p>Click the button below to open a modal dialog.</p>

        <Dialog>
          <Dialog.Trigger>
            <Button variant="outline">Open Dialog</Button>
          </Dialog.Trigger>

          <Dialog.Content>
            <h3 style={{margin: '0 0 1rem 0'}}>Confirm Action</h3>
            <p
              style={{
                margin: '0 0 1rem 0',
                color: 'hsl(var(--p-muted-foreground))',
              }}
            >
              This is a native HTML5 dialog element with minimal styling and
              behavior.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'flex-end',
              }}
            >
              <Dialog.Close>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button>Confirm</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog>
      </Card>

      {/* Textarea Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Textarea</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your message..."
            value={message}
            onInput={(e: Event) =>
              setMessage((e.target as HTMLTextAreaElement).value)
            }
          />
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      </Card>

      {/* Checkbox Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Checkbox</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Checkbox
              id="agree"
              checked={checked}
              onInput={(e) =>
                setChecked((e.target as HTMLInputElement).checked)
              }
            />
            <Label htmlFor="agree">I agree to the terms and conditions</Label>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled">Disabled checkbox</Label>
          </div>
        </div>
      </Card>

      {/* Radio Group Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Radio Group</h2>
        <RadioGroup>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Radio
              id="option1"
              name="options"
              value="option1"
              checked={radio === 'option1'}
              onInput={() => setRadio('option1')}
            />
            <Label htmlFor="option1">Option 1</Label>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Radio
              id="option2"
              name="options"
              value="option2"
              checked={radio === 'option2'}
              onInput={() => setRadio('option2')}
            />
            <Label htmlFor="option2">Option 2</Label>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Radio
              id="option3"
              name="options"
              value="option3"
              checked={radio === 'option3'}
              onInput={() => setRadio('option3')}
            />
            <Label htmlFor="option3">Option 3</Label>
          </div>
        </RadioGroup>
      </Card>

      {/* Select Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Select</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Label htmlFor="fruit">Choose a fruit</Label>
          <Select
            id="fruit"
            value={select}
            onInput={(e: Event) =>
              setSelect((e.target as HTMLSelectElement).value)
            }
          >
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
            <option value="grape">Grape</option>
          </Select>
          <Select disabled>
            <option>Disabled select</option>
          </Select>
        </div>
      </Card>

      {/* Slider Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Slider</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Label>Value: {slider}</Label>
          <Slider
            min={0}
            max={100}
            value={slider}
            onInput={(e: Event) =>
              setSlider(Number((e.target as HTMLInputElement).value))
            }
          />
          <Slider min={0} max={100} value={25} disabled />
        </div>
      </Card>

      {/* Separator Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Separator</h2>
        <div>
          <p>Content above separator</p>
          <Separator />
          <p>Content below separator</p>
        </div>
      </Card>

      {/* Avatar Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Avatar</h2>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <Avatar src="https://github.com/developit.png" alt="Profile" />
          <Avatar>JD</Avatar>
          <Avatar size="sm">SM</Avatar>
          <Avatar size="lg">LG</Avatar>
        </div>
      </Card>

      {/* Toggle Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Toggle</h2>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          <Toggle pressed={toggle} onPressedChange={setToggle}>
            Bold
          </Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      </Card>

      {/* Toggle Group Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Toggle Group</h2>
        <ToggleGroup
          type="multiple"
          value={toggleGroup}
          onValueChange={setToggleGroup}
        >
          <Toggle value="bold">Bold</Toggle>
          <Toggle value="italic">Italic</Toggle>
          <Toggle value="underline">Underline</Toggle>
        </ToggleGroup>
      </Card>

      {/* Aspect Ratio Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Aspect Ratio</h2>
        <AspectRatio
          ratio={16 / 9}
          style={{
            backgroundColor: 'hsl(var(--p-muted))',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>16:9 Aspect Ratio</span>
        </AspectRatio>
      </Card>

      {/* Alert Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Alert</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Alert>
            <strong>Info:</strong> This is an informational alert.
          </Alert>
          <Alert variant="destructive">
            <strong>Error:</strong> Something went wrong.
          </Alert>
        </div>
      </Card>

      {/* Table Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Table</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td>User</td>
            </tr>
          </tbody>
        </Table>
      </Card>

      {/* Collapsible Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Collapsible</h2>
        <div>
          <Button onClick={() => setCollapsed(!collapsed)} variant="outline">
            {collapsed ? 'Show' : 'Hide'} Details
          </Button>
          <Collapsible open={!collapsed}>
            <div style={{padding: '1rem 0'}}>
              <p>This content can be collapsed and expanded.</p>
              <p>It's useful for showing/hiding additional information.</p>
            </div>
          </Collapsible>
        </div>
      </Card>

      {/* Popover Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Popover</h2>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{padding: '1rem'}}>
              <h3 style={{margin: '0 0 0.5rem 0'}}>Popover Content</h3>
              <p style={{margin: '0'}}>This is content inside a popover.</p>
            </div>
          </PopoverContent>
        </Popover>
      </Card>

      {/* Dropdown Menu Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Dropdown Menu</h2>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Actions ▼</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => alert('Edit clicked')}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert('Copy clicked')}>
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert('Delete clicked')}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Settings ▼</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => alert('Profile clicked')}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert('Privacy clicked')}>
                Privacy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert('Help clicked')}>
                Help & Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {/* Form Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Form Integration</h2>
        <p>
          Current values: {email && `Email: ${email}`} {name && `Name: ${name}`}
        </p>
        <Button
          onClick={() => {
            console.log('Form data:', {email, name});
            alert(`Email: ${email}\nName: ${name}`);
          }}
        >
          Submit Form
        </Button>
      </Card>
    </div>
  );
}
