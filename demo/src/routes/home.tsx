import '../homepage.css';
import {
  Button,
  Card,
  Input,
  Badge,
  Alert,
  Progress,
  Switch,
  Tooltip,
  Avatar,
  Dialog,
  toast,
  ToastContainer,
  Slider,
  Checkbox,
  Label,
} from 'kinu';
import {useState} from 'preact/hooks';

export default function Home() {
  return (
    <div class="home">
      <ToastContainer />

      {/* ── Navigation ── */}
      <nav class="atelier-nav">
        <div class="atelier-nav-inner">
          <a href="/" class="atelier-logo">Kinu</a>
          <div class="atelier-links">
            <a href="/docs" class="atelier-link is-active">Collections</a>
            <a href="/docs/overview" class="atelier-link">Philosophy</a>
            <a href="/getting-started" class="atelier-link">Atelier</a>
            <a href="/docs/commands" class="atelier-link">Archive</a>
          </div>
          <Button href="/getting-started">Get Started</Button>
        </div>
      </nav>

      {/* ── Main ── */}
      <main class="atelier-main">

        {/* ── Hero ── */}
        <section class="hero-section">
          <div class="hero-grid">
            <div>
              <h1 class="hero-headline">
                Preact UI toolkit. <br />
                <span class="accent">10x smaller</span> <br />
                than you think.
              </h1>
              <p class="hero-subtitle">
                Intuitive for humans+LLMs. A high-performance architecture wrapped in an editorial shell.
              </p>
              <div class="hero-actions">
                <Button href="/getting-started" size="lg">
                  Get Started
                </Button>
                <Button href="/docs" variant="outline" size="lg">
                  Browse Components
                </Button>
              </div>
            </div>
            <div class="hero-visual">
              <HeroDemo />
            </div>
          </div>
        </section>

        {/* ── Laboratory ── */}
        <section class="lab-section">
          <div class="lab-inner">
            <div class="section-header">
              <span class="section-label">Laboratory</span>
              <h2 class="section-title">The Technical Workspace</h2>
            </div>
            <div class="lab-grid">
              <TaskOrchestrator />
              <SystemParameters />
            </div>
          </div>
        </section>

        {/* ── Showcase ── */}
        <section class="showcase-section">
          <div class="showcase-inner">
            <div class="section-header">
              <span class="section-label">Components</span>
              <h2 class="section-title">See it in action</h2>
            </div>
            <p class="showcase-subtitle">
              Interactive demos showcasing real-world usage—all powered by just 5kB of JavaScript
            </p>
            <div class="showcase-grid">
              <Card class="showcase-card">
                <h3>Form Controls</h3>
                <p class="showcase-card-desc">Accessible forms with validation feedback</p>
                <FormDemo />
              </Card>
              <Card class="showcase-card">
                <h3>Data Visualization</h3>
                <p class="showcase-card-desc">Progress tracking and interactive displays</p>
                <DataDemo />
              </Card>
              <Card class="showcase-card">
                <h3>Settings Panel</h3>
                <p class="showcase-card-desc">Toggle switches and user preferences</p>
                <SettingsDemo />
              </Card>
              <Card class="showcase-card">
                <h3>Notifications</h3>
                <p class="showcase-card-desc">Toast messages and alert dialogs</p>
                <NotificationDemo />
              </Card>
            </div>
          </div>
        </section>

        {/* ── Architecture ── */}
        <section class="arch-section">
          <div class="arch-inner">
            <div class="arch-text">
              <span class="arch-label">Architecture</span>
              <h2 class="arch-heading">A Clever Facade.</h2>
              <p class="arch-desc">
                Kinu offers the ergonomics of a heavy toolkit with the weight of a whisper.
                Built for high-stakes technical environments where speed is not an option—it is the standard.
              </p>
              <div class="arch-stats">
                <div class="arch-stat">
                  <div class="arch-stat-value">0.3ms</div>
                  <div class="arch-stat-label">Runtime Latency</div>
                </div>
                <div class="arch-stat">
                  <div class="arch-stat-value">No-Dep</div>
                  <div class="arch-stat-label">External Weight</div>
                </div>
              </div>
            </div>
            <div class="arch-visual">
              <div class="arch-image-wrapper">
                <div class="arch-image-bg" />
                <div class="arch-image-overlay" />
                <div class="arch-quote-card">
                  <iconify-icon icon="material-symbols:architecture" class="arch-quote-icon" />
                  <p class="arch-quote-text">
                    "The precision of Kinu allows our engineers to ship with confidence and our designers to dream without constraint."
                  </p>
                  <div class="arch-quote-attribution">
                    Lead Architect, Vertex Corp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section class="features-section">
          <div class="features-grid">
            <div class="feature-card-large">
              <iconify-icon icon="material-symbols:code" class="feature-card-large-icon" />
              <h3>HTML Commands, Not Event Handlers</h3>
              <p>Dialogs open, menus toggle, and drawers close using the proposed HTML <code>command</code>/<code>commandfor</code> attributes. No event handlers, no re-renders—just declarative markup.</p>
            </div>
            <div class="feature-card-primary">
              <iconify-icon icon="material-symbols:bolt" class="feature-card-primary-icon" style="font-variation-settings: 'FILL' 1;" />
              <div>
                <h3>~5kB Total</h3>
                <p>50+ components in ~5kB JS + CSS. Every prop forwards directly to the DOM—no runtime filtering, no abstraction tax.</p>
              </div>
            </div>
            <div class="feature-card-sm">
              <h3>01. Platform-Native</h3>
              <p>Real <code>&lt;dialog&gt;</code>, real <code>&lt;progress&gt;</code>, real form validation. Kinu wraps native HTML instead of rebuilding it.</p>
            </div>
            <div class="feature-card-sm">
              <h3>02. CSS-Driven</h3>
              <p>Variants, sizes, and states are HTML attributes read by CSS selectors. No runtime branching—instant first paint.</p>
            </div>
            <div class="feature-card-sm">
              <h3>03. AI-Readable</h3>
              <p>Props forward directly to the DOM as attributes. What you write in JSX is what renders in HTML—transparent to humans and LLMs alike.</p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section class="cta-section">
          <Card class="cta-card" padding="lg">
            <h2>Built for real applications</h2>
            <p>From simple forms to complex dashboards, kinu scales with your needs</p>
            <div class="cta-links">
              <Button href="/linear" variant="secondary" size="lg">
                Linear Dashboard
              </Button>
              <Button href="/chat" variant="secondary" size="lg">
                Chat Application
              </Button>
              <Button href="/player" variant="secondary" size="lg">
                Music Player
              </Button>
              <Button variant="outline" href="https://github.com/nicehash-developit/kinu">
                GitHub
              </Button>
            </div>
          </Card>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer class="atelier-footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">Kinu</div>
            <p class="footer-tagline">
              Engineering the digital atelier. <br /> Precise. Silent. Performance-first.
            </p>
          </div>
          <div class="footer-column">
            <h4>Craft</h4>
            <a href="/docs/overview">Philosophy</a>
            <a href="/docs">Documentation</a>
            <a href="https://github.com/nicehash-developit/kinu">Community</a>
          </div>
          <div class="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div class="footer-newsletter">
            <h4>Newsletter</h4>
            <div class="footer-input-wrapper">
              <Input type="email" class="footer-email-input" placeholder="Email Address" />
              <button class="footer-submit-btn" type="button" aria-label="Subscribe">
                <iconify-icon icon="material-symbols:arrow-forward" />
              </button>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">&copy; 2024 Kinu Technical Atelier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* ── Hero Demo ── */
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
      {id: Date.now(), text: newTask, completed: false},
    ]);
    setNewTask('');
  };

  return (
    <Card class="hero-demo-card">
      <div class="hero-demo-header">
        <Avatar>JD</Avatar>
        <div>
          <div class="demo-title">Project Dashboard</div>
          <Badge variant={progress === 100 ? undefined : 'secondary'}>
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
          <Label key={task.id} class="task-item">
            <Checkbox
              checked={task.completed}
              onInput={() => toggleTask(task.id)}
            />
            <span class={task.completed ? 'task-completed' : ''}>
              {task.text}
            </span>
          </Label>
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

/* ── Task Orchestrator (real Kinu components) ── */
function TaskOrchestrator() {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Initialize technical shader pipeline', completed: true, priority: 'High'},
    {id: 2, text: 'Calibrate silk-layer density', completed: false, priority: 'Med'},
    {id: 3, text: 'Finalize atelier documentation', completed: false, priority: 'Low'},
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  return (
    <div class="task-card">
      <div class="task-card-header">
        <h3 class="task-card-title">Task Orchestrator</h3>
        <div class="task-card-dots">
          <div class="task-card-dot active" />
          <div class="task-card-dot inactive" />
        </div>
      </div>
      <div class="task-list-items">
        {tasks.map((task) => (
          <div class="task-row" key={task.id}>
            <Label class="task-row-left">
              <Checkbox
                checked={task.completed}
                onInput={() => toggleTask(task.id)}
              />
              <span class={`task-name${task.completed ? '' : ' muted'}`}>
                {task.text}
              </span>
            </Label>
            <span class={`task-priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── System Parameters (real Kinu Slider + Button) ── */
function SystemParameters() {
  const [blur, setBlur] = useState(64);
  const [freq, setFreq] = useState(32);

  return (
    <div class="params-card">
      <h3 class="params-title">System Parameters</h3>
      <div class="params-controls">
        <div class="param-group">
          <div class="param-label-row">
            <span>Atmospheric Blur</span>
            <span class="param-value">{blur}%</span>
          </div>
          <Slider
            min={0}
            max={100}
            value={blur}
            onInput={(e) => setBlur(Number((e.target as HTMLInputElement).value))}
          />
        </div>
        <div class="param-group">
          <div class="param-label-row">
            <span>Data Frequency</span>
            <span class="param-value">{Math.round(freq * 0.375)}hz</span>
          </div>
          <Slider
            min={0}
            max={100}
            value={freq}
            onInput={(e) => setFreq(Number((e.target as HTMLInputElement).value))}
          />
        </div>
        <Button onClick={() => toast.show('Build deployed successfully!', {title: 'Deployed', icon: '🚀'})}>
          Deploy Build
        </Button>
      </div>
    </div>
  );
}

/* ── Form Demo ── */
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
      toast.show('Form submitted successfully!', {title: 'Success', icon: '✅'});
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

/* ── Data Demo ── */
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
          onInput={(e) => setValue(Number((e.target as HTMLInputElement).value))}
        />
      </div>
    </div>
  );
}

/* ── Settings Demo ── */
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
          onInput={(e) => setNotifications((e.target as HTMLInputElement).checked)}
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
          onInput={(e) => setVolume(Number((e.target as HTMLInputElement).value))}
        />
      </div>
    </div>
  );
}

/* ── Notification Demo ── */
function NotificationDemo() {
  return (
    <div class="notification-demo">
      <div class="demo-buttons">
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.show('Task completed!', {title: 'Success', icon: '✅'})}
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.show('Connection lost', {title: 'Warning', icon: '⚠️'})}
        >
          Warning Toast
        </Button>
      </div>
      <Alert>
        <strong>Tip:</strong> Click the buttons above to see toast notifications in action.
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
