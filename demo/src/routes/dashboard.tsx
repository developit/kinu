import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Select,
  Textarea,
  Switch,
  Slider,
  Progress,
  TabList,
  Tab,
  TabPanel,
  Alert,
  AlertDialog,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  Separator,
  Calendar,
  DatePicker,
  Table,
  ScrollArea,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  Menubar,
  MenubarItem,
  AspectRatio,
  Collapsible,
  Toggle,
  ToggleGroup,
  Carousel,
  CarouselItem,
  Checkbox,
  RadioGroup,
  Radio,
  Label,
  Accordion,
  Skeleton,
  toast,
} from 'pui';
import {useState, useEffect, useRef} from 'preact/hooks';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  description?: string;
}

interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
}

interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    title: 'Salary',
    amount: 5000,
    category: 'Income',
    date: '2024-01-01',
    type: 'income',
  },
  {
    id: 2,
    title: 'Groceries',
    amount: 240,
    category: 'Food',
    date: '2024-01-02',
    type: 'expense',
  },
  {
    id: 3,
    title: 'Gas',
    amount: 60,
    category: 'Transportation',
    date: '2024-01-03',
    type: 'expense',
  },
  {
    id: 4,
    title: 'Freelance',
    amount: 800,
    category: 'Income',
    date: '2024-01-04',
    type: 'income',
  },
  {
    id: 5,
    title: 'Coffee',
    amount: 25,
    category: 'Food',
    date: '2024-01-05',
    type: 'expense',
  },
  {
    id: 6,
    title: 'Netflix',
    amount: 15,
    category: 'Entertainment',
    date: '2024-01-06',
    type: 'expense',
  },
];

const initialGoals: Goal[] = [
  {
    id: 1,
    title: 'Emergency Fund',
    target: 10000,
    current: 7500,
    deadline: '2024-12-31',
    category: 'Savings',
  },
  {
    id: 2,
    title: 'Vacation Fund',
    target: 3000,
    current: 1200,
    deadline: '2024-08-01',
    category: 'Travel',
  },
  {
    id: 3,
    title: 'New Laptop',
    target: 2500,
    current: 800,
    deadline: '2024-06-01',
    category: 'Tech',
  },
];

const budgetCategories: BudgetCategory[] = [
  {name: 'Food', budgeted: 500, spent: 265, color: '#ef4444'},
  {name: 'Transportation', budgeted: 200, spent: 120, color: '#3b82f6'},
  {name: 'Entertainment', budgeted: 150, spent: 45, color: '#8b5cf6'},
  {name: 'Shopping', budgeted: 300, spent: 180, color: '#f59e0b'},
  {name: 'Bills', budgeted: 800, spent: 750, color: '#10b981'},
];

const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Education',
  'Income',
];

