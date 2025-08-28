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
  ScrollArea,
  AlertDialog,
  Resizable,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  Sidebar,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  Menubar,
  MenubarItem,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Pagination,
  PaginationList,
  PaginationItem,
  PaginationLink,
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Calendar,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  DatePicker,
  SidebarTrigger,
} from 'pui';
import '../../src/components/typography/style.css';
import {useEffect, useState} from 'preact/hooks';
import {CodeBlock} from './code-block';

interface Example {
  id: string;
  title: string;
  Demo: () => JSX.Element;
  code: string;
}

function logText(e: MouseEvent | string) {
  const text =
    e instanceof Event ? (e.currentTarget as HTMLElement).textContent! : e;
  const title = e instanceof Event ? 'Selected item:' : 'Value:';
  toast.show(text, {title});
}

function BadgeDemo() {
  return (
    <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
const badgeCode = `<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="destructive">Destructive</Badge>\n<Badge variant="outline">Outline</Badge>`;

function ProgressDemo() {
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    setTimeout(setProgress, 500, 50);
    setTimeout(setProgress, 1000, 90);
  }, []);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Progress value={progress} max={100} />
      <Progress value={75} max={100} />
    </div>
  );
}
const progressCode = `<Progress value={25} max={100} />`;

function SkeletonDemo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Skeleton style={{height: '1.5rem'}} />
      <Skeleton style={{height: '1.5rem', width: '60%'}} />
    </div>
  );
}
const skeletonCode = `<Skeleton style={{height: '1.5rem'}} />`;

function ButtonDemo() {
  return (
    <div>
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
    </div>
  );
}
const buttonCode = `<Button>Default</Button>`;

function InputDemo() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Input
        placeholder="Enter your email"
        type="email"
        value={email}
        onInput={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
      />
      <Input
        placeholder="Your name"
        value={name}
        onInput={(e: Event) => setName((e.target as HTMLInputElement).value)}
      />
      <Input placeholder="Small input" size={'sm' as any} />
      <Input placeholder="Large input" size={'lg' as any} />
      <Input placeholder="Disabled input" disabled />
    </div>
  );
}
const inputCode = `<Input placeholder="Enter your email" />`;

function AccordionDemo() {
  return (
    <>
      <Accordion name="accordion-demo">
        <summary>More Info</summary>
        <p style={{margin: '0.5rem 0 0 0'}}>
          Hidden content that becomes visible when the summary is clicked.
        </p>
      </Accordion>
      <Accordion name="accordion-demo">
        <summary>Second Item</summary>
        <p style={{margin: '0.5rem 0 0 0'}}>
          Other hidden content that becomes visible when the summary is clicked.
        </p>
      </Accordion>
    </>
  );
}
const accordionCode = `<Accordion>...</Accordion>`;

function TabsDemo() {
  const [tab, setTab] = useState<'first' | 'second'>('first');
  return (
    <div>
      <TabList>
        <Tab aria-selected={tab === 'first'} onClick={() => setTab('first')}>
          First
        </Tab>
        <Tab aria-selected={tab === 'second'} onClick={() => setTab('second')}>
          Second
        </Tab>
      </TabList>
      {tab === 'first' && <TabPanel>Content for first tab.</TabPanel>}
      {tab === 'second' && <TabPanel>Second tab panel.</TabPanel>}
    </div>
  );
}
const tabsCode = `<TabList>...</TabList>`;

function SwitchDemo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
      <Switch
        checked={enabled}
        onInput={(e) => setEnabled((e.target as HTMLInputElement).checked)}
      />
      <span>{enabled ? 'On' : 'Off'}</span>
    </div>
  );
}
const switchCode = `<Switch />`;

function TooltipDemo() {
  return (
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
  );
}
const tooltipCode = `<Tooltip title="Save"><Button /></Tooltip>`;

function ToastDemo() {
  return (
    <Menubar>
      <Button onClick={() => toast.show('Hello from toast!')}>
        Basic Toast
      </Button>
      <Button
        onClick={() =>
          toast.show('Your event has been successfully created!', {
            title: 'Event created',
            icon: '🎉',
            action: <Button>Undo</Button>,
            duration: 5000,
          })
        }
      >
        With Title
      </Button>
    </Menubar>
  );
}
const toastCode = `<Button onClick={() => toast.show('msg')}>Show Toast</Button>`;

