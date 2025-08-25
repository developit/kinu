import {
  Button,
  Card,
  Input,
  TabList,
  Tab,
  TabPanel,
  Badge,
  Alert,
  Progress,
  Switch,
  Tooltip,
  Avatar,
  Separator,
  Dialog,
  toast,
  ToastContainer,
  Slider,
  Checkbox,
  Label,
} from 'pui';
import {useState, useEffect} from 'preact/hooks';
import {Nav} from '../nav';

export default function Home() {
  return (
    <div class="home">
      <ToastContainer />
      <Nav />

      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1>
              Build beautiful UIs with <span class="highlight">PUI</span>
            </h1>
            <p class="hero-subtitle">
              A lightweight <strong>5kB</strong> component library that
              leverages native HTML commands for interactions. Accessible,
              performant interfaces without the JS bloat.
            </p>
            <div class="hero-actions">
              <Button href="/getting-started" size="lg">
                Get Started
              </Button>
              <Button href="/components" variant="outline" size="lg">
                Browse Components
              </Button>
            </div>
          </div>
          <div class="hero-demo">
            <HeroDemo />
          </div>
        </div>
      </section>

      <section class="showcase">
        <div class="showcase-header">
          <h2>See it in action</h2>
          <p>
            Interactive demos showcasing real-world usage—all powered by just
            5kB of JavaScript
          </p>
        </div>
        <div class="showcase-grid">
          <Card class="showcase-demo">
            <h3>Form Controls</h3>
            <p>Accessible forms with validation feedback</p>
            <FormDemo />
          </Card>
          <Card class="showcase-demo">
            <h3>Data Visualization</h3>
            <p>Progress tracking and interactive displays</p>
            <DataDemo />
          </Card>
          <Card class="showcase-demo">
            <h3>Settings Panel</h3>
            <p>Toggle switches and user preferences</p>
            <SettingsDemo />
          </Card>
          <Card class="showcase-demo">
            <h3>Notifications</h3>
            <p>Toast messages and alert dialogs</p>
            <NotificationDemo />
          </Card>
        </div>
      </section>

      <section class="why-preact-ui">
        <h2>Why developers choose PUI</h2>
        <div class="benefits-grid">
          <div class="benefit">
            <div class="benefit-icon">🪶</div>
            <h3>Incredibly Light</h3>
            <p>
              Just 5kB of JavaScript—smaller than most images. Your users will
              thank you for the fast load times.
            </p>
          </div>
          <div class="benefit">
            <div class="benefit-icon">🔧</div>
            <h3>Native HTML Power</h3>
            <p>
              Uses HTML commands for interactions instead of manually wired up
              event handlers. Better performance, better accessibility.
            </p>
          </div>
          <div class="benefit">
            <div class="benefit-icon">📱</div>
            <h3>Works Everywhere</h3>
            <p>
              Responsive by default. Components adapt seamlessly from mobile to
              desktop without bloating your bundle.
            </p>
          </div>
          <div class="benefit">
            <div class="benefit-icon">🚀</div>
            <h3>Ship Faster</h3>
            <p>
              Skip the component building phase. Focus on your app logic while
              we handle the lightweight UI foundations.
            </p>
          </div>
        </div>
      </section>

      <section class="real-world">
        <h2>Built for real applications</h2>
        <p class="real-world-subtitle">
          From simple forms to complex dashboards, PUI scales with your needs
        </p>
        <div class="demo-links">
          <Button href="/linear" variant="secondary" size="lg">
            📊 Linear-style Dashboard
          </Button>
          <Button href="/chat" variant="secondary" size="lg">
            💬 Chat Application
          </Button>
          <Button href="/player" variant="secondary" size="lg">
            🎵 Music Player
          </Button>
          <Button variant="outline" href="https://github.com/">
            GitHub
          </Button>
        </div>
      </section>

      <section class="cta">
        <Card class="cta-card">
          <h2>Ready to build?</h2>
          <p>
            Join developers who are shipping faster with just 5kB of JavaScript
          </p>
          <div class="cta-actions">
            <Button href="/getting-started" size="lg">
              Start Building →
            </Button>
            <Button variant="ghost" href="/components">
              Explore Components
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}

function HeroDemo() {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Design new landing page', completed: true},
    {id: 2, text: 'Implement user authentication', completed: true},
    {id: 3, text: 'Add payment processing', completed: false},
    {id: 4, text: 'Write documentation', completed: false},
  ]);
  const [newTask, setNewTask] = useState('');

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);
    setNewTask('');
  };

  return (
    <Card class="hero-demo-card">
      <div class="hero-demo-header">
        <Avatar>JD</Avatar>
        <div>
          <div class="demo-title">Project Dashboard</div>
          <Badge variant={progress === 100 ? 'default' : 'secondary'}>
            {completedCount}/{tasks.length} Complete
          </Badge>
        </div>
      </div>

      <div class="progress-section">
        <div class="progress-label">Overall Progress</div>
        <Progress value={progress} max={100} />
        <div class="progress-text">{Math.round(progress)}%</div>
      </div>

      <div class="task-list">
        {tasks.map((task) => (
          <div key={task.id} class="task-item">
            <Checkbox
              checked={task.completed}
              onInput={() => toggleTask(task.id)}
            />
            <span class={task.completed ? 'task-completed' : ''}>
              {task.text}
            </span>
          </div>
        ))}
      </div>

      <div class="add-task">
        <Input
          placeholder="Add new task..."
          value={newTask}
          onInput={(e) => setNewTask((e.target as HTMLInputElement).value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Tooltip title="Add task">
          <Button size="sm" onClick={addTask} disabled={!newTask.trim()}>
            +
          </Button>
        </Tooltip>
      </div>
    </Card>
  );
}

function FormDemo() {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{name?: string; agreed?: string}>({});

  const validate = () => {
    const newErrors: {name?: string; agreed?: string} = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!agreed) newErrors.agreed = 'You must agree to continue';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      toast.show('Form submitted successfully!', {
        title: 'Success',
        icon: '✅',
      });
    }
  };

  return (
    <div class="demo-form">
      <div class="form-field">
        <Label htmlFor="demo-name">Full Name</Label>
        <Input
          id="demo-name"
          placeholder="Enter your name"
          value={name}
          onInput={(e) => {
            setName((e.target as HTMLInputElement).value);
            if (errors.name) setErrors({...errors, name: undefined});
          }}
        />
        {errors.name && <div class="error-message">{errors.name}</div>}
      </div>
      <div class="form-field">
        <div class="checkbox-field">
          <Checkbox
            id="demo-agree"
            checked={agreed}
            onInput={(e) => {
              setAgreed((e.target as HTMLInputElement).checked);
              if (errors.agreed) setErrors({...errors, agreed: undefined});
            }}
          />
          <Label htmlFor="demo-agree">I agree to the terms</Label>
        </div>
        {errors.agreed && <div class="error-message">{errors.agreed}</div>}
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

function DataDemo() {
  const [value, setValue] = useState(65);

  return (
    <div class="data-demo">
      <div class="metric">
        <div class="metric-label">System Performance</div>
        <div class="metric-value">{Math.round(value)}%</div>
      </div>
      <Progress value={value} max={100} />
      <div class="demo-controls">
        <Slider
          min={0}
          max={100}
          value={value}
          onInput={(e) =>
            setValue(Number((e.target as HTMLInputElement).value))
          }
        />
      </div>
    </div>
  );
}

function SettingsDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(75);

  return (
    <div class="settings-demo">
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-title">Push Notifications</div>
          <div class="setting-desc">Receive updates and alerts</div>
        </div>
        <Switch
          checked={notifications}
          onInput={(e) =>
            setNotifications((e.target as HTMLInputElement).checked)
          }
        />
      </div>
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-title">Dark Mode</div>
          <div class="setting-desc">Use dark theme</div>
        </div>
        <Switch
          checked={darkMode}
          onInput={(e) => setDarkMode((e.target as HTMLInputElement).checked)}
        />
      </div>
      <div class="setting-item">
        <div class="setting-info">
          <div class="setting-title">Volume</div>
          <div class="setting-desc">{volume}%</div>
        </div>
        <Slider
          min={0}
          max={100}
          value={volume}
          onInput={(e) =>
            setVolume(Number((e.target as HTMLInputElement).value))
          }
        />
      </div>
    </div>
  );
}

function NotificationDemo() {
  return (
    <div class="notification-demo">
      <div class="demo-buttons">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.show('Task completed!', {
              title: 'Success',
              icon: '✅',
            })
          }
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.show('Connection lost', {
              title: 'Warning',
              icon: '⚠️',
            })
          }
        >
          Warning Toast
        </Button>
      </div>
      <Alert>
        <strong>Tip:</strong> Click the buttons above to see toast notifications
        in action.
      </Alert>
      <Dialog>
        <Dialog.Trigger>
          <Button variant="outline" size="sm">
            Open Dialog
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <h3>Confirm Action</h3>
          <p>Are you sure you want to continue?</p>
          <div class="dialog-actions">
            <Dialog.Close>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={() => toast.show('Action confirmed!')}>
                Confirm
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
