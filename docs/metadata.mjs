export default [
  {
    slug: 'overview',
    title: 'PUI Overview',
    section: 'Foundations',
    category: 'Introduction',
    order: 1,
    file: 'pages/overview.md'
  },
  {
    slug: 'theming',
    title: 'Theming & Tokens',
    section: 'Foundations',
    category: 'Styling',
    order: 2,
    file: 'pages/theming.md'
  },
  {
    slug: 'commands',
    title: 'Command Attributes',
    section: 'Foundations',
    category: 'Interactivity',
    order: 3,
    file: 'pages/commands.md'
  },
  {
    slug: 'base-css',
    title: 'Base Styles',
    section: 'Foundations',
    category: 'Styling',
    order: 3,
    file: 'pages/base-styles.md'
  },
  {
    slug: 'accordion',
    title: 'Accordion',
    section: 'Components',
    category: 'Data Display',
    order: 1,
    folder: 'accordion',
    description:
      'Disclosure built on the native `<details>` element with smooth open and close animation.',
    usage: `<Accordion open>\n  <summary>Details</summary>\n  <p>Hidden content</p>\n</Accordion>`,
    notes: [
      'Forwards every native `<details>` attribute so you can control open state.',
      'Provide your own `<summary>` element to define the trigger.'
    ]
  },
  {
    slug: 'alert',
    title: 'Alert',
    section: 'Components',
    category: 'Feedback',
    order: 1,
    folder: 'alert',
    description: 'Inline status message with tone variants.',
    usage: '<Alert variant="default">Heads up!</Alert>',
    notes: ['Renders a `<div>` so you can include any markup you need.']
  },
  {
    slug: 'alert-dialog',
    title: 'Alert Dialog',
    section: 'Components',
    category: 'Actions',
    order: 4,
    folder: 'alert-dialog',
    description: 'Alias of Dialog with alert-focused styling defaults.',
    usage: `<AlertDialog>\n  <AlertDialog.Trigger>Delete</AlertDialog.Trigger>\n  <AlertDialog.Content>Confirm action</AlertDialog.Content>\n</AlertDialog>`,
    notes: [
      'Re-exports Dialog so you get Trigger, Content, Close, and other helpers.',
      'Use when you want dialog markup that communicates a destructive decision.'
    ]
  },
  {
    slug: 'aspect-ratio',
    title: 'Aspect Ratio',
    section: 'Components',
    category: 'Layout',
    order: 2,
    folder: 'aspect-ratio',
    description: 'Maintains responsive boxes at a fixed ratio using pure CSS.',
    usage: `<AspectRatio ratio="16 / 9">\n  <img src="..." alt="Video thumbnail" />\n</AspectRatio>`,
    notes: ['Wraps a `<div>` that defines the ratio using a CSS custom property.']
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    section: 'Components',
    category: 'Data Display',
    order: 1,
    folder: 'avatar',
    description: 'Styled `<img>` avatar that falls back to initials from the alt text.',
    usage: '<Avatar alt="JM" src="/user.jpg" />',
    notes: [
      'Uses the alt attribute content as a CSS-rendered fallback when the image fails.',
      'Override dimensions in CSS if you need sizes other than the 2rem default.'
    ]
  },
  {
    slug: 'badge',
    title: 'Badge',
    section: 'Components',
    category: 'Data Display',
    order: 0,
    folder: 'badge',
    description: 'Tiny inline status indicator with multiple tone variants.',
    usage: '<Badge variant="secondary">New</Badge>'
  },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    section: 'Components',
    category: 'Navigation',
    order: 2,
    folder: 'breadcrumb',
    description: 'Composable breadcrumb trail built from list primitives.',
    usage: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
    notes: [
      'Ships structural wrappers so you can supply router-aware links.',
      'Uses semantic list markup for accessibility.'
    ]
  },
  {
    slug: 'button',
    title: 'Button',
    section: 'Components',
    category: 'Actions',
    order: 0,
    folder: 'button',
    description:
      'Button component that forwards props to `<button>` or `<a>` when href is provided.',
    usage: '<Button variant="outline">Action</Button>',
    notes: [
      'Use the loading attribute to reflect pending state without extra handlers.',
      'Supports size attributes (sm, md, lg, icon) controlled purely with CSS.'
    ]
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    section: 'Components',
    category: 'Data Input',
    order: 6,
    folder: 'calendar',
    description: 'Styled wrapper around the native `<input type="date">` element.',
    usage: '<Calendar />',
    notes: [
      'Forwards every standard input attribute, defaulting type to "date".',
      'Uses the browser\'s native date picker UI for accessibility and localisation.'
    ]
  },
  {
    slug: 'card',
    title: 'Card',
    section: 'Components',
    category: 'Data Display',
    order: 1,
    folder: 'card',
    description: 'Surface container with padding, border, and typography defaults.',
    usage: `<Card>\n  <h3>Title</h3>\n  <p>Content</p>\n</Card>`,
    notes: ['Wraps a `<div>` and exposes padding/variant control via attributes.']
  },
  {
    slug: 'carousel',
    title: 'Carousel',
    section: 'Components',
    category: 'Data Display',
    order: 6,
    folder: 'carousel',
    description: 'Scroll snapping carousel with previous/next helpers.',
    usage: `<Carousel>\n  <CarouselContent>\n    <CarouselItem>Slide</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>`,
    notes: [
      'Leverages CSS scroll snap for buttery momentum.',
      'Content remains fully declarative.'
    ]
  },
  {
    slug: 'checkbox',
    title: 'Checkbox',
    section: 'Components',
    category: 'Data Input',
    order: 2,
    folder: 'checkbox',
    description: 'Accessible checkbox input with custom visuals.',
    usage: '<Checkbox checked aria-label="Accept" />',
    notes: [
      'Wraps `<input type="checkbox">` so forms just work.',
      'Supports data-state="indeterminate" styling for tri-state usage.'
    ]
  },
  {
    slug: 'collapsible',
    title: 'Collapsible',
    section: 'Components',
    category: 'Data Display',
    order: 2,
    folder: 'collapsible',
    description: 'Minimal hide/show container built on `<details>` without default markers.',
    usage: '<Collapsible open summary="Trigger">Hidden content</Collapsible>',
    notes: [
      'Expose the open attribute for controlled usage.',
      'Great for FAQs when you want custom trigger markup.'
    ]
  },
  {
    slug: 'combobox',
    title: 'Combobox',
    section: 'Components',
    category: 'Data Input',
    order: 7,
    folder: 'combobox',
    description: 'Autocomplete input with trigger, list, and option primitives.',
    usage: `<Combobox>\n  <ComboboxInput placeholder="Search" />\n  <ComboboxList>\n    <ComboboxOption>One</ComboboxOption>\n  </ComboboxList>\n</Combobox>`,
    notes: [
      'Uses command/commandFor attributes for disclosure logic.',
      'Keep option counts manageable for usability.'
    ]
  },
  {
    slug: 'context-menu',
    title: 'Context Menu',
    section: 'Components',
    category: 'Actions',
    order: 7,
    folder: 'context-menu',
    description: 'Right-click context menu powered by the native dialog element.',
    usage: `<ContextMenu>\n  <ContextMenuTrigger>Right click this area</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Copy</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
    notes: [
      'Installs the commands polyfill when rendered.',
      'Menu content is focus-trapped via `<dialog>`.'
    ]
  },
  {
    slug: 'file-upload',
    title: 'File Upload',
    section: 'Components',
    category: 'Data Input',
    order: 8,
    folder: 'file-upload',
    description: 'Styled file input using ::file-selector-button to match the design system without hiding the native element.',
    usage: '<FileUpload accept="image/*" />',
    notes: [
      'Sets type="file" for you and forwards all native input props.',
      'Use the accept prop to restrict selectable file types.',
      'Use capture="user" or capture="environment" to invoke the camera on mobile.',
    ]
  },
  {
    slug: 'date-picker',
    title: 'Date Picker',
    section: 'Components',
    category: 'Data Input',
    order: 8,
    folder: 'date-picker',
    description: 'Styled date input that shares the same foundation as Calendar.',
    usage: '<DatePicker />',
    notes: [
      'Sets type="date" for you and forwards all native input props.',
      'Pairs nicely with popovers if you need a custom calendar shell.'
    ]
  },
  {
    slug: 'dialog',
    title: 'Dialog',
    section: 'Components',
    category: 'Actions',
    order: 3,
    folder: 'dialog',
    description: 'Composable modal built on the native `<dialog>` element.',
    usage: `<Dialog>\n  <DialogTrigger><Button>Open</Button></DialogTrigger>\n  <DialogContent>Modal body</DialogContent>\n  <DialogClose><Button>Close</Button></DialogClose>\n</Dialog>`,
    notes: [
      'Relies on command attributes instead of portal gymnastics.',
      'Dialog.Content forwards all native `<dialog>` props.'
    ]
  },
  {
    slug: 'drawer',
    title: 'Drawer',
    section: 'Components',
    category: 'Actions',
    order: 5,
    folder: 'drawer',
    description: 'Bottom sheet style overlay with trigger and close helpers.',
    usage: `<Drawer>\n  <DrawerTrigger><Button>Open</Button></DrawerTrigger>\n  <DrawerContent>Content</DrawerContent>\n  <DrawerClose><Button>Close</Button></DrawerClose>\n</Drawer>`,
    notes: [
      'Positions content with CSS variables so you can change direction.',
      'Attach Drawer.Close to any element that should dismiss.'
    ]
  },
  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    section: 'Components',
    category: 'Actions',
    order: 6,
    folder: 'dropdown-menu',
    description: 'Command-driven dropdown built on top of `<dialog>`.',
    usage: `<DropdownMenu>\n  <DropdownMenuTrigger><Button>Open</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Item</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
    notes: [
      'Menu items render as `<button>` elements by default.',
      'Automatically closes when an item dispatches the close command.'
    ]
  },
  {
    slug: 'hover-card',
    title: 'Hover Card',
    section: 'Components',
    category: 'Data Display',
    order: 8,
    folder: 'hover-card',
    description: 'Delayed hover preview card with trigger/content primitives.',
    usage: `<HoverCard>\n  <HoverCardTrigger>Hover me</HoverCardTrigger>\n  <HoverCardContent>Details</HoverCardContent>\n</HoverCard>`,
    notes: [
      'Uses CSS-only timers for opening and closing.',
      'Content positioning is handled via data attributes.'
    ]
  },
  {
    slug: 'input',
    title: 'Input',
    section: 'Components',
    category: 'Data Input',
    order: 1,
    folder: 'input',
    description: 'Text input with size, tone, and invalid states handled in CSS.',
    usage: '<Input placeholder="Email" type="email" />',
    notes: [
      'Wraps the native `<input>` element so forms behave as expected.',
      'Supports size="sm" and size="lg" for compact or spacious layouts.'
    ]
  },
  {
    slug: 'input-group',
    title: 'Input Group',
    section: 'Components',
    category: 'Data Input',
    order: 2,
    folder: 'input-group',
    description: 'Compact fieldset wrapper for joined controls like input and button rows.',
    usage: `<InputGroup>
  <Input placeholder="Search" />
  <Button variant="outline">Go</Button>
</InputGroup>`,
    notes: [
      'Uses CSS-only border and radius joining for grouped controls.',
      'Works with both PUI primitives and native form elements.'
    ]
  },
  {
    slug: 'label',
    title: 'Label',
    section: 'Components',
    category: 'Data Input',
    order: 9,
    folder: 'label',
    description: 'Typography-aligned label component for form controls.',
    usage: '<Label htmlFor="name">Name</Label>',
    notes: [
      'Wraps the native `<label>` element and forwards htmlFor.',
      'Pair with controls to provide accessible names.'
    ]
  },
  {
    slug: 'menubar',
    title: 'Menubar',
    section: 'Components',
    category: 'Navigation',
    order: 4,
    folder: 'menubar',
    description: 'Horizontal command bar composed of styled buttons.',
    usage: `<Menubar>\n  <MenubarItem>File</MenubarItem>\n</Menubar>`,
    notes: ['Pairs nicely with dropdowns for nested menus.']
  },
  {
    slug: 'navigation-menu',
    title: 'Navigation Menu',
    section: 'Components',
    category: 'Navigation',
    order: 3,
    folder: 'navigation-menu',
    description: 'Composable navigation with list, item, and link helpers.',
    usage: `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
    notes: [
      'Zero runtime state; rely on CSS for active styling.',
      'Ideal for top-level navigation bars.'
    ]
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    section: 'Components',
    category: 'Navigation',
    order: 5,
    folder: 'pagination',
    description: 'Semantic pagination list with previous/next helpers.',
    usage: `<Pagination>\n  <PaginationList>\n    <PaginationItem><PaginationLink aria-current="page">1</PaginationLink></PaginationItem>\n  </PaginationList>\n</Pagination>`,
    notes: [
      'Renders `<nav>` and list markup for accessibility.',
      'Use aria-current on the active page link.'
    ]
  },
  {
    slug: 'popover',
    title: 'Popover',
    section: 'Components',
    category: 'Layout',
    order: 2,
    folder: 'popover',
    description: 'Lightweight popover using native dialog with trigger/content primitives.',
    usage: `<Popover>\n  <PopoverTrigger><Button>Open</Button></PopoverTrigger>\n  <PopoverContent>Content</PopoverContent>\n  <PopoverClose><Button>Close</Button></PopoverClose>\n</Popover>`,
    notes: [
      'Control placement with the placement attribute on PopoverContent.',
      'Stays declarative thanks to the commands polyfill.'
    ]
  },
  {
    slug: 'progress',
    title: 'Progress',
    section: 'Components',
    category: 'Feedback',
    order: 3,
    folder: 'progress',
    description: 'Styled progress meter with determinate and indeterminate states.',
    usage: '<Progress value={60} max={100} />',
    notes: [
      'Wraps the native `<progress>` element for semantics.',
      'Use the data-state attribute for indeterminate styling.'
    ]
  },
  {
    slug: 'radio-group',
    title: 'Radio Group',
    section: 'Components',
    category: 'Data Input',
    order: 3,
    folder: 'radio-group',
    description: 'Container that styles a set of native radio inputs.',
    usage: `<RadioGroup>\n  <Radio name="plan" value="basic" />\n  <Radio name="plan" value="pro" />\n</RadioGroup>`,
    notes: [
      'Radio renders an `<input type="radio">` so browser form behavior stays intact.',
      'Use the native name/value model or controlled props to manage selection.'
    ]
  },
  {
    slug: 'resizable',
    title: 'Resizable',
    section: 'Components',
    category: 'Layout',
    order: 4,
    folder: 'resizable',
    description: 'Resizable container that exposes native CSS handles.',
    usage: '<Resizable style={{width: "20rem", height: "12rem"}} />',
    notes: [
      'Wraps a `<div>` with resize: both so the browser handles drag gestures.',
      'Perfect for scratchpads, preview panes, or demos where users adjust size.'
    ]
  },
  {
    slug: 'scroll-area',
    title: 'Scroll Area',
    section: 'Components',
    category: 'Layout',
    order: 3,
    folder: 'scroll-area',
    description: 'Overflow wrapper with custom scrollbars and shadow indicators.',
    usage: `<ScrollArea style={{height: '200px'}}><div>Long content</div></ScrollArea>`,
    notes: [
      'Applies scroll shadows using CSS masks.',
      'Forwards native overflow attributes for flexibility.'
    ]
  },
  {
    slug: 'select',
    title: 'Select',
    section: 'Components',
    category: 'Data Input',
    order: 4,
    folder: 'select',
    description: 'Styled native `<select>` element with size variants.',
    usage: `<Select>\n  <option>One</option>\n</Select>`,
    notes: [
      'Leverages the platform picker on touch devices.',
      'Supports native multiple and size attributes.'
    ]
  },
  {
    slug: 'separator',
    title: 'Separator',
    section: 'Components',
    category: 'Layout',
    order: 5,
    folder: 'separator',
    description: 'Semantic horizontal or vertical divider.',
    usage: '<Separator />',
    notes: [
      'Rendered as a `<div>` so you can set orientation via attribute.',
      'Use decorative when the separator is purely visual.'
    ]
  },
  {
    slug: 'sheet',
    title: 'Sheet',
    section: 'Components',
    category: 'Actions',
    order: 9,
    folder: 'sheet',
    description: 'Side or bottom sheet overlay with directional variants.',
    usage: `<Sheet>\n  <SheetTrigger><Button>Open</Button></SheetTrigger>\n  <SheetContent side="right">Panel</SheetContent>\n  <SheetClose><Button>Close</Button></SheetClose>\n</Sheet>`,
    notes: [
      'Control the slide direction with the side attribute on SheetContent.',
      'SheetClose attaches the close command to any child element.'
    ]
  },
  {
    slug: 'sidebar',
    title: 'Sidebar',
    section: 'Components',
    category: 'Layout',
    order: 6,
    folder: 'sidebar',
    description: 'Responsive sidebar dialog that collapses on mobile.',
    usage: `<Sidebar id="app-sidebar">\n  <nav>...</nav>\n</Sidebar>\n<SidebarTrigger commandFor="app-sidebar">Toggle</SidebarTrigger>`,
    notes: [
      'Renders a `<dialog>` so it can slide in as a modal on small screens.',
      'SidebarTrigger toggles the hidden/open state with the command attribute.'
    ]
  },
  {
    slug: 'spinner',
    title: 'Spinner',
    section: 'Components',
    category: 'Feedback',
    order: 2,
    folder: 'spinner',
    description: 'Inline loading indicator for compact pending states.',
    usage: '<Spinner aria-label="Loading" />',
    notes: [
      'Wraps a <span> and animates purely in CSS.',
      'Supports size="sm" and size="lg" attributes for dense or prominent loading states.'
    ]
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    section: 'Components',
    category: 'Data Display',
    order: 4,
    folder: 'skeleton',
    description: 'Animated shimmer placeholder for loading states.',
    usage: '<Skeleton style={{height: "1.5rem"}} />',
    notes: [
      'Wraps a `<div>` so you can size it however you want.',
      'Use data-rounded to switch to pill skeletons.'
    ]
  },
  {
    slug: 'slider',
    title: 'Slider',
    section: 'Components',
    category: 'Data Input',
    order: 5,
    folder: 'slider',
    description: 'Range input with CSS-driven track and thumb styling.',
    usage: '<Slider min={0} max={100} value={50} />',
    notes: [
      'Wraps `<input type="range">` for seamless form integration.',
      'Supports data-orientation for vertical sliders.'
    ]
  },
  {
    slug: 'switch',
    title: 'Switch',
    section: 'Components',
    category: 'Data Input',
    order: 6,
    folder: 'switch',
    description: 'Accessible toggle switch built from a checkbox input.',
    usage: '<Switch checked />',
    notes: [
      'It is just a checkbox under the hood so forms stay in sync.',
      'Use aria-label or pair with `<Label>` for accessible naming.'
    ]
  },
  {
    slug: 'table',
    title: 'Table',
    section: 'Components',
    category: 'Data Display',
    order: 2,
    folder: 'table',
    description: 'Table wrapper with zebra striping and compact density.',
    usage: `<Table>\n  <thead>...</thead>\n  <tbody>...</tbody>\n</Table>`,
    notes: [
      'Uses native `<table>` markup so semantics stay intact.',
      'Supports sticky headers via CSS attribute toggles.'
    ]
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    section: 'Components',
    category: 'Navigation',
    order: 1,
    folder: 'tabs',
    description: 'TabList, Tab, and TabPanel wrappers using aria attributes.',
    usage: `<TabList role="tablist">\n  <Tab role="tab" aria-selected="true">Account</Tab>\n  <Tab role="tab" aria-selected="false">Password</Tab>\n</TabList>\n<TabPanel role="tabpanel">Account settings</TabPanel>`,
    notes: [
      'Control selection state by toggling aria-selected.',
      'TabPanel toggles the hidden attribute so CSS handles transitions.'
    ]
  },
  {
    slug: 'textarea',
    title: 'Textarea',
    section: 'Components',
    category: 'Data Input',
    order: 10,
    folder: 'textarea',
    description: 'Text area with matching input styling, variants, and sizes.',
    usage: '<Textarea rows={4} placeholder="Write here" />',
    notes: [
      'Wraps the native `<textarea>` for full form support.',
      'Use the resize attribute to control user resizing.'
    ]
  },
  {
    slug: 'toggle',
    title: 'Toggle',
    section: 'Components',
    category: 'Data Input',
    order: 11,
    folder: 'toggle',
    description: 'ARIA-pressed aware button for on/off interactions.',
    usage: '<Toggle pressed={value}>Bold</Toggle>',
    notes: [
      'Wraps `<button>` so keyboard support comes for free.',
      'Use the `pressed` prop for state; it maps to `aria-pressed` on the DOM.'
    ]
  },
  {
    slug: 'toggle-group',
    title: 'Toggle Group',
    section: 'Components',
    category: 'Data Input',
    order: 12,
    folder: 'toggle-group',
    description: 'Container that lets Toggle buttons coordinate pressed state.',
    usage: `<ToggleGroup>\n  <Toggle>Bold</Toggle>\n  <Toggle>Italic</Toggle>\n</ToggleGroup>`,
    notes: [
      'Each Toggle toggles aria-pressed and clears other toggles in the same group.',
      'Pass props like disabled or value straight to the underlying `<button>`.'
    ]
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    section: 'Components',
    category: 'Feedback',
    order: 1,
    folder: 'tooltip',
    description: 'Hover/focus tooltip with placement attributes and CSS timing.',
    usage: '<Tooltip text="Info"><Button>Hover</Button></Tooltip>',
    notes: [
      'Uses data attributes for fade transitions.',
      'Position via the placement attribute without extra JS.'
    ]
  },
  {
    slug: 'typography',
    title: 'Typography',
    section: 'Foundations',
    category: 'Styling',
    order: 0,
    file: 'pages/typography.md'
  },
  {
    slug: 'toast',
    title: 'Toast',
    section: 'Components',
    category: 'Feedback',
    order: 5,
    file: 'pages/toast.md'
  },
  {
    slug: 'tree',
    title: 'Tree',
    section: 'Components',
    category: 'Data Display',
    order: 3,
    folder: 'tree',
    description: 'Composable tree view built from native `<details>` and `<summary>` primitives.',
    usage: `<Tree>\n  <Tree.Group open>\n    <Tree.GroupLabel>src</Tree.GroupLabel>\n    <Tree.GroupItems>\n      <Tree.Item>index.ts</Tree.Item>\n    </Tree.GroupItems>\n  </Tree.Group>\n</Tree>`,
    notes: [
      'State is native via the `open` attribute on `Tree.Group`.',
      'Nest `Tree.Group` inside `Tree.GroupItems` for deeper hierarchies.'
    ]
  }
];