function DialogDemo() {
  return (
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
          style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}
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
  );
}
const dialogCode = `<Dialog>...</Dialog>`;

function TextareaDemo() {
  const [message, setMessage] = useState('');
  return (
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
  );
}
const textareaCode = `<Textarea placeholder="Enter your message..." />`;

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Checkbox
          id="agree"
          checked={checked}
          onInput={(e) => setChecked((e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="agree">I agree to the terms and conditions</Label>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">Disabled checkbox</Label>
      </div>
    </div>
  );
}
const checkboxCode = `<Checkbox />`;

function RadioGroupDemo() {
  const [radio, setRadio] = useState('option1');
  return (
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
  );
}
const radioGroupCode = `<RadioGroup>...</RadioGroup>`;

function SelectDemo() {
  const [select, setSelect] = useState('apple');
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Label htmlFor="fruit">Choose a fruit</Label>
      <Select
        id="fruit"
        value={select}
        onInput={(e: Event) => setSelect((e.target as HTMLSelectElement).value)}
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
  );
}
const selectCode = `<Select>...</Select>`;

function SliderDemo() {
  const [slider, setSlider] = useState(50);
  return (
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
  );
}
const sliderCode = `<Slider min={0} max={100} />`;

function SeparatorDemo() {
  return (
    <div>
      <p>Content above separator</p>
      <Separator />
      <p>Content below separator</p>
    </div>
  );
}
const separatorCode = `<Separator />`;

function AvatarDemo() {
  return (
    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
      <Avatar src="https://github.com/developit.png" alt="Profile" />
      <Avatar>JD</Avatar>
      <Avatar size="sm">SM</Avatar>
      <Avatar size="lg">LG</Avatar>
    </div>
  );
}
const avatarCode = `<Avatar src="..." />`;

function ToggleDemo() {
  const [toggle, setToggle] = useState(false);
  return (
    <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
      <Toggle pressed={toggle} onPressedChange={setToggle}>
        Bold
      </Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  );
}
const toggleCode = `<Toggle>Bold</Toggle>`;

function ToggleGroupDemo() {
  const [toggleGroup, setToggleGroup] = useState<string[]>([]);
  return (
    <ToggleGroup
      type="multiple"
      value={toggleGroup}
      onValueChange={setToggleGroup}
    >
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  );
}
const toggleGroupCode = `<ToggleGroup>...</ToggleGroup>`;

function AspectRatioDemo() {
  return (
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
  );
}
const aspectRatioCode = `<AspectRatio ratio={16/9}>...</AspectRatio>`;

function AlertDemo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Alert>
        <strong>Info:</strong> This is an informational alert.
      </Alert>
      <Alert variant="destructive">
        <strong>Error:</strong> Something went wrong.
      </Alert>
    </div>
  );
}
const alertCode = `<Alert>Info</Alert>`;

function TableDemo() {
  return (
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
  );
}
const tableCode = `<Table>...</Table>`;

function CollapsibleDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
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
  );
}
const collapsibleCode = `<Collapsible open>...</Collapsible>`;

function PopoverDemo() {
  return (
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
  );
}
const popoverCode = `<Popover>...</Popover>`;

