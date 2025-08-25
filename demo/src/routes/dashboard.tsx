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
  toast,
} from 'pui';
import { useState, useEffect, useRef } from 'preact/hooks';

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
  { id: 1, title: 'Salary', amount: 5000, category: 'Income', date: '2024-01-01', type: 'income' },
  { id: 2, title: 'Groceries', amount: 240, category: 'Food', date: '2024-01-02', type: 'expense' },
  { id: 3, title: 'Gas', amount: 60, category: 'Transportation', date: '2024-01-03', type: 'expense' },
  { id: 4, title: 'Freelance', amount: 800, category: 'Income', date: '2024-01-04', type: 'income' },
  { id: 5, title: 'Coffee', amount: 25, category: 'Food', date: '2024-01-05', type: 'expense' },
  { id: 6, title: 'Netflix', amount: 15, category: 'Entertainment', date: '2024-01-06', type: 'expense' },
];

const initialGoals: Goal[] = [
  { id: 1, title: 'Emergency Fund', target: 10000, current: 7500, deadline: '2024-12-31', category: 'Savings' },
  { id: 2, title: 'Vacation Fund', target: 3000, current: 1200, deadline: '2024-08-01', category: 'Travel' },
  { id: 3, title: 'New Laptop', target: 2500, current: 800, deadline: '2024-06-01', category: 'Tech' },
];

const budgetCategories: BudgetCategory[] = [
  { name: 'Food', budgeted: 500, spent: 265, color: '#ef4444' },
  { name: 'Transportation', budgeted: 200, spent: 120, color: '#3b82f6' },
  { name: 'Entertainment', budgeted: 150, spent: 45, color: '#8b5cf6' },
  { name: 'Shopping', budgeted: 300, spent: 180, color: '#f59e0b' },
  { name: 'Bills', budgeted: 800, spent: 750, color: '#10b981' },
];

const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Income'];