function OverviewTab() {
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const totalIncome = initialTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = initialTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const quickActions = [
    {
      id: 'add-income',
      label: 'Quick Add Income',
      icon: 'lucide:plus-circle',
      action: () =>
        toast.show('Quick income form opened!', {title: 'Feature Demo'}),
    },
    {
      id: 'add-expense',
      label: 'Quick Add Expense',
      icon: 'lucide:minus-circle',
      action: () =>
        toast.show('Quick expense form opened!', {title: 'Feature Demo'}),
    },
    {
      id: 'set-budget',
      label: 'Adjust Budget',
      icon: 'lucide:target',
      action: () =>
        toast.show('Budget adjustment panel opened!', {title: 'Feature Demo'}),
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'lucide:download',
      action: () =>
        toast.show('Data export initiated!', {title: 'Feature Demo'}),
    },
  ];

  return (
    <div className="dashboard-overview">
      {/* Command Bar with Dropdown Actions */}
      <Card style={{padding: '1rem', marginBottom: '2rem'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:zap"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Quick Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {quickActions.map((action) => (
                  <DropdownMenuItem key={action.id} onClick={action.action}>
                    <iconify-icon
                      icon={action.icon}
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    ></iconify-icon>
                    {action.label}
                  </DropdownMenuItem>
                ))}
                <Separator />
                <DropdownMenuItem
                  onClick={() =>
                    toast.show('Settings opened!', {title: 'Demo'})
                  }
                >
                  <iconify-icon
                    icon="lucide:settings"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:calendar"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  {selectedTimeframe}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedTimeframe('week')}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedTimeframe('month')}>
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedTimeframe('quarter')}
                >
                  This Quarter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedTimeframe('year')}>
                  This Year
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Toggle
              pressed={showAdvancedMetrics}
              onPressedChange={setShowAdvancedMetrics}
            >
              <iconify-icon
                icon="lucide:microscope"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              ></iconify-icon>
              Advanced Metrics
            </Toggle>
          </div>

          <div style={{display: 'flex', gap: '0.5rem'}}>
            <Tooltip title="Refresh Data">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => toast.show('Data refreshed!', {icon: 'Refresh'})}
              >
                <iconify-icon
                  icon="lucide:refresh-cw"
                  width="16"
                  height="16"
                ></iconify-icon>
              </Button>
            </Tooltip>
            <Tooltip title="Share Dashboard">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => toast.show('Share link copied!', {icon: 'Link'})}
              >
                <iconify-icon
                  icon="lucide:share-2"
                  width="16"
                  height="16"
                ></iconify-icon>
              </Button>
            </Tooltip>
            <Tooltip title="Print Report">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => toast.show('Report printed!', {icon: 'Print'})}
              >
                <iconify-icon
                  icon="lucide:printer"
                  width="16"
                  height="16"
                ></iconify-icon>
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card>

      {/* Enhanced Stats Grid with Context Menus and Hover Cards */}
      <div className="stats-grid">
        <ContextMenu>
          <ContextMenuTrigger>
            <HoverCard>
              <HoverCardTrigger>
                <Card className="stat-card income" style={{cursor: 'pointer'}}>
                  <div className="stat-header">
                    <h3>Total Income</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button size="icon" variant="ghost">
                          <iconify-icon
                            icon="lucide:more-horizontal"
                            width="16"
                            height="16"
                          ></iconify-icon>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => toast.show('Income details opened!')}
                        >
                          <iconify-icon
                            icon="lucide:list"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.show('Income forecast opened!')}
                        >
                          <iconify-icon
                            icon="lucide:trending-up"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          />
                          Forecast
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.show('Income sources opened!')}
                        >
                          <iconify-icon
                            icon="lucide:building-2"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          ></iconify-icon>
                          Sources
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="stat-value">
                    ${totalIncome.toLocaleString()}
                  </div>
                  <div className="stat-change positive">
                    +12% from last month
                  </div>
                  {showAdvancedMetrics && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'hsl(var(--p-muted-foreground))',
                      }}
                    >
                      <div>Avg per day: ${(totalIncome / 30).toFixed(2)}</div>
                      <div>Growth rate: +2.3%/month</div>
                    </div>
                  )}
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <div style={{padding: '1rem'}}>
                  <h4 style={{margin: '0 0 0.5rem 0'}}>Income Breakdown</h4>
                  <div style={{fontSize: '0.875rem'}}>
                    <div>
                      <iconify-icon
                        icon="lucide:briefcase"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Salary: $4,200
                    </div>
                    <div>
                      <iconify-icon
                        icon="lucide:trophy"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Freelance: $800
                    </div>
                    <div>
                      <iconify-icon
                        icon="lucide:trending-up"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />
                      Investments: $200
                    </div>
                    <div>
                      <iconify-icon
                        icon="lucide:gift"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Other: $100
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => toast.show('Income analysis opened!')}
            >
              <iconify-icon
                icon="lucide:bar-chart-3"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />
              Analyze Trends
            </ContextMenuItem>
            <ContextMenuItem onClick={() => toast.show('Set income goal!')}>
              <iconify-icon
                icon="lucide:target"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              ></iconify-icon>
              Set Goal
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => toast.show('Income alerts configured!')}
            >
              <iconify-icon
                icon="lucide:bell"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />{' '}
              Configure Alerts
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <ContextMenu>
          <ContextMenuTrigger>
            <HoverCard>
              <HoverCardTrigger>
                <Card
                  className="stat-card expenses"
                  style={{cursor: 'pointer'}}
                >
                  <div className="stat-header">
                    <h3>Total Expenses</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button size="icon" variant="ghost">
                          ⋯
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            toast.show('Expense breakdown opened!')
                          }
                        >
                          <iconify-icon
                            icon="lucide:list"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          />
                          Breakdown
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toast.show('Spending patterns opened!')
                          }
                        >
                          <iconify-icon
                            icon="lucide:trending-down"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          ></iconify-icon>
                          Patterns
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.show('Budget alerts opened!')}
                        >
                          <iconify-icon
                            icon="lucide:alert-triangle"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          ></iconify-icon>
                          Alerts
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="stat-value">
                    ${totalExpenses.toLocaleString()}
                  </div>
                  <div className="stat-change negative">
                    +5% from last month
                  </div>
                  {showAdvancedMetrics && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'hsl(var(--p-muted-foreground))',
                      }}
                    >
                      <div>Avg per day: ${(totalExpenses / 30).toFixed(2)}</div>
                      <div>Highest: Food ($265)</div>
                    </div>
                  )}
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <div style={{padding: '1rem'}}>
                  <h4 style={{margin: '0 0 0.5rem 0'}}>
                    Top Expense Categories
                  </h4>
                  <div style={{fontSize: '0.875rem'}}>
                    <div>🍕 Food: $265 (79% of budget)</div>
                    <div>🚗 Transport: $120 (60% of budget)</div>
                    <div>🎬 Entertainment: $45 (30% of budget)</div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => toast.show('Expense optimization opened!')}
            >
              <iconify-icon
                icon="lucide:zap"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              ></iconify-icon>
              Optimize Spending
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => toast.show('Category budgets opened!')}
            >
              <iconify-icon
                icon="lucide:tag"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />
              Set Category Budgets
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => toast.show('Expense alerts configured!')}
            >
              <iconify-icon
                icon="lucide:bell"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />{' '}
              Alert Setup
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <ContextMenu>
          <ContextMenuTrigger>
            <Card className="stat-card net" style={{cursor: 'pointer'}}>
              <div className="stat-header">
                <h3>Net Income</h3>
                <Tooltip title="Net Income = Total Income - Total Expenses">
                  <Button size="icon" variant="ghost">
                    <iconify-icon
                      icon="lucide:info"
                      width="16"
                      height="16"
                    ></iconify-icon>
                  </Button>
                </Tooltip>
              </div>
              <div className="stat-value">${netIncome.toLocaleString()}</div>
              <div className="stat-change positive">+8% from last month</div>
              {showAdvancedMetrics && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'hsl(var(--p-muted-foreground))',
                  }}
                >
                  <div>
                    Monthly trend:{' '}
                    <iconify-icon
                      icon="lucide:trending-up"
                      width="16"
                      height="16"
                      style={{marginLeft: '0.25rem', marginRight: '0.25rem'}}
                    ></iconify-icon>
                    Improving
                  </div>
                  <div>6-month avg: ${(netIncome * 0.95).toFixed(0)}</div>
                </div>
              )}
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => toast.show('Net income projections opened!')}
            >
              <iconify-icon
                icon="lucide:trending-up"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />
              Project Future
            </ContextMenuItem>
            <ContextMenuItem onClick={() => toast.show('Savings plan opened!')}>
              <iconify-icon
                icon="lucide:piggy-bank"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              ></iconify-icon>
              Plan Savings
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => toast.show('Investment suggestions opened!')}
            >
              <iconify-icon
                icon="lucide:bar-chart-3"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />
              Investment Ideas
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <ContextMenu>
          <ContextMenuTrigger>
            <Card className="stat-card savings" style={{cursor: 'pointer'}}>
              <div className="stat-header">
                <h3>Savings Rate</h3>
                <Badge
                  variant={
                    netIncome / totalIncome > 0.2 ? 'default' : 'destructive'
                  }
                >
                  {netIncome / totalIncome > 0.2 ? (
                    <>
                      <iconify-icon
                        icon="lucide:check-circle"
                        width="16"
                        height="16"
                        style={{marginRight: '0.25rem'}}
                      ></iconify-icon>
                      On Track
                    </>
                  ) : (
                    <>
                      <iconify-icon
                        icon="lucide:alert-triangle"
                        width="16"
                        height="16"
                        style={{marginRight: '0.25rem'}}
                      ></iconify-icon>
                      Below Target
                    </>
                  )}
                </Badge>
              </div>
              <div className="stat-value">
                {Math.round((netIncome / totalIncome) * 100)}%
              </div>
              <div className="stat-change positive">Target: 20%</div>
              {showAdvancedMetrics && (
                <div style={{marginTop: '0.5rem'}}>
                  <Progress
                    value={(netIncome / totalIncome) * 100}
                    max={20}
                    style={{height: '4px'}}
                  />
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'hsl(var(--p-muted-foreground))',
                      marginTop: '0.25rem',
                    }}
                  >
                    Need ${(totalIncome * 0.2 - netIncome).toFixed(0)} more to
                    hit target
                  </div>
                </div>
              )}
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => toast.show('Savings optimizer opened!')}
            >
              <iconify-icon
                icon="lucide:target"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              ></iconify-icon>
              Optimize Savings
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => toast.show('Savings goals opened!')}
            >
              <iconify-icon
                icon="lucide:lightbulb"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />{' '}
              Set Goals
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => toast.show('Auto-save setup opened!')}
            >
              <iconify-icon
                icon="lucide:bot"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />{' '}
              Auto-Save Setup
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* Alerts Section */}
      {alertsEnabled && (
        <Alert style={{margin: '2rem 0'}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>
                <iconify-icon
                  icon="lucide:lightbulb"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Smart Insight:
              </strong>{' '}
              You're spending 30% more on food this month.
              <Button
                variant="link"
                onClick={() => toast.show('Food spending analysis opened!')}
              >
                View details →
              </Button>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setAlertsEnabled(false)}
            >
              ✕
            </Button>
          </div>
        </Alert>
      )}

      {/* Enhanced Dashboard Row with More Interactions */}
      <div className="dashboard-row">
        <Card className="budget-overview">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{margin: 0}}>Budget Overview</h3>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <Tooltip title="Add New Category">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => toast.show('Add category form opened!')}
                >
                  ➕
                </Button>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="icon" variant="outline">
                    <iconify-icon
                      icon="lucide:settings"
                      width="16"
                      height="16"
                    ></iconify-icon>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => toast.show('Budget settings opened!')}
                  >
                    <iconify-icon
                      icon="lucide:wrench"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    ></iconify-icon>
                    Budget Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toast.show('Reset budgets confirmed!')}
                  >
                    <iconify-icon
                      icon="lucide:refresh-cw"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Reset All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toast.show('Budget templates opened!')}
                  >
                    <iconify-icon
                      icon="lucide:file-text"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    ></iconify-icon>
                    Templates
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem
                    onClick={() => toast.show('Budget exported!')}
                  >
                    <iconify-icon
                      icon="lucide:download"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    ></iconify-icon>
                    Export
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="budget-categories">
            {budgetCategories.map((category) => {
              const percentage = (category.spent / category.budgeted) * 100;
              const isOverBudget = percentage > 100;

              return (
                <ContextMenu key={category.name}>
                  <ContextMenuTrigger>
                    <div
                      className="budget-category"
                      style={{cursor: 'pointer'}}
                    >
                      <div className="budget-header">
                        <HoverCard>
                          <HoverCardTrigger>
                            <span className="category-name">
                              {category.name}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div style={{padding: '1rem'}}>
                              <h4 style={{margin: '0 0 0.5rem 0'}}>
                                {category.name} Details
                              </h4>
                              <div style={{fontSize: '0.875rem'}}>
                                <div>
                                  <iconify-icon
                                    icon="lucide:target"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  ></iconify-icon>
                                  Budget: ${category.budgeted}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:credit-card"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  ></iconify-icon>
                                  Spent: ${category.spent}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:wallet"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  ></iconify-icon>
                                  Remaining: $
                                  {category.budgeted - category.spent}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:bar-chart-3"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />
                                  Usage: {percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <span
                            className={`budget-amount ${isOverBudget ? 'over-budget' : ''}`}
                          >
                            ${category.spent} / ${category.budgeted}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                size="icon"
                                variant="ghost"
                                style={{width: '1.5rem', height: '1.5rem'}}
                              >
                                ⋯
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.show(
                                    `${category.name} budget adjusted!`,
                                  )
                                }
                              >
                                <iconify-icon
                                  icon="lucide:edit"
                                  width="16"
                                  height="16"
                                  style={{marginRight: '0.5rem'}}
                                />
                                Edit Budget
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.show(
                                    `${category.name} transactions shown!`,
                                  )
                                }
                              >
                                <iconify-icon
                                  icon="lucide:list"
                                  width="16"
                                  height="16"
                                  style={{marginRight: '0.5rem'}}
                                />
                                View Transactions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.show(`${category.name} alert set!`)
                                }
                              >
                                <iconify-icon
                                  icon="lucide:bell"
                                  width="16"
                                  height="16"
                                  style={{marginRight: '0.5rem'}}
                                />{' '}
                                Set Alert
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        max={100}
                        className={`budget-progress ${isOverBudget ? 'over-budget' : ''}`}
                      />
                      <div className="budget-percentage">
                        {percentage.toFixed(0)}%{' '}
                        {isOverBudget && '(Over Budget!)'}
                      </div>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() =>
                        toast.show(`Quick expense added to ${category.name}!`)
                      }
                    >
                      ➕ Quick Add Expense
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() =>
                        toast.show(`${category.name} budget increased!`)
                      }
                    >
                      <iconify-icon
                        icon="lucide:trending-up"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />
                      Increase Budget
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() =>
                        toast.show(`${category.name} spending tips shown!`)
                      }
                    >
                      <iconify-icon
                        icon="lucide:lightbulb"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Saving Tips
                    </ContextMenuItem>
                    <Separator />
                    <ContextMenuItem
                      onClick={() =>
                        toast.show(`${category.name} analytics opened!`)
                      }
                    >
                      <iconify-icon
                        icon="lucide:bar-chart-3"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />
                      View Analytics
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
          </div>
        </Card>

        <Card className="recent-transactions">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{margin: 0}}>Recent Transactions</h3>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <Tooltip title="Refresh Transactions">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => toast.show('Transactions refreshed!')}
                >
                  <iconify-icon
                    icon="lucide:refresh-cw"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                </Button>
              </Tooltip>
              <Sheet>
                <SheetTrigger>
                  <Button size="icon" variant="outline">
                    <iconify-icon icon="lucide:list" width="16" height="16" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <h3>All Transactions</h3>
                  <p>
                    This would show a detailed list of all transactions with
                    advanced filtering and search capabilities.
                  </p>
                  <div style={{marginTop: '2rem'}}>
                    <Button
                      variant="outline"
                      onClick={() => toast.show('Transaction export started!')}
                    >
                      <iconify-icon
                        icon="lucide:bar-chart-3"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />
                      Export All
                    </Button>
                  </div>
                  <SheetClose style={{marginTop: '1rem'}}>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <ScrollArea className="transactions-list">
            {initialTransactions.slice(0, 6).map((transaction) => (
              <ContextMenu key={transaction.id}>
                <ContextMenuTrigger>
                  <HoverCard>
                    <HoverCardTrigger>
                      <div
                        className="transaction-item"
                        style={{cursor: 'pointer'}}
                      >
                        <div className="transaction-details">
                          <div className="transaction-title">
                            {transaction.title}
                          </div>
                          <div className="transaction-category">
                            <Badge variant="secondary">
                              {transaction.category}
                            </Badge>
                            <span
                              style={{
                                marginLeft: '0.5rem',
                                fontSize: '0.75rem',
                                color: 'hsl(var(--p-muted-foreground))',
                              }}
                            >
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <div
                            className={`transaction-amount ${transaction.type}`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}$
                            {transaction.amount}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                size="icon"
                                variant="ghost"
                                style={{width: '1.5rem', height: '1.5rem'}}
                              >
                                ⋯
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.show('Transaction edited!')
                                }
                              >
                                <iconify-icon
                                  icon="lucide:edit"
                                  width="16"
                                  height="16"
                                  style={{marginRight: '0.5rem'}}
                                />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.show('Transaction duplicated!')
                                }
                              >
                                <iconify-icon
                                  icon="lucide:copy"
                                  width="16"
                                  height="16"
                                  style={{marginRight: '0.5rem'}}
                                />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.show('Transaction categorized!')
                                }
                              >
                                <iconify-icon
                                  icon="lucide:tag"
                                  width="16"
                                  height="16"
                                  style={{marginRight: '0.5rem'}}
                                />
                                Recategorize
                              </DropdownMenuItem>
                              <Separator />
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.show('Transaction deleted!')
                                }
                              >
                                <iconify-icon
                                  icon="lucide:trash-2"
                                  width="16"
                                  height="16"
                                  style={{marginRight: '0.5rem'}}
                                />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div style={{padding: '1rem'}}>
                        <h4 style={{margin: '0 0 0.5rem 0'}}>
                          {transaction.title}
                        </h4>
                        <div style={{fontSize: '0.875rem'}}>
                          <div>
                            <iconify-icon
                              icon="lucide:dollar-sign"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />
                            Amount: ${transaction.amount}
                          </div>
                          <div>
                            <iconify-icon
                              icon="lucide:tag"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />
                            Category: {transaction.category}
                          </div>
                          <div>
                            <iconify-icon
                              icon="lucide:calendar"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />
                            Date: {transaction.date}
                          </div>
                          <div>
                            <iconify-icon
                              icon="lucide:refresh-cw"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />{' '}
                            Type: {transaction.type}
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() => toast.show('Similar transactions found!')}
                  >
                    <iconify-icon
                      icon="lucide:search"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />
                    Find Similar
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => toast.show('Transaction rule created!')}
                  >
                    <iconify-icon
                      icon="lucide:bot"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Create Rule
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => toast.show('Transaction shared!')}
                  >
                    <iconify-icon
                      icon="lucide:share"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Share
                  </ContextMenuItem>
                  <Separator />
                  <ContextMenuItem
                    onClick={() => toast.show('Transaction flagged!')}
                  >
                    <iconify-icon
                      icon="lucide:flag"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Flag for Review
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}