function DropdownMenuDemo() {
  return (
    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">Actions ▼</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => logText('Edit clicked')}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logText('Copy clicked')}>
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logText('Delete clicked')}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
const dropdownMenuCode = `<DropdownMenu>...</DropdownMenu>`;

function FormDemo() {
  const [email, _setEmail] = useState('');
  const [name, _setName] = useState('');
  return (
    <div>
      <p>
        Current values: {email && `Email: ${email}`} {name && `Name: ${name}`}
      </p>
      <Button
        onClick={() => {
          console.log('Form data:', {email, name});
          logText(`Email: ${email}\nName: ${name}`);
        }}
      >
        Submit Form
      </Button>
    </div>
  );
}
const formCode = `<Button onClick={submit}>Submit Form</Button>`;

function ScrollAreaDemo() {
  return (
    <ScrollArea
      style={{
        height: '100px',
        border: '1px solid hsl(var(--p-border))',
        padding: '0.5rem',
      }}
    >
      <p>Scrollable content</p>
      <p>Line 2</p>
      <p>Line 3</p>
      <p>Line 4</p>
      <p>Line 5</p>
      <p>Line 6</p>
    </ScrollArea>
  );
}
const scrollAreaCode = `<ScrollArea style={{height:100}}>...</ScrollArea>`;

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button variant="outline">Open Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <p style={{margin: '0 0 1rem 0'}}>Are you sure?</p>
        <div
          style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}
        >
          <AlertDialog.Close>
            <Button variant="outline">Cancel</Button>
          </AlertDialog.Close>
          <AlertDialog.Close>
            <Button>Ok</Button>
          </AlertDialog.Close>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
const alertDialogCode = `<AlertDialog>...</AlertDialog>`;

function ResizableDemo() {
  return (
    <Resizable style={{width: '150px', height: '80px'}}>Resize me</Resizable>
  );
}
const resizableCode = `<Resizable>Resize me</Resizable>`;

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <p style={{margin: '0 0 1rem 0'}}>Sheet Content</p>
        <SheetClose>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
const sheetCode = `<Sheet>...</Sheet>`;

function SidebarDemo() {
  return (
    <div
      style={{
        position: 'relative',
        contain: 'strict',
        height: '400px',
        border: '1px solid hsl(var(--p-border))',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <Sidebar style={{position: 'relative', width: '16rem', height: '100%'}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem',
            borderBottom: '1px solid hsl(var(--p-border))',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'hsl(var(--p-foreground))',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'hsl(var(--p-background))',
              fontWeight: '600',
            }}
          >
            P
          </div>
          <div>
            <div style={{fontWeight: '600', fontSize: '0.875rem'}}>
              Project UI
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'hsl(var(--p-muted-foreground))',
              }}
            >
              Component Library
            </div>
          </div>
        </div>

        <h3>Navigation</h3>
        <nav>
          <a href="#" aria-current="page">
            🏠 Dashboard
          </a>
          <a href="#">📊 Analytics</a>
          <a href="#">👥 Team</a>
          <a href="#">⚙️ Settings</a>
        </nav>

        <h3>Resources</h3>
        <nav>
          <a href="#">📖 Documentation</a>
          <a href="#">🎨 Design System</a>
          <a href="#">🔧 Tools</a>
        </nav>

        <div
          style={{
            marginTop: 'auto',
            padding: '1rem 0',
            borderTop: '1px solid hsl(var(--p-border))',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--p-muted))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
              }}
            >
              JD
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: '0.875rem', fontWeight: '500'}}>
                John Doe
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'hsl(var(--p-muted-foreground))',
                }}
              >
                john@example.com
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      <div
        style={{
          marginLeft: '16rem',
          padding: '1rem',
          height: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'hsl(var(--p-muted) / 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '0.875rem',
            color: 'hsl(var(--p-muted-foreground))',
            marginBottom: '0.5rem',
          }}
        >
          Components › Sidebar
        </div>
        <div
          style={{
            color: 'hsl(var(--p-muted-foreground))',
            fontSize: '0.875rem',
          }}
        >
          A clean, organized sidebar component with improved styling and
          navigation.
        </div>
      </div>
    </div>
  );
}
const sidebarCode = `<Sidebar>
  <h3>Navigation</h3>
  <nav>
    <a href="#" aria-current="page">🏠 Dashboard</a>
    <a href="#">📊 Analytics</a>
    <a href="#">👥 Team</a>
    <a href="#">⚙️ Settings</a>
  </nav>

  <h3>Resources</h3>
  <nav>
    <a href="#">📖 Documentation</a>
    <a href="#">🎨 Design System</a>
    <a href="#">🔧 Tools</a>
  </nav>
</Sidebar>`;

function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
const breadcrumbCode = `<Breadcrumb>...</Breadcrumb>`;