function OverviewTab() {
  const totalIncome = initialTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = initialTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <Card className="stat-card income">
          <div className="stat-header">
            <h3>Total Income</h3>
            <span className="stat-icon">📈</span>
          </div>
          <div className="stat-value">${totalIncome.toLocaleString()}</div>
          <div className="stat-change positive">+12% from last month</div>
        </Card>
        
        <Card className="stat-card expenses">
          <div className="stat-header">
            <h3>Total Expenses</h3>
            <span className="stat-icon">📉</span>
          </div>
          <div className="stat-value">${totalExpenses.toLocaleString()}</div>
          <div className="stat-change negative">+5% from last month</div>
        </Card>
        
        <Card className="stat-card net">
          <div className="stat-header">
            <h3>Net Income</h3>
            <span className="stat-icon">💰</span>
          </div>
          <div className="stat-value">${netIncome.toLocaleString()}</div>
          <div className="stat-change positive">+8% from last month</div>
        </Card>
        
        <Card className="stat-card savings">
          <div className="stat-header">
            <h3>Savings Rate</h3>
            <span className="stat-icon">🎯</span>
          </div>
          <div className="stat-value">{Math.round((netIncome / totalIncome) * 100)}%</div>
          <div className="stat-change positive">Target: 20%</div>
        </Card>
      </div>

      <div className="dashboard-row">
        <Card className="budget-overview">
          <h3>Budget Overview</h3>
          <div className="budget-categories">
            {budgetCategories.map(category => {
              const percentage = (category.spent / category.budgeted) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={category.name} className="budget-category">
                  <div className="budget-header">
                    <span className="category-name">{category.name}</span>
                    <span className={`budget-amount ${isOverBudget ? 'over-budget' : ''}`}>
                      ${category.spent} / ${category.budgeted}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    max={100} 
                    className={`budget-progress ${isOverBudget ? 'over-budget' : ''}`}
                  />
                  <div className="budget-percentage">
                    {percentage.toFixed(0)}% {isOverBudget && '(Over Budget!)'}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="recent-transactions">
          <h3>Recent Transactions</h3>
          <ScrollArea className="transactions-list">
            {initialTransactions.slice(0, 6).map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-details">
                  <div className="transaction-title">{transaction.title}</div>
                  <div className="transaction-category">{transaction.category}</div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </div>
              </div>
            ))}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}

function TransactionsTab() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'expense' as 'income' | 'expense',
    description: ''
  });
  const [filter, setFilter] = useState('all');

  function addTransaction() {
    if (!newTransaction.title || !newTransaction.amount) {
      toast.show('Please fill in all required fields', { title: 'Validation Error' });
      return;
    }

    const transaction: Transaction = {
      id: Date.now(),
      title: newTransaction.title,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      date: new Date().toISOString().split('T')[0],
      type: newTransaction.type,
      description: newTransaction.description
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({ title: '', amount: '', category: 'Food', type: 'expense', description: '' });
    setShowAddForm(false);
    toast.show('Transaction added successfully!', { title: 'Success', icon: '✅' });
  }

  function deleteTransaction(id: number) {
    setTransactions(transactions.filter(t => t.id !== id));
    toast.show('Transaction deleted', { title: 'Deleted' });
  }

  const filteredTransactions = transactions.filter(t => 
    filter === 'all' || t.type === filter
  );

  return (
    <div className="transactions-tab">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="transactions-actions">
          <Select value={filter} onInput={(e) => setFilter((e.target as HTMLSelectElement).value)}>
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </Select>
          <Button onClick={() => setShowAddForm(true)}>Add Transaction</Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="add-transaction-form">
          <h3>Add New Transaction</h3>
          <div className="form-row">
            <div className="form-field">
              <label>Title</label>
              <Input 
                value={newTransaction.title}
                onInput={(e) => setNewTransaction({...newTransaction, title: (e.target as HTMLInputElement).value})}
                placeholder="Transaction title"
              />
            </div>
            <div className="form-field">
              <label>Amount</label>
              <Input 
                type="number"
                value={newTransaction.amount}
                onInput={(e) => setNewTransaction({...newTransaction, amount: (e.target as HTMLInputElement).value})}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Category</label>
              <Select 
                value={newTransaction.category}
                onInput={(e) => setNewTransaction({...newTransaction, category: (e.target as HTMLSelectElement).value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </div>
            <div className="form-field">
              <label>Type</label>
              <Select 
                value={newTransaction.type}
                onInput={(e) => setNewTransaction({...newTransaction, type: (e.target as HTMLSelectElement).value as 'income' | 'expense'})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
            </div>
          </div>
          <div className="form-field">
            <label>Description (Optional)</label>
            <Textarea 
              value={newTransaction.description}
              onInput={(e) => setNewTransaction({...newTransaction, description: (e.target as HTMLTextAreaElement).value})}
              placeholder="Additional details..."
            />
          </div>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={addTransaction}>Add Transaction</Button>
          </div>
        </Card>
      )}

      <Card className="transactions-table-card">
        <Table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.title}</td>
                <td>
                  <Badge variant="secondary">{transaction.category}</Badge>
                </td>
                <td>
                  <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                    {transaction.type}
                  </Badge>
                </td>
                <td className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size="sm" variant="ghost">⋯</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => deleteTransaction(transaction.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    current: '',
    deadline: '',
    category: 'Savings'
  });

  function addGoal() {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      toast.show('Please fill in all required fields', { title: 'Validation Error' });
      return;
    }

    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      target: parseFloat(newGoal.target),
      current: parseFloat(newGoal.current) || 0,
      deadline: newGoal.deadline,
      category: newGoal.category
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', target: '', current: '', deadline: '', category: 'Savings' });
    setShowAddForm(false);
    toast.show('Goal created successfully!', { title: 'Success', icon: '🎯' });
  }

  function updateGoalProgress(id: number, amount: number) {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, current: Math.min(g.current + amount, g.target) } : g
    ));
    toast.show(`Added $${amount} to goal!`, { title: 'Progress Updated' });
  }

  return (
    <div className="goals-tab">
      <div className="goals-header">
        <h2>Financial Goals</h2>
        <Button onClick={() => setShowAddForm(true)}>Add Goal</Button>
      </div>

      {showAddForm && (
        <Card className="add-goal-form">
          <h3>Create New Goal</h3>
          <div className="form-row">
            <div className="form-field">
              <label>Goal Title</label>
              <Input 
                value={newGoal.title}
                onInput={(e) => setNewGoal({...newGoal, title: (e.target as HTMLInputElement).value})}
                placeholder="e.g., Emergency Fund"
              />
            </div>
            <div className="form-field">
              <label>Target Amount</label>
              <Input 
                type="number"
                value={newGoal.target}
                onInput={(e) => setNewGoal({...newGoal, target: (e.target as HTMLInputElement).value})}
                placeholder="10000"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Current Amount</label>
              <Input 
                type="number"
                value={newGoal.current}
                onInput={(e) => setNewGoal({...newGoal, current: (e.target as HTMLInputElement).value})}
                placeholder="0"
              />
            </div>
            <div className="form-field">
              <label>Deadline</label>
              <Input 
                type="date"
                value={newGoal.deadline}
                onInput={(e) => setNewGoal({...newGoal, deadline: (e.target as HTMLInputElement).value})}
              />
            </div>
          </div>
          <div className="form-field">
            <label>Category</label>
            <Select 
              value={newGoal.category}
              onInput={(e) => setNewGoal({...newGoal, category: (e.target as HTMLSelectElement).value})}
            >
              <option value="Savings">Savings</option>
              <option value="Travel">Travel</option>
              <option value="Tech">Technology</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
            </Select>
          </div>
          <div className="form-actions">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={addGoal}>Create Goal</Button>
          </div>
        </Card>
      )}

      <div className="goals-grid">
        {goals.map(goal => {
          const progress = (goal.current / goal.target) * 100;
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={goal.id} className="goal-card">
              <div className="goal-header">
                <div className="goal-title">
                  <h3>{goal.title}</h3>
                  <Badge variant="outline">{goal.category}</Badge>
                </div>
                <div className="goal-amount">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </div>
              </div>
              
              <Progress value={progress} max={100} className="goal-progress" />
              
              <div className="goal-stats">
                <div className="progress-percentage">{progress.toFixed(1)}% Complete</div>
                <div className="days-left">
                  {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                </div>
              </div>
              
              <div className="goal-actions">
                <Popover>
                  <PopoverTrigger>
                    <Button size="sm" variant="outline">Add Progress</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="add-progress-form">
                      <h4>Add to Goal</h4>
                      <div className="quick-amounts">
                        <Button size="sm" onClick={() => updateGoalProgress(goal.id, 50)}>$50</Button>
                        <Button size="sm" onClick={() => updateGoalProgress(goal.id, 100)}>$100</Button>
                        <Button size="sm" onClick={() => updateGoalProgress(goal.id, 250)}>$250</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Card>
          );
        })}
      </div>
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
          <Select value={currency} onInput={(e) => setCurrency((e.target as HTMLSelectElement).value)}>
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
          <Switch checked={darkMode} onInput={(e) => setDarkMode((e.target as HTMLInputElement).checked)} />
        </div>
      </Card>

      <Card className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Enable Notifications</label>
            <p>Receive notifications about your financial activity</p>
          </div>
          <Switch checked={notifications} onInput={(e) => setNotifications((e.target as HTMLInputElement).checked)} />
        </div>
        
        <Separator />
        
        <div className="setting-item">
          <div className="setting-info">
            <label>Budget Alerts</label>
            <p>Get notified when you exceed budget limits</p>
          </div>
          <Switch checked={budgetAlerts} onInput={(e) => setBudgetAlerts((e.target as HTMLInputElement).checked)} />
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'goals' | 'settings'>('overview');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabContent = {
    overview: <OverviewTab />,
    transactions: <TransactionsTab />,
    goals: <GoalsTab />,
    settings: <SettingsTab />
  };

  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>💰 Personal Finance Dashboard</h1>
          <div className="header-actions">
            <Tooltip title="Export Data">
              <Button size="icon" variant="outline">📊</Button>
            </Tooltip>
            <Avatar src="https://github.com/developit.png" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {isMobile ? (
          <div className="mobile-tabs">
            <TabList className="mobile-tab-list">
              <Tab 
                aria-selected={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')}
                className="mobile-tab"
              >
                📊 Overview
              </Tab>
              <Tab 
                aria-selected={activeTab === 'transactions'} 
                onClick={() => setActiveTab('transactions')}
                className="mobile-tab"
              >
                💳 Transactions
              </Tab>
              <Tab 
                aria-selected={activeTab === 'goals'} 
                onClick={() => setActiveTab('goals')}
                className="mobile-tab"
              >
                🎯 Goals
              </Tab>
              <Tab 
                aria-selected={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
                className="mobile-tab"
              >
                ⚙️ Settings
              </Tab>
            </TabList>
            <div className="tab-content">
              {tabContent[activeTab]}
            </div>
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
                  📊 Overview
                </button>
                <button 
                  className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  💳 Transactions
                </button>
                <button 
                  className={`nav-item ${activeTab === 'goals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('goals')}
                >
                  🎯 Goals
                </button>
              </div>
              <div className="nav-section">
                <h3>Account</h3>
                <button 
                  className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  ⚙️ Settings
                </button>
              </div>
            </nav>
            <div className="main-content">
              {tabContent[activeTab]}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}