function TransactionsTab() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
    [],
  );
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'timeline'>(
    'table',
  );
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'expense' as 'income' | 'expense',
    description: '',
  });
  const [filter, setFilter] = useState('all');
  const [showBulkActions, setShowBulkActions] = useState(false);

  function addTransaction() {
    if (!newTransaction.title || !newTransaction.amount) {
      toast.show('Please fill in all required fields', {
        title: 'Validation Error',
      });
      return;
    }

    const transaction: Transaction = {
      id: Date.now(),
      title: newTransaction.title,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      date: new Date().toISOString().split('T')[0],
      type: newTransaction.type,
      description: newTransaction.description,
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      title: '',
      amount: '',
      category: 'Food',
      type: 'expense',
      description: '',
    });
    setShowAddForm(false);
    toast.show('Transaction added successfully!', {
      title: 'Success',
      icon: 'success',
    });
  }

  function deleteTransaction(id: number) {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.show('Transaction deleted', {title: 'Deleted'});
  }

  function bulkDelete() {
    setTransactions(
      transactions.filter((t) => !selectedTransactions.includes(t.id)),
    );
    setSelectedTransactions([]);
    toast.show(`${selectedTransactions.length} transactions deleted`, {
      title: 'Bulk Delete',
    });
  }

  function duplicateTransaction(transaction: Transaction) {
    const newTx = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions([newTx, ...transactions]);
    toast.show('Transaction duplicated!', {title: 'Success'});
  }

  const filteredTransactions = transactions
    .filter((t) => filter === 'all' || t.type === filter)
    .filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const quickAddPresets = [
    {title: 'Coffee', amount: 5, category: 'Food', type: 'expense'},
    {title: 'Lunch', amount: 15, category: 'Food', type: 'expense'},
    {title: 'Gas', amount: 50, category: 'Transportation', type: 'expense'},
    {
      title: 'Freelance Payment',
      amount: 500,
      category: 'Income',
      type: 'income',
    },
  ];

  return (
    <div className="transactions-tab">
      {/* Enhanced Header with Multiple Action Bars */}
      <div className="transactions-header">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{margin: 0}}>Transactions</h2>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <Drawer>
              <DrawerTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:zap"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Quick Add
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div style={{padding: '2rem'}}>
                  <h3>Quick Add Transaction</h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginTop: '1rem',
                    }}
                  >
                    {quickAddPresets.map((preset, index) => (
                      <Card
                        key={index}
                        style={{padding: '1rem', cursor: 'pointer'}}
                        onClick={() => {
                          const transaction: Transaction = {
                            id: Date.now() + index,
                            title: preset.title,
                            amount: preset.amount,
                            category: preset.category,
                            date: new Date().toISOString().split('T')[0],
                            type: preset.type as 'income' | 'expense',
                          };
                          setTransactions([transaction, ...transactions]);
                          toast.show(`${preset.title} added!`, {
                            title: 'Quick Add',
                          });
                        }}
                      >
                        <div style={{textAlign: 'center'}}>
                          <div
                            style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}
                          >
                            {preset.type === 'income' ? (
                              <iconify-icon
                                icon="lucide:trending-up"
                                width="24"
                                height="24"
                              />
                            ) : (
                              <iconify-icon
                                icon="lucide:trending-down"
                                width="24"
                                height="24"
                              />
                            )}
                          </div>
                          <div style={{fontWeight: 'bold'}}>{preset.title}</div>
                          <div
                            style={{
                              fontSize: '0.875rem',
                              color: 'hsl(var(--p-muted-foreground))',
                            }}
                          >
                            ${preset.amount} • {preset.category}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <DrawerClose style={{marginTop: '2rem'}}>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:bar-chart-3"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Analytics
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => toast.show('Spending trends analysis opened!')}
                >
                  <iconify-icon
                    icon="lucide:trending-up"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Spending Trends
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Category breakdown opened!')}
                >
                  <iconify-icon
                    icon="lucide:pie-chart"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Category Breakdown
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Monthly comparison opened!')}
                >
                  <iconify-icon
                    icon="lucide:calendar"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Monthly Comparison
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                  onClick={() => toast.show('Custom report builder opened!')}
                >
                  <iconify-icon
                    icon="lucide:wrench"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Custom Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => setShowAddForm(true)}>
              ➕ Add Transaction
            </Button>
          </div>
        </div>

        {/* Advanced Filter and Search Bar */}
        <Card style={{padding: '1rem', marginBottom: '1rem'}}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <label style={{fontSize: '0.875rem', fontWeight: 'bold'}}>
                <iconify-icon icon="lucide:search" width="16" height="16" />
              </label>
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onInput={(e) =>
                  setSearchQuery((e.target as HTMLInputElement).value)
                }
                style={{width: '200px'}}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:filter"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Filter: {filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  All Transactions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('income')}>
                  <iconify-icon
                    icon="lucide:trending-up"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Income Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('expense')}>
                  <iconify-icon
                    icon="lucide:trending-down"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Expenses Only
                </DropdownMenuItem>
                <Separator />
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat} onClick={() => setFilter(cat)}>
                    <iconify-icon
                      icon="lucide:tag"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:arrow-up-down"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Sort: {sortBy}{' '}
                  {sortOrder === 'asc' ? (
                    <iconify-icon
                      icon="lucide:arrow-up"
                      width="16"
                      height="16"
                    />
                  ) : (
                    <iconify-icon
                      icon="lucide:arrow-down"
                      width="16"
                      height="16"
                    />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy('date');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  <iconify-icon
                    icon="lucide:calendar"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Date{' '}
                  {sortBy === 'date' &&
                    (sortOrder === 'asc' ? (
                      <iconify-icon
                        icon="lucide:arrow-up"
                        width="16"
                        height="16"
                      />
                    ) : (
                      <iconify-icon
                        icon="lucide:arrow-down"
                        width="16"
                        height="16"
                      />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy('amount');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  <iconify-icon
                    icon="lucide:dollar-sign"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Amount{' '}
                  {sortBy === 'amount' &&
                    (sortOrder === 'asc' ? (
                      <iconify-icon
                        icon="lucide:arrow-up"
                        width="16"
                        height="16"
                      />
                    ) : (
                      <iconify-icon
                        icon="lucide:arrow-down"
                        width="16"
                        height="16"
                      />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy('category');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  <iconify-icon
                    icon="lucide:tag"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Category{' '}
                  {sortBy === 'category' &&
                    (sortOrder === 'asc' ? (
                      <iconify-icon
                        icon="lucide:arrow-up"
                        width="16"
                        height="16"
                      />
                    ) : (
                      <iconify-icon
                        icon="lucide:arrow-down"
                        width="16"
                        height="16"
                      />
                    ))}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as any)}
            >
              <Toggle value="table">
                <iconify-icon
                  icon="lucide:clipboard"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Table
              </Toggle>
              <Toggle value="cards">
                <iconify-icon
                  icon="lucide:credit-card"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Cards
              </Toggle>
              <Toggle value="timeline">
                <iconify-icon
                  icon="lucide:calendar"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Timeline
              </Toggle>
            </ToggleGroup>

            <div style={{marginLeft: 'auto', display: 'flex', gap: '0.5rem'}}>
              <Tooltip title="Import Transactions">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => toast.show('Import dialog opened!')}
                >
                  <iconify-icon icon="lucide:download" width="16" height="16" />
                </Button>
              </Tooltip>
              <Tooltip title="Export Transactions">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => toast.show('Export started!')}
                >
                  <iconify-icon
                    icon="lucide:share"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Bulk Actions">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                >
                  <iconify-icon icon="lucide:zap" width="16" height="16" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <Alert style={{marginBottom: '1rem'}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <Checkbox
                  checked={
                    selectedTransactions.length === filteredTransactions.length
                  }
                  onInput={(e) => {
                    if ((e.target as HTMLInputElement).checked) {
                      setSelectedTransactions(
                        filteredTransactions.map((t) => t.id),
                      );
                    } else {
                      setSelectedTransactions([]);
                    }
                  }}
                />
                <span>
                  {selectedTransactions.length === 0
                    ? 'Select transactions for bulk actions'
                    : `${selectedTransactions.length} transaction(s) selected`}
                </span>
              </div>
              {selectedTransactions.length > 0 && (
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <Button size="sm" variant="outline" onClick={bulkDelete}>
                    <iconify-icon
                      icon="lucide:trash-2"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.show('Bulk categorization opened!')}
                  >
                    <iconify-icon
                      icon="lucide:tag"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Categorize
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.show('Bulk export started!')}
                  >
                    <iconify-icon
                      icon="lucide:share"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Export
                  </Button>
                </div>
              )}
            </div>
          </Alert>
        )}
      </div>

      {/* Enhanced Add Form with Presets */}
      {showAddForm && (
        <Card className="add-transaction-form">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{margin: 0}}>Add New Transaction</h3>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:clipboard"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Templates
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    setNewTransaction({
                      title: 'Monthly Salary',
                      amount: '5000',
                      category: 'Income',
                      type: 'income',
                      description: '',
                    })
                  }
                >
                  <iconify-icon
                    icon="lucide:briefcase"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Salary Template
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setNewTransaction({
                      title: 'Grocery Shopping',
                      amount: '120',
                      category: 'Food',
                      type: 'expense',
                      description: '',
                    })
                  }
                >
                  🛒 Grocery Template
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setNewTransaction({
                      title: 'Freelance Project',
                      amount: '800',
                      category: 'Income',
                      type: 'income',
                      description: '',
                    })
                  }
                >
                  💻 Freelance Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="form-row">
            <div className="form-field">
              <Label>Title</Label>
              <Input
                value={newTransaction.title}
                onInput={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    title: (e.target as HTMLInputElement).value,
                  })
                }
                placeholder="Transaction title"
              />
            </div>
            <div className="form-field">
              <Label>Amount</Label>
              <div style={{position: 'relative'}}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'hsl(var(--p-muted-foreground))',
                  }}
                >
                  $
                </span>
                <Input
                  type="number"
                  value={newTransaction.amount}
                  onInput={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="0.00"
                  style={{paddingLeft: '2rem'}}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <Label>Category</Label>
              <Select
                value={newTransaction.category}
                onInput={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: (e.target as HTMLSelectElement).value,
                  })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>
            <div className="form-field">
              <Label>Type</Label>
              <RadioGroup>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <Label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Radio
                      name="type"
                      value="expense"
                      checked={newTransaction.type === 'expense'}
                      onInput={() =>
                        setNewTransaction({...newTransaction, type: 'expense'})
                      }
                    />
                    <iconify-icon
                      icon="lucide:trending-down"
                      width="16"
                      height="16"
                    />{' '}
                    Expense
                  </Label>
                  <Label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Radio
                      name="type"
                      value="income"
                      checked={newTransaction.type === 'income'}
                      onInput={() =>
                        setNewTransaction({...newTransaction, type: 'income'})
                      }
                    />
                    <iconify-icon
                      icon="lucide:trending-up"
                      width="16"
                      height="16"
                    />{' '}
                    Income
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="form-field">
            <Label>Description (Optional)</Label>
            <Textarea
              value={newTransaction.description}
              onInput={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: (e.target as HTMLTextAreaElement).value,
                })
              }
              placeholder="Additional details..."
            />
          </div>

          <div className="form-actions">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button onClick={addTransaction}>
              <iconify-icon
                icon="lucide:save"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />{' '}
              Add Transaction
            </Button>
          </div>
        </Card>
      )}

      {/* Enhanced Transaction Display */}
      {viewMode === 'table' && (
        <Card className="transactions-table-card">
          <Table className="transactions-table">
            <thead>
              <tr>
                {showBulkActions && <th style={{width: '40px'}}></th>}
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <ContextMenu key={transaction.id}>
                  <ContextMenuTrigger>
                    <tr style={{cursor: 'pointer'}}>
                      {showBulkActions && (
                        <td>
                          <Checkbox
                            checked={selectedTransactions.includes(
                              transaction.id,
                            )}
                            onInput={(e) => {
                              if ((e.target as HTMLInputElement).checked) {
                                setSelectedTransactions([
                                  ...selectedTransactions,
                                  transaction.id,
                                ]);
                              } else {
                                setSelectedTransactions(
                                  selectedTransactions.filter(
                                    (id) => id !== transaction.id,
                                  ),
                                );
                              }
                            }}
                          />
                        </td>
                      )}
                      <td>{transaction.date}</td>
                      <td>
                        <HoverCard>
                          <HoverCardTrigger>
                            <span style={{fontWeight: 'bold'}}>
                              {transaction.title}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div style={{padding: '1rem'}}>
                              <h4 style={{margin: '0 0 0.5rem 0'}}>
                                Transaction Details
                              </h4>
                              <div style={{fontSize: '0.875rem'}}>
                                <div>
                                  <iconify-icon
                                    icon="lucide:dollar-sign"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />
                                  Amount: ${transaction.amount}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:tag"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />
                                  Category: {transaction.category}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:calendar"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />
                                  Date: {transaction.date}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:refresh-cw"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />{' '}
                                  Type: {transaction.type}
                                </div>
                                {transaction.description && (
                                  <div>
                                    <iconify-icon
                                      icon="lucide:edit-3"
                                      width="16"
                                      height="16"
                                      style={{marginRight: '0.5rem'}}
                                    />{' '}
                                    Note: {transaction.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </td>
                      <td>
                        <Badge variant="secondary">
                          {transaction.category}
                        </Badge>
                      </td>
                      <td>
                        <Badge
                          variant={
                            transaction.type === 'income'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {transaction.type === 'income' ? (
                            <iconify-icon
                              icon="lucide:trending-up"
                              width="16"
                              height="16"
                            />
                          ) : (
                            <iconify-icon
                              icon="lucide:trending-down"
                              width="16"
                              height="16"
                            />
                          )}{' '}
                          {transaction.type}
                        </Badge>
                      </td>
                      <td className={`amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}$
                        {transaction.amount}
                      </td>
                      <td>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button size="sm" variant="ghost">
                              ⋯
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => toast.show('Edit form opened!')}
                            >
                              <iconify-icon
                                icon="lucide:edit"
                                width="16"
                                height="16"
                                style={{marginRight: '0.5rem'}}
                              />{' '}
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => duplicateTransaction(transaction)}
                            >
                              <iconify-icon
                                icon="lucide:clipboard"
                                width="16"
                                height="16"
                                style={{marginRight: '0.5rem'}}
                              />{' '}
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toast.show('Transaction split!')}
                            >
                              <iconify-icon
                                icon="lucide:scissors"
                                width="16"
                                height="16"
                                style={{marginRight: '0.5rem'}}
                              />{' '}
                              Split
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem
                              onClick={() => toast.show('Receipt attached!')}
                            >
                              <iconify-icon
                                icon="lucide:paperclip"
                                width="16"
                                height="16"
                                style={{marginRight: '0.5rem'}}
                              />{' '}
                              Attach Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toast.show('Transaction shared!')}
                            >
                              <iconify-icon
                                icon="lucide:share"
                                width="16"
                                height="16"
                                style={{marginRight: '0.5rem'}}
                              />{' '}
                              Share
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem
                              onClick={() => deleteTransaction(transaction.id)}
                            >
                              <iconify-icon
                                icon="lucide:trash-2"
                                width="16"
                                height="16"
                                style={{marginRight: '0.5rem'}}
                              />{' '}
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => duplicateTransaction(transaction)}
                    >
                      <iconify-icon
                        icon="lucide:clipboard"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Quick Duplicate
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => toast.show('Similar transactions found!')}
                    >
                      <iconify-icon
                        icon="lucide:search"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Find Similar
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => toast.show('Rule created!')}
                    >
                      <iconify-icon
                        icon="lucide:bot"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Create Rule
                    </ContextMenuItem>
                    <Separator />
                    <ContextMenuItem
                      onClick={() => toast.show('Transaction flagged!')}
                    >
                      <iconify-icon
                        icon="lucide:flag"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Flag
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <iconify-icon
                        icon="lucide:trash-2"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Card View Mode */}
      {viewMode === 'cards' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {filteredTransactions.map((transaction) => (
            <ContextMenu key={transaction.id}>
              <ContextMenuTrigger>
                <Card
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {showBulkActions && (
                    <Checkbox
                      style={{position: 'absolute', top: '1rem', right: '1rem'}}
                      checked={selectedTransactions.includes(transaction.id)}
                      onInput={(e) => {
                        if ((e.target as HTMLInputElement).checked) {
                          setSelectedTransactions([
                            ...selectedTransactions,
                            transaction.id,
                          ]);
                        } else {
                          setSelectedTransactions(
                            selectedTransactions.filter(
                              (id) => id !== transaction.id,
                            ),
                          );
                        }
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem',
                    }}
                  >
                    <div>
                      <h4 style={{margin: '0 0 0.5rem 0'}}>
                        {transaction.title}
                      </h4>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                        }}
                      >
                        <Badge variant="secondary">
                          {transaction.category}
                        </Badge>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: 'hsl(var(--p-muted-foreground))',
                          }}
                        >
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div
                        className={`transaction-amount ${transaction.type}`}
                        style={{fontSize: '1.25rem', fontWeight: 'bold'}}
                      >
                        {transaction.type === 'income' ? '+' : '-'}$
                        {transaction.amount}
                      </div>
                      <Badge
                        variant={
                          transaction.type === 'income'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {transaction.type === 'income'
                          ? '<iconify-icon icon="lucide:trending-up" width="16" height="16" />'
                          : '<iconify-icon icon="lucide:trending-down" width="16" height="16" />'}
                      </Badge>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <Tooltip title="Edit Transaction">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.show('Edit opened!');
                        }}
                      >
                        <iconify-icon
                          icon="lucide:edit"
                          width="16"
                          height="16"
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Duplicate Transaction">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateTransaction(transaction);
                        }}
                      >
                        <iconify-icon
                          icon="lucide:copy"
                          width="16"
                          height="16"
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Share Transaction">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.show('Shared!');
                        }}
                      >
                        <iconify-icon
                          icon="lucide:share"
                          width="16"
                          height="16"
                          style={{marginRight: '0.5rem'}}
                        />
                      </Button>
                    </Tooltip>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ⋯
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => toast.show('Receipt attached!')}
                        >
                          <iconify-icon
                            icon="lucide:paperclip"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          />{' '}
                          Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.show('Note added!')}
                        >
                          <iconify-icon
                            icon="lucide:edit-3"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          />{' '}
                          Add Note
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteTransaction(transaction.id)}
                        >
                          <iconify-icon
                            icon="lucide:trash-2"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          />{' '}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => duplicateTransaction(transaction)}
                >
                  <iconify-icon
                    icon="lucide:clipboard"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem onClick={() => toast.show('Similar found!')}>
                  <iconify-icon
                    icon="lucide:search"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Find Similar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => toast.show('Category changed!')}
                >
                  <iconify-icon
                    icon="lucide:tag"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Change Category
                </ContextMenuItem>
                <Separator />
                <ContextMenuItem
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <iconify-icon
                    icon="lucide:trash-2"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      )}

      {/* Timeline View Mode */}
      {viewMode === 'timeline' && (
        <Card style={{padding: '2rem'}}>
          <h3>Transaction Timeline</h3>
          <div
            style={{
              borderLeft: '2px solid hsl(var(--p-border))',
              paddingLeft: '2rem',
              marginTop: '1rem',
            }}
          >
            {filteredTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                style={{marginBottom: '2rem', position: 'relative'}}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.75rem',
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    backgroundColor:
                      transaction.type === 'income' ? '#10b981' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  {transaction.type === 'income' ? (
                    <iconify-icon
                      icon="lucide:trending-up"
                      width="16"
                      height="16"
                    />
                  ) : (
                    <iconify-icon
                      icon="lucide:trending-down"
                      width="16"
                      height="16"
                    />
                  )}
                </div>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <Card style={{padding: '1rem', cursor: 'pointer'}}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <h4 style={{margin: '0 0 0.5rem 0'}}>
                            {transaction.title}
                          </h4>
                          <div
                            style={{
                              fontSize: '0.875rem',
                              color: 'hsl(var(--p-muted-foreground))',
                            }}
                          >
                            {transaction.date} • {transaction.category}
                          </div>
                        </div>
                        <div
                          className={`transaction-amount ${transaction.type}`}
                          style={{fontSize: '1.125rem', fontWeight: 'bold'}}
                        >
                          {transaction.type === 'income' ? '+' : '-'}$
                          {transaction.amount}
                        </div>
                      </div>
                    </Card>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => toast.show('Transaction details opened!')}
                    >
                      <iconify-icon
                        icon="lucide:eye"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      View Details
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => duplicateTransaction(transaction)}
                    >
                      <iconify-icon
                        icon="lucide:clipboard"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Duplicate
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => toast.show('Similar transactions shown!')}
                    >
                      <iconify-icon
                        icon="lucide:search"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Show Similar
                    </ContextMenuItem>
                    <Separator />
                    <ContextMenuItem
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <iconify-icon
                        icon="lucide:trash-2"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'progress'>(
    'grid',
  );
  const [sortBy, setSortBy] = useState<'deadline' | 'progress' | 'amount'>(
    'deadline',
  );
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    current: '',
    deadline: '',
    category: 'Savings',
  });

  function addGoal() {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      toast.show('Please fill in all required fields', {
        title: 'Validation Error',
      });
      return;
    }

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      target: parseFloat(newGoal.target),
      current: parseFloat(newGoal.current) || 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      target: '',
      current: '',
      deadline: '',
      category: 'Savings',
    });
    setShowAddForm(false);
    toast.show('Goal created successfully!', {
      title: 'Success',
      icon: 'success',
    });
  }

  function updateGoalProgress(id: number, amount: number) {
    setGoals(
      goals.map((g) =>
        g.id === id
          ? {...g, current: Math.min(g.current + amount, g.target)}
          : g,
      ),
    );
    toast.show(`Added $${amount} to goal!`, {title: 'Progress Updated'});
  }

  function deleteGoal(id: number) {
    setGoals(goals.filter((g) => g.id !== id));
    toast.show('Goal deleted', {title: 'Deleted'});
  }

  function duplicateGoal(goal: Goal) {
    const newGoal = {
      ...goal,
      id: Date.now(),
      title: `${goal.title} (Copy)`,
      current: 0,
    };
    setGoals([...goals, newGoal]);
    toast.show('Goal duplicated!', {title: 'Success'});
  }

  const sortedGoals = [...goals].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'progress':
        return b.current / b.target - a.current / a.target;
      case 'amount':
        return b.target - a.target;
      default:
        return 0;
    }
  });

  const goalTemplates = [
    {
      title: 'Emergency Fund',
      target: 10000,
      category: 'Savings',
      description: '6 months of expenses',
    },
    {
      title: 'Dream Vacation',
      target: 5000,
      category: 'Travel',
      description: 'Europe trip fund',
    },
    {
      title: 'New Laptop',
      target: 2500,
      category: 'Tech',
      description: 'MacBook Pro fund',
    },
    {
      title: 'Course Certification',
      target: 1000,
      category: 'Education',
      description: 'Professional development',
    },
  ];

  return (
    <div className="goals-tab">
      {/* Enhanced Header */}
      <div className="goals-header">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{margin: 0}}>Financial Goals</h2>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <Sheet>
              <SheetTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:target"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Goal Templates
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div style={{padding: '1rem'}}>
                  <h3>Quick Start Templates</h3>
                  <p
                    style={{
                      color: 'hsl(var(--p-muted-foreground))',
                      marginBottom: '2rem',
                    }}
                  >
                    Choose from popular goal templates to get started quickly.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                    }}
                  >
                    {goalTemplates.map((template, index) => (
                      <Card
                        key={index}
                        style={{padding: '1rem', cursor: 'pointer'}}
                        onClick={() => {
                          const goal: Goal = {
                            id: Date.now() + index,
                            title: template.title,
                            target: template.target,
                            current: 0,
                            deadline: new Date(
                              Date.now() + 365 * 24 * 60 * 60 * 1000,
                            )
                              .toISOString()
                              .split('T')[0],
                            category: template.category,
                          };
                          setGoals([...goals, goal]);
                          toast.show(`${template.title} goal created!`, {
                            title: 'Template Added',
                          });
                        }}
                      >
                        <h4 style={{margin: '0 0 0.5rem 0'}}>
                          {template.title}
                        </h4>
                        <p
                          style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '0.875rem',
                            color: 'hsl(var(--p-muted-foreground))',
                          }}
                        >
                          {template.description}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Badge variant="secondary">{template.category}</Badge>
                          <span style={{fontWeight: 'bold'}}>
                            ${template.target.toLocaleString()}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <SheetClose style={{marginTop: '2rem'}}>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:bar-chart-3"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Analytics
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => toast.show('Goal trends analysis opened!')}
                >
                  <iconify-icon
                    icon="lucide:trending-up"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Goal Trends
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Completion forecast opened!')}
                >
                  🔮 Completion Forecast
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Savings optimization opened!')}
                >
                  <iconify-icon
                    icon="lucide:zap"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  Optimize Savings
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                  onClick={() => toast.show('Goal report generated!')}
                >
                  📄 Generate Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => setShowAddForm(true)}>➕ Add Goal</Button>
          </div>
        </div>

        {/* Advanced Controls */}
        <Card style={{padding: '1rem', marginBottom: '1rem'}}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <iconify-icon
                    icon="lucide:arrow-up-down"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Sort: {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('deadline')}>
                  <iconify-icon
                    icon="lucide:clock"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  By Deadline
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('progress')}>
                  <iconify-icon
                    icon="lucide:trending-up"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />{' '}
                  By Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('amount')}>
                  <iconify-icon
                    icon="lucide:trending-up"
                    width="16"
                    height="16"
                  />{' '}
                  By Amount
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as any)}
            >
              <Toggle value="grid">🔲 Grid</Toggle>
              <Toggle value="list">
                <iconify-icon
                  icon="lucide:clipboard"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                List
              </Toggle>
              <Toggle value="progress">
                <iconify-icon
                  icon="lucide:bar-chart-3"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Progress
              </Toggle>
            </ToggleGroup>

            <div style={{marginLeft: 'auto', display: 'flex', gap: '0.5rem'}}>
              <Tooltip title="Bulk Actions">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => toast.show('Bulk actions activated!')}
                >
                  <iconify-icon
                    icon="lucide:zap"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Export Goals">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => toast.show('Goals exported!')}
                >
                  <iconify-icon
                    icon="lucide:share"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Goal Insights">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => toast.show('Goal insights opened!')}
                >
                  🔬
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Add Form */}
      {showAddForm && (
        <Card className="add-goal-form">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{margin: 0}}>Create New Goal</h3>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <iconify-icon
                      icon="lucide:target"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Goal Type
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      setNewGoal({
                        ...newGoal,
                        category: 'Savings',
                        title: 'Emergency Fund',
                      })
                    }
                  >
                    <iconify-icon
                      icon="lucide:trending-up"
                      width="16"
                      height="16"
                    />{' '}
                    Savings Goal
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setNewGoal({
                        ...newGoal,
                        category: 'Travel',
                        title: 'Dream Vacation',
                      })
                    }
                  >
                    <iconify-icon
                      icon="lucide:plane"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Travel Goal
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setNewGoal({
                        ...newGoal,
                        category: 'Tech',
                        title: 'New Device',
                      })
                    }
                  >
                    <iconify-icon
                      icon="lucide:smartphone"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Purchase Goal
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setNewGoal({
                        ...newGoal,
                        category: 'Education',
                        title: 'Course Fund',
                      })
                    }
                  >
                    📚 Education Goal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Tooltip title="Smart Goal Calculator">
                <Button
                  variant="outline"
                  onClick={() => toast.show('Smart calculator opened!')}
                >
                  🧮
                </Button>
              </Tooltip>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <Label>Goal Title</Label>
              <Input
                value={newGoal.title}
                onInput={(e) =>
                  setNewGoal({
                    ...newGoal,
                    title: (e.target as HTMLInputElement).value,
                  })
                }
                placeholder="e.g., Emergency Fund"
              />
            </div>
            <div className="form-field">
              <Label>Target Amount</Label>
              <div style={{position: 'relative'}}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'hsl(var(--p-muted-foreground))',
                  }}
                >
                  $
                </span>
                <Input
                  type="number"
                  value={newGoal.target}
                  onInput={(e) =>
                    setNewGoal({
                      ...newGoal,
                      target: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="10000"
                  style={{paddingLeft: '2rem'}}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <Label>Current Amount</Label>
              <div style={{position: 'relative'}}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'hsl(var(--p-muted-foreground))',
                  }}
                >
                  $
                </span>
                <Input
                  type="number"
                  value={newGoal.current}
                  onInput={(e) =>
                    setNewGoal({
                      ...newGoal,
                      current: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="0"
                  style={{paddingLeft: '2rem'}}
                />
              </div>
            </div>
            <div className="form-field">
              <Label>Target Date</Label>
              <DatePicker
                value={newGoal.deadline}
                onInput={(e) =>
                  setNewGoal({
                    ...newGoal,
                    deadline: (e.target as HTMLInputElement).value,
                  })
                }
              />
            </div>
          </div>

          <div className="form-field">
            <Label>Category</Label>
            <Select
              value={newGoal.category}
              onInput={(e) =>
                setNewGoal({
                  ...newGoal,
                  category: (e.target as HTMLSelectElement).value,
                })
              }
            >
              <option value="Savings">
                <iconify-icon
                  icon="lucide:trending-up"
                  width="16"
                  height="16"
                />{' '}
                Savings
              </option>
              <option value="Travel">
                <iconify-icon
                  icon="lucide:plane"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Travel
              </option>
              <option value="Tech">
                <iconify-icon
                  icon="lucide:smartphone"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Technology
              </option>
              <option value="Education">📚 Education</option>
              <option value="Health">🏥 Health</option>
              <option value="Home">
                <iconify-icon
                  icon="lucide:home"
                  width="16"
                  height="16"
                  style={{marginRight: '0.5rem'}}
                />{' '}
                Home
              </option>
            </Select>
          </div>

          <div className="form-actions">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button onClick={addGoal}>
              <iconify-icon
                icon="lucide:target"
                width="16"
                height="16"
                style={{marginRight: '0.5rem'}}
              />{' '}
              Create Goal
            </Button>
          </div>
        </Card>
      )}

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="goals-grid">
          {sortedGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            );

            return (
              <ContextMenu key={goal.id}>
                <ContextMenuTrigger>
                  <Card
                    className="goal-card"
                    style={{cursor: 'pointer', position: 'relative'}}
                  >
                    <div
                      style={{position: 'absolute', top: '1rem', right: '1rem'}}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            size="icon"
                            variant="ghost"
                            style={{width: '1.5rem', height: '1.5rem'}}
                          >
                            ⋯
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => toast.show('Goal editor opened!')}
                          >
                            <iconify-icon
                              icon="lucide:edit"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />{' '}
                            Edit Goal
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicateGoal(goal)}>
                            <iconify-icon
                              icon="lucide:clipboard"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />{' '}
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toast.show('Auto-save setup opened!')
                            }
                          >
                            <iconify-icon
                              icon="lucide:bot"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />{' '}
                            Auto-Save Setup
                          </DropdownMenuItem>
                          <Separator />
                          <DropdownMenuItem
                            onClick={() => toast.show('Goal shared!')}
                          >
                            <iconify-icon
                              icon="lucide:share"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />{' '}
                            Share Goal
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteGoal(goal.id)}>
                            <iconify-icon
                              icon="lucide:trash-2"
                              width="16"
                              height="16"
                              style={{marginRight: '0.5rem'}}
                            />{' '}
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="goal-header">
                      <div className="goal-title">
                        <HoverCard>
                          <HoverCardTrigger>
                            <h3 style={{margin: 0}}>{goal.title}</h3>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div style={{padding: '1rem'}}>
                              <h4 style={{margin: '0 0 0.5rem 0'}}>
                                {goal.title} Details
                              </h4>
                              <div style={{fontSize: '0.875rem'}}>
                                <div>
                                  <iconify-icon
                                    icon="lucide:target"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />{' '}
                                  Target: ${goal.target.toLocaleString()}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:trending-up"
                                    width="16"
                                    height="16"
                                  />{' '}
                                  Current: ${goal.current.toLocaleString()}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:trending-up"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />{' '}
                                  Progress: {progress.toFixed(1)}%
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:calendar"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />{' '}
                                  Deadline: {goal.deadline}
                                </div>
                                <div>
                                  <iconify-icon
                                    icon="lucide:tag"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />
                                  Category: {goal.category}
                                </div>
                                <div>
                                  💵 Remaining: $
                                  {(
                                    goal.target - goal.current
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>
                      <div className="goal-amount">
                        ${goal.current.toLocaleString()} / $
                        {goal.target.toLocaleString()}
                      </div>
                    </div>

                    <Progress
                      value={progress}
                      max={100}
                      className="goal-progress"
                    />

                    <div className="goal-stats">
                      <div className="progress-percentage">
                        {progress.toFixed(1)}% Complete
                      </div>
                      <div className="days-left">
                        {daysLeft > 0
                          ? `${daysLeft} days left`
                          : 'Deadline passed'}
                      </div>
                    </div>

                    <div
                      className="goal-actions"
                      style={{display: 'flex', gap: '0.5rem'}}
                    >
                      <Popover>
                        <PopoverTrigger>
                          <Button size="sm" variant="outline">
                            <iconify-icon
                              icon="lucide:trending-up"
                              width="16"
                              height="16"
                            />{' '}
                            Add Progress
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="add-progress-form">
                            <h4>Add to {goal.title}</h4>
                            <div
                              className="quick-amounts"
                              style={{marginBottom: '1rem'}}
                            >
                              <Button
                                size="sm"
                                onClick={() => updateGoalProgress(goal.id, 50)}
                              >
                                $50
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateGoalProgress(goal.id, 100)}
                              >
                                $100
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateGoalProgress(goal.id, 250)}
                              >
                                $250
                              </Button>
                            </div>
                            <div style={{display: 'flex', gap: '0.5rem'}}>
                              <Input
                                placeholder="Custom amount"
                                type="number"
                              />
                              <Button
                                size="sm"
                                onClick={() =>
                                  toast.show('Custom amount added!')
                                }
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Tooltip title="Goal Analytics">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.show('Goal analytics opened!')}
                        >
                          <iconify-icon
                            icon="lucide:bar-chart-3"
                            width="16"
                            height="16"
                            style={{marginRight: '0.5rem'}}
                          />
                        </Button>
                      </Tooltip>
                    </div>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() => updateGoalProgress(goal.id, 100)}
                  >
                    <iconify-icon
                      icon="lucide:trending-up"
                      width="16"
                      height="16"
                    />{' '}
                    Quick Add $100
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => duplicateGoal(goal)}>
                    <iconify-icon
                      icon="lucide:clipboard"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Duplicate Goal
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => toast.show('Milestone created!')}
                  >
                    <iconify-icon
                      icon="lucide:target"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Set Milestone
                  </ContextMenuItem>
                  <Separator />
                  <ContextMenuItem
                    onClick={() => toast.show('Savings plan optimized!')}
                  >
                    <iconify-icon
                      icon="lucide:zap"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Optimize Plan
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => deleteGoal(goal.id)}>
                    <iconify-icon
                      icon="lucide:trash-2"
                      width="16"
                      height="16"
                      style={{marginRight: '0.5rem'}}
                    />{' '}
                    Delete Goal
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      )}

      {/* List View Mode */}
      {viewMode === 'list' && (
        <Card>
          <Table>
            <thead>
              <tr>
                <th>Goal</th>
                <th>Category</th>
                <th>Progress</th>
                <th>Amount</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedGoals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil(
                  (new Date(goal.deadline).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                );

                return (
                  <ContextMenu key={goal.id}>
                    <ContextMenuTrigger>
                      <tr style={{cursor: 'pointer'}}>
                        <td>
                          <HoverCard>
                            <HoverCardTrigger>
                              <span style={{fontWeight: 'bold'}}>
                                {goal.title}
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent>
                              <div style={{padding: '1rem'}}>
                                <h4 style={{margin: '0 0 0.5rem 0'}}>
                                  {goal.title}
                                </h4>
                                <div style={{fontSize: '0.875rem'}}>
                                  <div>Progress: {progress.toFixed(1)}%</div>
                                  <div>
                                    Remaining: $
                                    {(
                                      goal.target - goal.current
                                    ).toLocaleString()}
                                  </div>
                                  <div>Days left: {daysLeft}</div>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </td>
                        <td>
                          <Badge variant="secondary">{goal.category}</Badge>
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}
                          >
                            <Progress
                              value={progress}
                              max={100}
                              style={{flex: 1, height: '8px'}}
                            />
                            <span
                              style={{fontSize: '0.875rem', minWidth: '3rem'}}
                            >
                              {progress.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td>
                          ${goal.current.toLocaleString()} / $
                          {goal.target.toLocaleString()}
                        </td>
                        <td>
                          <div
                            style={{display: 'flex', flexDirection: 'column'}}
                          >
                            <span>{goal.deadline}</span>
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color:
                                  daysLeft < 30
                                    ? '#ef4444'
                                    : 'hsl(var(--p-muted-foreground))',
                              }}
                            >
                              {daysLeft > 0
                                ? `${daysLeft} days left`
                                : 'Overdue'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{display: 'flex', gap: '0.5rem'}}>
                            <Tooltip title="Quick Add">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateGoalProgress(goal.id, 100)}
                              >
                                <iconify-icon
                                  icon="lucide:trending-up"
                                  width="16"
                                  height="16"
                                />
                              </Button>
                            </Tooltip>
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Button size="icon" variant="outline">
                                  ⋯
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => toast.show('Edit opened!')}
                                >
                                  <iconify-icon
                                    icon="lucide:edit"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />{' '}
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => duplicateGoal(goal)}
                                >
                                  <iconify-icon
                                    icon="lucide:clipboard"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />{' '}
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteGoal(goal.id)}
                                >
                                  <iconify-icon
                                    icon="lucide:trash-2"
                                    width="16"
                                    height="16"
                                    style={{marginRight: '0.5rem'}}
                                  />{' '}
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onClick={() => updateGoalProgress(goal.id, 50)}
                      >
                        <iconify-icon
                          icon="lucide:trending-up"
                          width="16"
                          height="16"
                        />{' '}
                        Add $50
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => updateGoalProgress(goal.id, 100)}
                      >
                        <iconify-icon
                          icon="lucide:trending-up"
                          width="16"
                          height="16"
                        />{' '}
                        Add $100
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => updateGoalProgress(goal.id, 250)}
                      >
                        <iconify-icon
                          icon="lucide:trending-up"
                          width="16"
                          height="16"
                        />{' '}
                        Add $250
                      </ContextMenuItem>
                      <Separator />
                      <ContextMenuItem onClick={() => deleteGoal(goal.id)}>
                        <iconify-icon
                          icon="lucide:trash-2"
                          width="16"
                          height="16"
                          style={{marginRight: '0.5rem'}}
                        />{' '}
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Progress View Mode */}
      {viewMode === 'progress' && (
        <Card style={{padding: '2rem'}}>
          <h3>Goals Progress Overview</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              marginTop: '2rem',
            }}
          >
            {sortedGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;

              return (
                <ContextMenu key={goal.id}>
                  <ContextMenuTrigger>
                    <div style={{cursor: 'pointer'}}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                          }}
                        >
                          <h4 style={{margin: 0}}>{goal.title}</h4>
                          <Badge variant="outline">{goal.category}</Badge>
                        </div>
                        <div style={{textAlign: 'right'}}>
                          <div style={{fontWeight: 'bold'}}>
                            ${goal.current.toLocaleString()} / $
                            {goal.target.toLocaleString()}
                          </div>
                          <div
                            style={{
                              fontSize: '0.875rem',
                              color: 'hsl(var(--p-muted-foreground))',
                            }}
                          >
                            {progress.toFixed(1)}% complete
                          </div>
                        </div>
                      </div>
                      <Progress
                        value={progress}
                        max={100}
                        style={{height: '12px'}}
                      />
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => updateGoalProgress(goal.id, 100)}
                    >
                      <iconify-icon
                        icon="lucide:trending-up"
                        width="16"
                        height="16"
                      />{' '}
                      Quick Add $100
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => toast.show('Goal details opened!')}
                    >
                      <iconify-icon
                        icon="lucide:eye"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      View Details
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => toast.show('Goal optimized!')}
                    >
                      <iconify-icon
                        icon="lucide:zap"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />{' '}
                      Optimize
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

function SettingsTab() {
  const [currency, setCurrency] = useState('USD');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  return (
    <div className="settings-tab">
      <h2>Settings</h2>

      <Card className="settings-section">
        <h3>Preferences</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Currency</label>
            <p>Choose your preferred currency for displaying amounts</p>
          </div>
          <Select
            value={currency}
            onInput={(e) => setCurrency((e.target as HTMLSelectElement).value)}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </Select>
        </div>

        <Separator />

        <div className="setting-item">
          <div className="setting-info">
            <label>Dark Mode</label>
            <p>Switch between light and dark themes</p>
          </div>
          <Switch
            checked={darkMode}
            onInput={(e) => setDarkMode((e.target as HTMLInputElement).checked)}
          />
        </div>
      </Card>

      <Card className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Enable Notifications</label>
            <p>Receive notifications about your financial activity</p>
          </div>
          <Switch
            checked={notifications}
            onInput={(e) =>
              setNotifications((e.target as HTMLInputElement).checked)
            }
          />
        </div>

        <Separator />

        <div className="setting-item">
          <div className="setting-info">
            <label>Budget Alerts</label>
            <p>Get notified when you exceed budget limits</p>
          </div>
          <Switch
            checked={budgetAlerts}
            onInput={(e) =>
              setBudgetAlerts((e.target as HTMLInputElement).checked)
            }
          />
        </div>
      </Card>

      <Card className="settings-section">
        <h3>Account</h3>
        <div className="account-info">
          <Avatar src="https://github.com/developit.png" alt="Profile" />
          <div className="account-details">
            <h4>John Doe</h4>
            <p>john.doe@example.com</p>
          </div>
        </div>

        <div className="account-actions">
          <Button variant="outline">Edit Profile</Button>
          <Button variant="outline">Change Password</Button>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </Card>
    </div>
  );
}

// Command Palette Component
function CommandPalette({open, onClose}: {open: boolean; onClose: () => void}) {
  const [query, setQuery] = useState('');

  const commands = [
    {
      id: 'overview',
      label: 'Go to Overview',
      shortcut: 'Cmd+1',
      action: () => toast.show('Navigated to Overview'),
    },
    {
      id: 'transactions',
      label: 'Go to Transactions',
      shortcut: 'Cmd+2',
      action: () => toast.show('Navigated to Transactions'),
    },
    {
      id: 'goals',
      label: 'Go to Goals',
      shortcut: 'Cmd+3',
      action: () => toast.show('Navigated to Goals'),
    },
    {
      id: 'settings',
      label: 'Go to Settings',
      shortcut: 'Cmd+4',
      action: () => toast.show('Navigated to Settings'),
    },
    {
      id: 'add-transaction',
      label: 'Add New Transaction',
      shortcut: 'Cmd+T',
      action: () => toast.show('Add transaction form opened!'),
    },
    {
      id: 'add-goal',
      label: 'Add New Goal',
      shortcut: 'Cmd+G',
      action: () => toast.show('Add goal form opened!'),
    },
    {
      id: 'export-data',
      label: 'Export Data',
      shortcut: 'Cmd+E',
      action: () => toast.show('Data export started!'),
    },
    {
      id: 'search-transactions',
      label: 'Search Transactions',
      shortcut: 'Cmd+F',
      action: () => toast.show('Transaction search opened!'),
    },
    {
      id: 'quick-income',
      label: 'Quick Add Income',
      shortcut: 'Cmd+I',
      action: () => toast.show('Quick income form opened!'),
    },
    {
      id: 'quick-expense',
      label: 'Quick Add Expense',
      shortcut: 'Cmd+X',
      action: () => toast.show('Quick expense form opened!'),
    },
    {
      id: 'budget-overview',
      label: 'View Budget Overview',
      shortcut: 'Cmd+B',
      action: () => toast.show('Budget overview opened!'),
    },
    {
      id: 'analytics',
      label: 'Open Analytics',
      shortcut: 'Cmd+A',
      action: () => toast.show('Analytics dashboard opened!'),
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.shortcut.toLowerCase().includes(query.toLowerCase()),
  );

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 1rem',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1rem',
            borderBottom: '1px solid hsl(var(--p-border))',
          }}
        >
          <Input
            placeholder="Type a command or search..."
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            style={{border: 'none', outline: 'none', boxShadow: 'none'}}
            autoFocus
          />
        </div>
        <ScrollArea style={{maxHeight: '400px'}}>
          <div style={{padding: '0.5rem'}}>
            {filteredCommands.length === 0 ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'hsl(var(--p-muted-foreground))',
                }}
              >
                No commands found
              </div>
            ) : (
              filteredCommands.map((cmd) => (
                <div
                  key={cmd.id}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    borderRadius: '0.375rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      'hsl(var(--p-muted))')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                >
                  <span>{cmd.label}</span>
                  <Badge variant="outline">{cmd.shortcut}</Badge>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'transactions' | 'goals' | 'settings'
  >('overview');
  const [isMobile, setIsMobile] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const tabs = ['overview', 'transactions', 'goals', 'settings'] as const;
        setActiveTab(tabs[parseInt(e.key) - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Budget Alert',
      message: "You've spent 80% of your food budget",
      type: 'warning',
      time: '2 min ago',
    },
    {
      id: 2,
      title: 'Goal Progress',
      message: 'Emergency Fund reached 75%!',
      type: 'success',
      time: '1 hour ago',
    },
    {
      id: 3,
      title: 'Large Expense',
      message: 'Transaction of $500 detected',
      type: 'info',
      time: '3 hours ago',
    },
  ];

  const tabContent = {
    overview: <OverviewTab />,
    transactions: <TransactionsTab />,
    goals: <GoalsTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="dashboard-app">
      <CommandPalette
        open={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />

      <header className="dashboard-header">
        <div className="header-content">
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <h1>
              <iconify-icon
                icon="lucide:wallet"
                width="24"
                height="24"
                style={{marginRight: '0.5rem'}}
              ></iconify-icon>
              Personal Finance Dashboard
            </h1>
            <Badge variant="outline">PRO</Badge>
          </div>

          <div className="header-actions">
            {/* Global Search */}
            <div style={{position: 'relative'}}>
              <Input
                placeholder="Search... (Cmd+K)"
                style={{width: '200px', paddingRight: '3rem'}}
                onFocus={() => setShowCommandPalette(true)}
              />
              <Button
                size="icon"
                variant="ghost"
                style={{
                  position: 'absolute',
                  right: '0.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.5rem',
                  height: '1.5rem',
                }}
                onClick={() => setShowCommandPalette(true)}
              >
                <iconify-icon
                  icon="lucide:search"
                  width="16"
                  height="16"
                ></iconify-icon>
              </Button>
            </div>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger>
                <Button
                  size="icon"
                  variant="outline"
                  style={{position: 'relative'}}
                >
                  <iconify-icon
                    icon="lucide:bell"
                    width="16"
                    height="16"
                  ></iconify-icon>
                  <Badge
                    variant="destructive"
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {notifications.length}
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent style={{width: '350px'}}>
                <div style={{padding: '1rem'}}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <h4 style={{margin: 0}}>Notifications</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        toast.show('All notifications marked as read!')
                      }
                    >
                      Mark all read
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                    }}
                  >
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid hsl(var(--p-border))',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}
                        >
                          <div style={{flex: 1}}>
                            <div
                              style={{fontWeight: 'bold', fontSize: '0.875rem'}}
                            >
                              {notif.title}
                            </div>
                            <div
                              style={{
                                fontSize: '0.75rem',
                                color: 'hsl(var(--p-muted-foreground))',
                                marginTop: '0.25rem',
                              }}
                            >
                              {notif.message}
                            </div>
                            <div
                              style={{
                                fontSize: '0.75rem',
                                color: 'hsl(var(--p-muted-foreground))',
                                marginTop: '0.25rem',
                              }}
                            >
                              {notif.time}
                            </div>
                          </div>
                          <Badge
                            variant={
                              notif.type === 'warning'
                                ? 'destructive'
                                : notif.type === 'success'
                                  ? 'default'
                                  : 'secondary'
                            }
                          >
                            <iconify-icon
                              icon={
                                notif.type === 'warning'
                                  ? 'lucide:alert-triangle'
                                  : notif.type === 'success'
                                    ? 'lucide:check-circle'
                                    : 'lucide:info'
                              }
                              width="12"
                              height="12"
                            ></iconify-icon>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Quick Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="outline">
                  <iconify-icon
                    icon="lucide:zap"
                    width="16"
                    height="16"
                  ></iconify-icon>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => toast.show('Quick add income opened!')}
                >
                  <iconify-icon
                    icon="lucide:plus-circle"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Quick Add Income
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Quick add expense opened!')}
                >
                  <iconify-icon
                    icon="lucide:minus-circle"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Quick Add Expense
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Goal progress updated!')}
                >
                  <iconify-icon
                    icon="lucide:target"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Update Goal
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={() => toast.show('Data exported!')}>
                  <iconify-icon
                    icon="lucide:download"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.show('Backup created!')}>
                  <iconify-icon
                    icon="lucide:hard-drive"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Backup Data
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={() => setShowCommandPalette(true)}>
                  <iconify-icon
                    icon="lucide:command"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Command Palette
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="outline">
                  <iconify-icon
                    icon="lucide:help-circle"
                    width="16"
                    height="16"
                  ></iconify-icon>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => toast.show('Help center opened!')}
                >
                  <iconify-icon
                    icon="lucide:book-open"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowCommandPalette(true)}>
                  <iconify-icon
                    icon="lucide:keyboard"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Keyboard Shortcuts
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Tutorial started!')}
                >
                  <iconify-icon
                    icon="lucide:graduation-cap"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Interactive Tutorial
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                  onClick={() => toast.show('Feedback form opened!')}
                >
                  <iconify-icon
                    icon="lucide:message-circle"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Send Feedback
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Feature request form opened!')}
                >
                  <iconify-icon
                    icon="lucide:lightbulb"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Request Feature
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                  onClick={() => toast.show('About page opened!')}
                >
                  <iconify-icon
                    icon="lucide:info"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  About
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar
                  src="https://github.com/developit.png"
                  alt="Profile"
                  style={{cursor: 'pointer'}}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toast.show('Profile opened!')}>
                  <iconify-icon
                    icon="lucide:user"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                  <iconify-icon
                    icon="lucide:settings"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.show('Billing opened!')}>
                  <iconify-icon
                    icon="lucide:credit-card"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Billing
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={() => toast.show('Theme changed!')}>
                  <iconify-icon
                    icon="lucide:moon"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Dark Mode
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast.show('Language changed!')}
                >
                  <iconify-icon
                    icon="lucide:globe"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Language
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={() => toast.show('Logged out!')}>
                  <iconify-icon
                    icon="lucide:log-out"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div
        style={{
          backgroundColor: 'hsl(var(--p-card))',
          borderBottom: '1px solid hsl(var(--p-border))',
          padding: '0.5rem 2rem',
        }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span style={{textTransform: 'capitalize'}}>{activeTab}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="dashboard-main">
        {isMobile ? (
          <div className="mobile-tabs">
            <TabList className="mobile-tab-list">
              <Tab
                aria-selected={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
                className="mobile-tab"
              >
                <iconify-icon
                  icon="lucide:bar-chart-3"
                  width="16"
                  height="16"
                  style={{marginRight: '0.25rem'}}
                ></iconify-icon>
                Overview
              </Tab>
              <Tab
                aria-selected={activeTab === 'transactions'}
                onClick={() => setActiveTab('transactions')}
                className="mobile-tab"
              >
                <iconify-icon
                  icon="lucide:credit-card"
                  width="16"
                  height="16"
                  style={{marginRight: '0.25rem'}}
                ></iconify-icon>
                Transactions
              </Tab>
              <Tab
                aria-selected={activeTab === 'goals'}
                onClick={() => setActiveTab('goals')}
                className="mobile-tab"
              >
                <iconify-icon
                  icon="lucide:target"
                  width="16"
                  height="16"
                  style={{marginRight: '0.25rem'}}
                ></iconify-icon>
                Goals
              </Tab>
              <Tab
                aria-selected={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
                className="mobile-tab"
              >
                <iconify-icon
                  icon="lucide:settings"
                  width="16"
                  height="16"
                  style={{marginRight: '0.25rem'}}
                ></iconify-icon>
                Settings
              </Tab>
            </TabList>
            <div className="tab-content">{tabContent[activeTab]}</div>
          </div>
        ) : (
          <div className="desktop-layout">
            <nav className="sidebar-nav">
              <div className="nav-section">
                <h3>Dashboard</h3>
                <button
                  className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <iconify-icon
                    icon="lucide:bar-chart-3"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  />
                  Overview
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.75rem',
                      opacity: 0.7,
                    }}
                  >
                    ⌘1
                  </span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  <iconify-icon
                    icon="lucide:credit-card"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Transactions
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.75rem',
                      opacity: 0.7,
                    }}
                  >
                    ⌘2
                  </span>
                </button>
                <button
                  className={`nav-item ${activeTab === 'goals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('goals')}
                >
                  <iconify-icon
                    icon="lucide:target"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Goals
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.75rem',
                      opacity: 0.7,
                    }}
                  >
                    ⌘3
                  </span>
                </button>
              </div>

              <div className="nav-section">
                <h3>Tools</h3>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <button
                      className="nav-item"
                      onClick={() => toast.show('Calculator opened!')}
                    >
                      <iconify-icon
                        icon="lucide:calculator"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      ></iconify-icon>
                      Calculator
                    </button>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => toast.show('Basic calculator opened!')}
                    >
                      <iconify-icon
                        icon="lucide:calculator"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      ></iconify-icon>
                      Basic Calculator
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => toast.show('Loan calculator opened!')}
                    >
                      <iconify-icon
                        icon="lucide:home"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      ></iconify-icon>
                      Loan Calculator
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() =>
                        toast.show('Investment calculator opened!')
                      }
                    >
                      <iconify-icon
                        icon="lucide:trending-up"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      />
                      Investment Calculator
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>

                <button
                  className="nav-item"
                  onClick={() => toast.show('Reports opened!')}
                >
                  <iconify-icon
                    icon="lucide:file-text"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Reports
                </button>
                <button
                  className="nav-item"
                  onClick={() => toast.show('Insights opened!')}
                >
                  <iconify-icon
                    icon="lucide:brain"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Insights
                </button>
              </div>

              <div className="nav-section">
                <h3>Account</h3>
                <button
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <iconify-icon
                    icon="lucide:settings"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Settings
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.75rem',
                      opacity: 0.7,
                    }}
                  >
                    ⌘4
                  </span>
                </button>
                <button
                  className="nav-item"
                  onClick={() => toast.show('Help opened!')}
                >
                  <iconify-icon
                    icon="lucide:help-circle"
                    width="16"
                    height="16"
                    style={{marginRight: '0.5rem'}}
                  ></iconify-icon>
                  Help
                </button>
              </div>

              {/* Sidebar Footer */}
              <div
                style={{
                  marginTop: 'auto',
                  padding: '1rem',
                  borderTop: '1px solid hsl(var(--p-border))',
                }}
              >
                <Alert style={{padding: '0.75rem'}}>
                  <div style={{fontSize: '0.875rem'}}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        marginBottom: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <iconify-icon
                        icon="lucide:lightbulb"
                        width="16"
                        height="16"
                        style={{marginRight: '0.5rem'}}
                      ></iconify-icon>
                      Pro Tip
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'hsl(var(--p-muted-foreground))',
                      }}
                    >
                      Press ⌘K to open the command palette and navigate faster!
                    </div>
                  </div>
                </Alert>
              </div>
            </nav>

            <div className="main-content">{tabContent[activeTab]}</div>
          </div>
        )}
      </main>
    </div>
  );
}