function MenubarDemo() {
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
const menubarCode = `<Menubar>...</Menubar>`;

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Docs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Blog</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
const navigationMenuCode = `<NavigationMenu>...</NavigationMenu>`;

function PaginationDemo() {
  return (
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationLink aria-current="page">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
const paginationCode = `<Pagination>...</Pagination>`;

function ComboboxDemo() {
  return (
    <Combobox>
      <ComboboxInput />
      <ComboboxList>
        <ComboboxOption>Apple</ComboboxOption>
        <ComboboxOption>Banana</ComboboxOption>
        <ComboboxOption>Orange</ComboboxOption>
      </ComboboxList>
    </Combobox>
  );
}
const comboboxCode = `<Combobox>...</Combobox>`;

function ContextMenuDemo() {
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
const contextMenuCode = `<ContextMenu>...</ContextMenu>`;

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <p style={{margin: '0 0 1rem 0'}}>Drawer Content</p>
        <DrawerClose>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
const drawerCode = `<Drawer>...</Drawer>`;

function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="outline">Hover me</Button>
      </HoverCardTrigger>
      <HoverCardContent>More info</HoverCardContent>
    </HoverCard>
  );
}
const hoverCardCode = `<HoverCard>...</HoverCard>`;

function CalendarDemo() {
  return <Calendar />;
}
const calendarCode = `<Calendar />`;

function CarouselDemo() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 1
        </CarouselItem>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #6bcf7f, #4ecdc4)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 2
        </CarouselItem>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #45b7d1, #96ceb4)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 3
        </CarouselItem>
        <CarouselItem
          style={{
            padding: '2rem',
            background: 'linear-gradient(45deg, #a8e6cf, #dcedc1)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Slide 4
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious>‹</CarouselPrevious>
      <CarouselNext>›</CarouselNext>
    </Carousel>
  );
}
const carouselCode = `<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
    <CarouselItem>Slide 4</CarouselItem>
  </CarouselContent>
  <CarouselPrevious>‹</CarouselPrevious>
  <CarouselNext>›</CarouselNext>
</Carousel>`;

function DatePickerDemo() {
  return <DatePicker />;
}
const datePickerCode = `<DatePicker />`;

function TypographyDemo() {
  return (
    <div>
      <h1>h1 Heading</h1>
      <h2>h2 Heading</h2>
      <p>Paragraph text.</p>
    </div>
  );
}
const typographyCode = `<h1>h1 Heading</h1>`;

const examples: Example[] = [
  {id: 'badge', title: 'Badge', Demo: BadgeDemo, code: badgeCode},
  {id: 'progress', title: 'Progress', Demo: ProgressDemo, code: progressCode},
  {id: 'skeleton', title: 'Skeleton', Demo: SkeletonDemo, code: skeletonCode},
  {id: 'button', title: 'Button', Demo: ButtonDemo, code: buttonCode},
  {id: 'input', title: 'Input', Demo: InputDemo, code: inputCode},
  {
    id: 'accordion',
    title: 'Accordion',
    Demo: AccordionDemo,
    code: accordionCode,
  },
  {id: 'tabs', title: 'Tabs', Demo: TabsDemo, code: tabsCode},
  {id: 'switch', title: 'Switch', Demo: SwitchDemo, code: switchCode},
  {id: 'tooltip', title: 'Tooltip', Demo: TooltipDemo, code: tooltipCode},
  {id: 'toast', title: 'Toast', Demo: ToastDemo, code: toastCode},
  {id: 'dialog', title: 'Dialog', Demo: DialogDemo, code: dialogCode},
  {id: 'textarea', title: 'Textarea', Demo: TextareaDemo, code: textareaCode},
  {id: 'checkbox', title: 'Checkbox', Demo: CheckboxDemo, code: checkboxCode},
  {
    id: 'radio-group',
    title: 'Radio Group',
    Demo: RadioGroupDemo,
    code: radioGroupCode,
  },
  {id: 'select', title: 'Select', Demo: SelectDemo, code: selectCode},
  {id: 'slider', title: 'Slider', Demo: SliderDemo, code: sliderCode},
  {
    id: 'separator',
    title: 'Separator',
    Demo: SeparatorDemo,
    code: separatorCode,
  },
  {id: 'avatar', title: 'Avatar', Demo: AvatarDemo, code: avatarCode},
  {id: 'toggle', title: 'Toggle', Demo: ToggleDemo, code: toggleCode},
  {
    id: 'toggle-group',
    title: 'Toggle Group',
    Demo: ToggleGroupDemo,
    code: toggleGroupCode,
  },
  {
    id: 'aspect-ratio',
    title: 'Aspect Ratio',
    Demo: AspectRatioDemo,
    code: aspectRatioCode,
  },
  {id: 'alert', title: 'Alert', Demo: AlertDemo, code: alertCode},
  {id: 'table', title: 'Table', Demo: TableDemo, code: tableCode},
  {
    id: 'collapsible',
    title: 'Collapsible',
    Demo: CollapsibleDemo,
    code: collapsibleCode,
  },
  {id: 'popover', title: 'Popover', Demo: PopoverDemo, code: popoverCode},
  {
    id: 'dropdown-menu',
    title: 'Dropdown Menu',
    Demo: DropdownMenuDemo,
    code: dropdownMenuCode,
  },
  {id: 'form', title: 'Form Integration', Demo: FormDemo, code: formCode},
  {
    id: 'scroll-area',
    title: 'ScrollArea',
    Demo: ScrollAreaDemo,
    code: scrollAreaCode,
  },
  {
    id: 'alert-dialog',
    title: 'AlertDialog',
    Demo: AlertDialogDemo,
    code: alertDialogCode,
  },
  {
    id: 'resizable',
    title: 'Resizable',
    Demo: ResizableDemo,
    code: resizableCode,
  },
  {id: 'sheet', title: 'Sheet', Demo: SheetDemo, code: sheetCode},
  {id: 'sidebar', title: 'Sidebar', Demo: SidebarDemo, code: sidebarCode},
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    Demo: BreadcrumbDemo,
    code: breadcrumbCode,
  },
  {id: 'menubar', title: 'Menubar', Demo: MenubarDemo, code: menubarCode},
  {
    id: 'navigation-menu',
    title: 'NavigationMenu',
    Demo: NavigationMenuDemo,
    code: navigationMenuCode,
  },
  {
    id: 'pagination',
    title: 'Pagination',
    Demo: PaginationDemo,
    code: paginationCode,
  },
  {id: 'combobox', title: 'Combobox', Demo: ComboboxDemo, code: comboboxCode},
  {
    id: 'context-menu',
    title: 'ContextMenu',
    Demo: ContextMenuDemo,
    code: contextMenuCode,
  },
  {id: 'drawer', title: 'Drawer', Demo: DrawerDemo, code: drawerCode},
  {
    id: 'hover-card',
    title: 'HoverCard',
    Demo: HoverCardDemo,
    code: hoverCardCode,
  },
  {id: 'calendar', title: 'Calendar', Demo: CalendarDemo, code: calendarCode},
  {id: 'carousel', title: 'Carousel', Demo: CarouselDemo, code: carouselCode},
  {
    id: 'date-picker',
    title: 'DatePicker',
    Demo: DatePickerDemo,
    code: datePickerCode,
  },
  {
    id: 'typography',
    title: 'Typography',
    Demo: TypographyDemo,
    code: typographyCode,
  },
];

export function App() {
  return (
    <div class="demo-app">
      <Sidebar id="demo-sidebar">
        <nav class="nav">
          {examples.map((e) => (
            <a href={`#${e.id}`}>{e.title}</a>
          ))}
        </nav>
      </Sidebar>
      <main>
        <NavigationMenu class="demo-header home-nav">
          <SidebarTrigger
            commandFor="demo-sidebar"
            class="demo-sidebar-trigger"
          >
            ☰
          </SidebarTrigger>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/components">
                Components
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/linear">
                Linear Demo
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/chat">Chat Demo</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/player">Music Demo</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ToastContainer />
        {examples.map(({id, title, Demo, code}) => (
          <section id={id}>
            <Card>
              <h2>{title}</h2>
              <Demo />
              <CodeBlock code={code} />
            </Card>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
