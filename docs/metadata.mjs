export default [
  {
    slug: 'overview',
    title: 'kinu Overview',
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
    slug: 'forms',
    title: 'Forms & Validation',
    section: 'Foundations',
    category: 'Forms',
    order: 4,
    file: 'pages/forms.md'
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
      'Provide your own `<summary>` element to define the trigger.',
      'Pass the same `name` to multiple accordions to make them mutually exclusive — only one can be open at a time in a group (HTML 2024 `<details name>`).'
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
    usage: '<Alert variant="info">Heads up!</Alert>',
    notes: [
      'Renders a `<div>` so you can include any markup you need.',
      'Supports `destructive`, `info`, `success`, and `warning` tone variants.'
    ]
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
      'Override dimensions in CSS if you need sizes other than the 2rem default.',
      'Wrap several avatars in `<Avatar.Group>` to get the overlapping stacked layout.'
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
    slug: 'chip',
    title: 'Chip',
    section: 'Components',
    category: 'Data Display',
    order: 0,
    folder: 'chip',
    description: 'Badge-like label with an optional inline action button.',
    usage: '<Chip>Tag<Chip.Button onClick={remove}>×</Chip.Button></Chip>',
    notes: [
      'Chip.Button fires standard click events with no custom event wiring.',
      'Use the selected attribute to mark a chip as active.',
      'Chip.Button automatically spans the full height and hugs the rounded edge.'
    ]
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
    slug: 'item',
    title: 'Item',
    section: 'Components',
    category: 'Actions',
    order: 0,
    folder: 'item',
    description: 'Generic selectable item for lists, menus, comboboxes, and more.',
    usage: '<Item selected>Inbox</Item>',
    notes: [
      'Renders as `<button>` by default, or `<a>` when href is provided.',
      'The same component works in every list-like context: List, Listbox, DropdownMenu, ContextMenu, Combobox.',
      'Also available as `.Item` on parent components (e.g. `DropdownMenu.Item`).',
      '`<Item.Field>` renders as `<label>` so the whole row acts as the click target for a nested form control — drop a `<Checkbox>`, `<Switch>`, `<Radio>`, `<Input>`, `<Slider>`, etc. inside it.'
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
    slug: 'listbox',
    title: 'Listbox',
    section: 'Components',
    category: 'Data Input',
    order: 7,
    folder: 'listbox',
    description: 'Non-modal filterable list for inline search and selection.',
    usage: `<Listbox>\n  <ListboxInput placeholder="Filter..." />\n  <ListboxList>\n    <ListboxOption>Apple</ListboxOption>\n  </ListboxList>\n</Listbox>`,
    notes: [
      'Selection is developer-controlled via the selected attribute on options.',
      'Shares filtering logic with Combobox via the filterItems utility.',
      'Unlike Combobox, the list is always visible with no dialog or popover.',
      'Compose with Dialog to build a command palette.'
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
      'Menu content is focus-trapped via `<dialog>`.',
      'Set `mobile="drawer"` on `ContextMenuContent` to render as a bottom-sheet on narrow viewports (≤640px).'
    ]
  },
  {
    slug: 'file-upload',
    title: 'File Upload',
    section: 'Components',
    category: 'Data Input',
    order: 8,
    folder: 'file-upload',
    description: 'Native file input with a styled button for selecting local files.',
    usage: '<FileUpload accept="image/*" />',
    notes: [
      'Sets type="file" for you and forwards all native input props.',
      'Use the accept prop to restrict selectable file types.',
      'Use capture="user" or capture="environment" to invoke the camera on mobile.'
    ]
  },
  {
    slug: 'color-picker',
    title: 'Color Picker',
    section: 'Components',
    category: 'Data Input',
    order: 7,
    folder: 'color-picker',
    description: 'Styled color swatch input that opens the native OS color picker.',
    usage: '<ColorPicker />',
    notes: [
      'Sets type="color" for you and forwards all native input props.',
      'Pairs naturally with `Input` inside an `InputGroup` to show an editable hex value alongside the swatch.',
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
    slug: 'time-picker',
    title: 'Time Picker',
    section: 'Components',
    category: 'Data Input',
    order: 9,
    folder: 'time-picker',
    description: 'Styled time input that shares the same foundation as Date Picker.',
    usage: '<TimePicker />',
    notes: [
      'Sets type="time" for you and forwards all native input props.',
      'Use the step prop to constrain selectable intervals, e.g. step={1800} for 30-minute increments.',
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
      'Dialog.Content forwards all native `<dialog>` props.',
      'For controlled state, pass `open` to `Dialog.Content` and wire `onClose` — the native `open` attribute is promoted to a modal by a small internal hook, and the browser\'s `close` event drives the state-sync callback.'
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
      'Automatically closes when an item dispatches the close command.',
      'Set `mobile="drawer"` on `DropdownMenuContent` to adapt to a bottom-sheet on narrow viewports (≤640px).'
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
      'Works with both kinu primitives and native form elements.'
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
      'Set `mobile="drawer"` on PopoverContent to render as a bottom-sheet drawer on small screens (≤640px).',
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
    slug: 'progress-ring',
    title: 'Progress Ring',
    section: 'Components',
    category: 'Feedback',
    order: 3,
    folder: 'progress-ring',
    description: 'Circular progress indicator rendered entirely in CSS via conic-gradient and a radial mask.',
    usage: '<ProgressRing value={60} max={100} />',
    notes: [
      'Pure CSS: uses typed `attr()` to read `value`/`max` directly from the DOM (Chrome 133+, Safari 18.4+, Firefox 140+).',
      'Omit `value` (or pass `undefined`) to render an indeterminate spinning ring, matching native `<progress>` semantics.',
      'Override `--k-progress-ring-size` and `--k-progress-ring-thickness` to customise dimensions.'
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
      'Pass `sticky` to make `<thead>` cells stick to the top of the nearest scroll container. Wrap the table in a scrollable element (e.g. `<div style={{maxHeight: \'12rem\', overflow: \'auto\'}}>`) so the header has somewhere to stick relative to.'
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
    slug: 'list',
    title: 'List',
    section: 'Components',
    category: 'Navigation',
    order: 1,
    folder: 'list',
    description: 'Interactive selectable list with shared item styling.',
    usage: `<List>\n  <List.Item selected>Inbox</List.Item>\n  <List.Item>Drafts</List.Item>\n</List>`,
    notes: [
      'Items render as `<button>` by default, or `<a>` when href is provided.',
      'Use variant="nav" for sidebar-style navigation with softer accent colors.',
      'Shares the same item styles as DropdownMenuItem and ComboboxOption.'
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
      'Use the resize attribute to control user resizing.',
      'Pass `autosize` to let the textarea grow with its content via native `field-sizing: content`. Supported in Chromium and Firefox; gracefully falls back to the fixed-height default elsewhere.'
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
    slug: 'kbd',
    title: 'Kbd',
    section: 'Components',
    category: 'Data Display',
    order: 3,
    folder: 'kbd',
    description: 'Styled `<kbd>` wrapper for keyboard shortcut glyphs.',
    usage: '<Kbd>⌘K</Kbd>',
    notes: [
      'Wraps the native `<kbd>` element so semantics stay intact.',
      'Combine multiple keys in a single `<Kbd>` (e.g. `⌘S`) to render them as one keycap.',
      "Pairs naturally with `Item` rows — drop a `<Kbd style={{marginLeft: 'auto'}}>` inside an item to show the shortcut on the trailing edge."
    ]
  },
  {
    slug: 'empty',
    title: 'Empty',
    section: 'Components',
    category: 'Data Display',
    order: 3,
    folder: 'empty',
    description: 'Centered placeholder for no-data / no-results states.',
    usage: `<Empty>\n  <h3>No results</h3>\n  <p>Try a different search.</p>\n</Empty>`,
    notes: [
      'Centers heading, body text, and optional actions in a flex column.',
      'Headings inherit the foreground color; body text defaults to muted foreground.'
    ]
  },
  {
    slug: 'field',
    title: 'Field',
    section: 'Components',
    category: 'Data Input',
    order: 0,
    folder: 'field',
    description: 'Layout wrapper that groups a label, control, description, and error message.',
    usage: `<Field>\n  <Field.Label>\n    Email\n    <Input type="email" required />\n  </Field.Label>\n  <Field.Description>We'll never share it</Field.Description>\n  <Field.Error>Please enter a valid email</Field.Error>\n</Field>`,
    notes: [
      'Nests the control inside `Field.Label` so native `<label>` implicit association handles pairing — no `id`/`htmlFor` plumbing needed.',
      '`Field.Label` is an alias of `Label`, so the regular label styles and props apply.',
      '`:has(:invalid)` turns the label destructive when any descendant control fails validation.',
      '`Field.Error` renders with `role="alert"` so assistive tech announces it when shown.'
    ]
  },
  {
    slug: 'otp-input',
    title: 'OTP Input',
    section: 'Components',
    category: 'Data Input',
    order: 2,
    folder: 'otp',
    description: 'Single `<input>` styled as N segmented one-time-code cells.',
    usage: '<OTPInput maxLength={6} />',
    notes: [
      'Defaults to `type="password"`, `inputMode="numeric"`, `autoComplete="one-time-code"`, and `pattern="\\\\d*"` — iOS SMS autofill, paste, and password managers just work.',
      'The visual cell count reads directly from the `maxlength` HTML attribute via CSS `attr()`, so just set `maxLength` and the cells follow.',
      'Each cell is `--k-otp-cell` wide (defaults to `2.5rem`); total input width is `maxLength × --k-otp-cell`. Override the variable to resize.'
    ]
  },
  {
    slug: 'timeline',
    title: 'Timeline',
    section: 'Components',
    category: 'Data Display',
    order: 4,
    folder: 'timeline',
    description: 'Vertical sequence of events with connecting line + dot markers.',
    usage: `<Timeline>\n  <Timeline.Entry>\n    Jason pushed 3 commits\n    <time>2h ago</time>\n  </Timeline.Entry>\n</Timeline>`,
    notes: [
      'Renders as `<ol>` + `<li>` so activity feeds and audit logs stay semantic.',
      'Dot and connector line are both drawn on each entry from one `--k-timeline-x` variable (the dot radius), so they can\'t drift out of alignment.',
      'Drop a native `<time>` element inside an entry for the trailing timestamp — add `dateTime="..."` for machine-readable semantics.'
    ]
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
  },
  {
    slug: 'status',
    title: 'Status',
    section: 'Components',
    category: 'Data Display',
    order: 4,
    folder: 'status',
    description: 'Inline status indicator with a colored dot prefix, usable with or without a label.',
    usage: '<Status variant="success">Online</Status>',
    notes: [
      'Dual-purpose: render with children for a dot + label, or without children for a bare dot. When used as a bare dot, supply `aria-label` so screen readers have something to announce — the same text is revealed as a tooltip on hover/focus so sighted users get it too.',
      'Variants mirror the semantic color tokens and match `Alert`: `success`, `warning`, `info`, `destructive`. Omit the variant for a neutral muted dot.',
      'The dot and gap are sized in `em`, so everything scales with the surrounding font-size — drop a Status inside a heading or a small footer and it follows.',
      'Pass `pulse` to animate a "ping" ring for live/loading states. Honors `prefers-reduced-motion` via the base stylesheet.'
    ]
  },
  {
    slug: 'meter',
    title: 'Meter',
    section: 'Components',
    category: 'Feedback',
    order: 3,
    folder: 'meter',
    description: 'Native `<meter>` wrapper for measurement values (disk quota, password strength, rating summary).',
    usage: '<Meter value={0.7} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />',
    notes: [
      'Forwards every native `<meter>` attribute.',
      'Fill color reflects the value range: primary when in the optimum band, warning in the suboptimum band, destructive outside.'
    ]
  },
  {
    slug: 'prose',
    title: 'Prose',
    section: 'Components',
    category: 'Data Display',
    order: 5,
    folder: 'prose',
    description: 'Typography wrapper that styles nested HTML (markdown output, CMS content, article bodies).',
    usage: '<Prose><h1>Title</h1><p>Body...</p></Prose>',
    notes: [
      'Tune spacing, font, and heading weight via CSS variables: `--k-prose-spacing`, `--k-prose-font`, `--k-prose-heading-weight`.',
      'Only styles direct and nested standard elements; does not touch Kinu components used inside.',
      'First/last child margins are zeroed so the wrapper can drop into any layout without margin collapse.'
    ]
  },
  {
    slug: 'stack',
    title: 'Stack',
    section: 'Components',
    category: 'Layout',
    order: 0,
    folder: 'stack',
    description: 'Vertical flow layout — a flex column with a token-based gap.',
    usage: `<Stack gap="md">\n  <div>One</div>\n  <div>Two</div>\n</Stack>`,
    notes: [
      'CSS-only: renders a `<div k="stack">` with `display:flex;flex-direction:column`. Zero JavaScript.',
      'Set `gap` to a spacing-scale step (`0`, `xs`, `sm`, `md`, `lg`, `xl`); it maps to the `--k-space-*` tokens and defaults to `md`.',
      'Use `align` (cross-axis) and `justify` (main-axis) to position children.'
    ]
  },
  {
    slug: 'cluster',
    title: 'Cluster',
    section: 'Components',
    category: 'Layout',
    order: 1,
    folder: 'cluster',
    description: 'Horizontal wrap row with a token-based gap — chip rows, button rows, toolbars.',
    usage: `<Cluster gap="sm">\n  <Badge>One</Badge>\n  <Badge>Two</Badge>\n</Cluster>`,
    notes: [
      'CSS-only: renders a `<div k="cluster">` with `display:flex;flex-wrap:wrap`. Zero JavaScript.',
      'Items wrap to new rows as needed; `align` defaults to `center` and `gap` defaults to `sm`.',
      'Reach for it whenever you have a row of badges, chips, buttons, or filters that should wrap gracefully.'
    ]
  },
  {
    slug: 'grid',
    title: 'Grid',
    section: 'Components',
    category: 'Layout',
    order: 2,
    folder: 'grid',
    description: 'Responsive auto-fit grid with a token-based gap — dashboards, card galleries.',
    usage: `<Grid gap="md" min="sm">\n  <Card>One</Card>\n  <Card>Two</Card>\n</Grid>`,
    notes: [
      'CSS-only: renders a `<div k="grid">` using `repeat(auto-fit, minmax(...))`. Zero JavaScript.',
      'By default it fits as many columns as will hold the `min` width (presets `xs`–`xl`, default `md` = 16rem); override arbitrarily with the `--k-grid-min` custom property.',
      'Pass `cols={3}` for a fixed equal-column grid instead of the responsive behaviour.'
    ]
  },
  {
    slug: 'app-shell',
    title: 'App Shell',
    section: 'Components',
    category: 'Layout',
    order: 3,
    folder: 'app-shell',
    description: 'Full-page application scaffold — header, sidebar, main, and footer in a CSS grid.',
    usage: `<AppShell>\n  <AppShell.Header>Acme</AppShell.Header>\n  <AppShell.Sidebar>{/* nav */}</AppShell.Sidebar>\n  <AppShell.Main>{/* content */}</AppShell.Main>\n  <AppShell.Footer>© 2026</AppShell.Footer>\n</AppShell>`,
    notes: [
      'CSS-only: a `<div k="app-shell">` using named grid areas, `min-height:100dvh`, and semantic `<header>`/`<aside>`/`<main>`/`<footer>` parts. Zero JavaScript.',
      'Collapses to a single column at ≤48rem; the inline sidebar rail hides so you can hand mobile navigation to the modal `Sidebar` dialog.',
      'Compound parts: `AppShell.Header`, `AppShell.Sidebar`, `AppShell.Main`, `AppShell.Footer`. Style each region with normal CSS or inline styles.'
    ]
  },
  {
    slug: 'row',
    title: 'Row',
    section: 'Components',
    category: 'Layout',
    order: 4,
    folder: 'row',
    description: 'Horizontal flow layout — a flex row with a token-based gap.',
    usage: `<Row gap="sm" justify="between">\n  <strong>Title</strong>\n  <Button>Save</Button>\n</Row>`,
    notes: [
      'CSS-only: renders a `<div k="row">` with `display:flex`. The horizontal sibling of `Stack`. Zero JavaScript.',
      '`gap` (default `sm`), `align` (default `center`), and `justify` mirror the other layout primitives.',
      'Does not wrap by default — pass `wrap`, or reach for `Cluster` when wrapping is the point.'
    ]
  },
  {
    slug: 'center',
    title: 'Center',
    section: 'Components',
    category: 'Layout',
    order: 5,
    folder: 'center',
    description: 'Centers its content horizontally and vertically with CSS grid.',
    usage: `<Center style={{height: '10rem'}}>\n  <span>Centered</span>\n</Center>`,
    notes: [
      'CSS-only: `<div k="center">` using `display:grid;place-items:center`. Give it a size (or let it fill its parent) and the child centers on both axes.',
      'Pass `inline` to shrink to the content and center inline instead of filling the box.'
    ]
  },
  {
    slug: 'spacer',
    title: 'Spacer',
    section: 'Components',
    category: 'Layout',
    order: 6,
    folder: 'spacer',
    description: 'Flexible spacer that pushes siblings apart, or a fixed gap block.',
    usage: `<Row>\n  <Button>Back</Button>\n  <Spacer />\n  <Button>Next</Button>\n</Row>`,
    notes: [
      'CSS-only: `<div k="spacer">` with `flex:1` so it grows to push siblings to opposite ends of a Row, Cluster, or Stack.',
      'Pass `size` (`xs`–`xl`) to render a fixed gap (via `flex-basis`) that works along either axis instead of growing.'
    ]
  },
  {
    slug: 'rating',
    title: 'Rating',
    section: 'Components',
    category: 'Data Input',
    order: 13,
    folder: 'rating',
    description: 'Star rating built from a native radio group — form-associated, zero JavaScript.',
    usage: '<Rating name="score" value={3} />',
    notes: [
      'Pure CSS: renders N `<input type="radio">` + `<label>` pairs inside a `<span k="rating">`. Keyboard-accessible and form-submittable for free.',
      'Set `name` (required) and an optional initial `value`; the chosen star submits with the form.',
      'Pass `readOnly` to show an average as a non-interactive display, `count` to change the number of stars, and `size` (`sm`/`md`/`lg`) to scale.'
    ]
  },
  {
    slug: 'number-field',
    title: 'Number Field',
    section: 'Components',
    category: 'Data Input',
    order: 14,
    folder: 'number-field',
    description: 'Native number input with stepper buttons driven by the command bus.',
    usage: '<NumberField defaultValue={3} min={0} max={10} />',
    notes: [
      'Wraps a native `<input type="number">` in an `InputGroup` with − / + buttons. Forwards every native input attribute (`min`, `max`, `step`, `value`, `name`, …).',
      'The buttons use `command="--step-up"`/`"--step-down"` on the existing command bus — no new global listeners — and the input calls native `stepUp()`/`stepDown()`, firing `input`/`change` so forms stay in sync.',
      'Native Invoker Commands are Baseline; the bundled `installCommands()` polyfill is the fallback for older Safari.'
    ]
  },
  {
    slug: 'copy-button',
    title: 'Copy Button',
    section: 'Components',
    category: 'Actions',
    order: 10,
    folder: 'copy-button',
    description: 'One-tap copy-to-clipboard button with a CSS-only copied state.',
    usage: '<CopyButton value="npm install kinu" />',
    notes: [
      'Pass `value` to copy a string, or `for` (a CSS selector) to copy another element’s `textContent`.',
      'The idle and copied labels render via CSS `attr()` (`label` / `copiedLabel`), so the success state needs no JS text swap — the handler just toggles a `[copied]` attribute for ~1.2s.',
      'SSR-safe: `navigator.clipboard` is only touched inside the click handler, which runs client-side.'
    ]
  },
  {
    slug: 'stat',
    title: 'Stat',
    section: 'Components',
    category: 'Data Display',
    order: 9,
    folder: 'stat',
    description: 'Metric block with a label, large value, and a trend-colored delta.',
    usage: `<Stat>\n  <Stat.Label>Revenue</Stat.Label>\n  <Stat.Value>$48,200</Stat.Value>\n  <Stat.Delta trend="up">+12.5%</Stat.Delta>\n</Stat>`,
    notes: [
      'Pure CSS presentation. Compound parts: `Stat.Label`, `Stat.Value`, `Stat.Delta`.',
      '`Stat.Delta` takes `trend` (`up` / `down` / `flat`) which colors it via the semantic success/destructive tokens.',
      'Drops naturally into a `Grid` for dashboard stat rows.'
    ]
  },
  {
    slug: 'stepper',
    title: 'Stepper',
    section: 'Components',
    category: 'Data Display',
    order: 10,
    folder: 'stepper',
    description: 'Horizontal ordered steps with numbered markers and connectors.',
    usage: `<Stepper>\n  <Stepper.Step state="complete">Cart</Stepper.Step>\n  <Stepper.Step state="current">Payment</Stepper.Step>\n  <Stepper.Step>Review</Stepper.Step>\n</Stepper>`,
    notes: [
      'Pure CSS: renders `<ol k="steps">` + `<li k="step">`. Markers are auto-numbered with CSS counters and joined by line connectors. Zero JavaScript.',
      '`Stepper.Step` takes `state` (`upcoming` / `current` / `complete`): complete shows a check on a filled marker, current outlines it in the primary color.',
      'Distinct from `Timeline` (vertical event feed) and `Progress` (continuous bar).'
    ]
  },
  {
    slug: 'message',
    title: 'Message',
    section: 'Components',
    category: 'Conversation',
    order: 0,
    folder: 'message',
    description: 'Chat message bubble with author-driven color and alignment.',
    usage: `<Message from="user">\n  <Message.Avatar>JM</Message.Avatar>\n  <Message.Bubble>Hello</Message.Bubble>\n</Message>`,
    notes: [
      'Pure CSS: `<div k="message" from="user|assistant|system">`. `from` flips alignment and colors the bubble (user = primary, assistant = muted, system = quiet italic).',
      'Compound parts: `Message.Avatar` (a small round badge) and `Message.Bubble` (the content). Drop a `<Prose>` inside the bubble to render markdown.'
    ]
  },
  {
    slug: 'thread',
    title: 'Thread',
    section: 'Components',
    category: 'Conversation',
    order: 1,
    folder: 'thread',
    description: 'Message list that sticks to the bottom as new messages arrive.',
    usage: `<Thread scrollable style={{height: '20rem'}}>\n  <Message from="user"><Message.Bubble>Hi</Message.Bubble></Message>\n</Thread>`,
    notes: [
      'Pass `scrollable` to make it a scroll container. New messages pin the viewport to the bottom via native scroll anchoring (a 1px bottom anchor) — no `scrollTo` loop and no JavaScript.',
      'Progressive enhancement: where scroll anchoring is unsupported it degrades to a normal scroll container.',
      'Fill it with `Message` components; size it with a height (or let it fill a flex parent).'
    ]
  },
  {
    slug: 'composer',
    title: 'Composer',
    section: 'Components',
    category: 'Conversation',
    order: 2,
    folder: 'composer',
    description: 'Chat input form — autosizing textarea with Enter-to-send.',
    usage: `<Composer onSubmit={send}>\n  <Textarea autosize rows={1} placeholder="Message…" />\n  <Composer.Actions>\n    <Composer.Send>Send</Composer.Send>\n  </Composer.Actions>\n</Composer>`,
    notes: [
      'Renders a `<form k="composer">` around a `Textarea` (use `autosize` so it grows with content). Enter submits, Shift+Enter inserts a newline — a single delegated keydown calls `form.requestSubmit()`, and it is IME-safe.',
      'Compound parts: `Composer.Send` (a submit button, pushed to the trailing edge) and `Composer.Actions` (a row for attach / model controls — compose `FileUpload`, `Select`, etc.).',
      'No engine: a typing indicator is just `<Spinner>`, and suggestions are a `Cluster` of `Chip`. Bring your own submit handler.'
    ]
  },
  {
    slug: 'form',
    title: 'Form',
    section: 'Components',
    category: 'Data Input',
    order: 15,
    folder: 'form',
    description: 'Form wrapper that runs native validation before your submit handler.',
    usage: `<Form onValid={save}>\n  <Field>...</Field>\n  <Button type="submit">Save</Button>\n</Form>`,
    notes: [
      'No form-state engine. On submit it runs `checkValidity()`: if the form is invalid it blocks submission and focuses the first invalid control; otherwise it calls `onValid` with the event.',
      'Pairs with the native-validation CSS layer (`:user-invalid`) and `Field` / `Field.Error` — see the Forms & Validation page. You never manage `touched` or `errors` state.',
      'Bring your own submit in `onValid` (e.g. `e.preventDefault()` then POST).'
    ]
  },
  {
    slug: 'command',
    title: 'Command',
    section: 'Components',
    category: 'Actions',
    order: 11,
    folder: 'command',
    description: 'Command palette — a modal Dialog hosting a filterable Listbox.',
    usage: `<Dialog id="cmdk">\n  <Dialog.Trigger><Button>⌘K</Button></Dialog.Trigger>\n  <Command>\n    <Command.Input placeholder="Search…" />\n    <Command.List>\n      <Item>Search docs</Item>\n    </Command.List>\n  </Command>\n</Dialog>`,
    notes: [
      'A pure composition of shipped parts: a modal `Dialog` hosting a `Listbox`. The Listbox supplies substring filtering (`Command.Input`) and keyboard navigation; the Dialog supplies the modal + focus trap. No fuzzy-search engine.',
      'Place it inside a `Dialog` and open with a `Dialog.Trigger` or a hotkey (`commandfor` + `command="show-modal"`).',
      'Items are regular `Item`s, so they support `shortcut`, `destructive`, and `href`.'
    ]
  },
  {
    slug: 'tags-input',
    title: 'Tags Input',
    section: 'Components',
    category: 'Data Input',
    order: 16,
    folder: 'tags-input',
    description: 'Token / tags input that submits natively via a hidden field.',
    usage: `<TagsInput name="tags" value={['design', 'frontend']} placeholder="Add a tag…" />`,
    notes: [
      'Type and press Enter (or the `separator`) to add a tag; Backspace on an empty field removes the last; click a chip’s × to remove it. Each change rewrites a hidden `<input name>` and fires `input`/`change`, so it submits with a normal form.',
      'A single per-instance ref manages the chips imperatively — no framework state store. SSR-safe: tags render on mount.',
      'The submitted value is the tags joined by `separator` (default `,`). API: `name`, `value` (string[]), `separator`, `max`, `duplicates`.'
    ]
  }
];
