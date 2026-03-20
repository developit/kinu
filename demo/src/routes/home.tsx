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
  Separator,
} from 'kinu';
import {useState} from 'preact/hooks';
import {Nav} from '../nav';

export default function Home() {
  return (
    <div class="home">
      <ToastContainer />
      <Nav />

      {/* Hero Section */}
      <section class="hero-section">
        <div class="hero-bg-glow" aria-hidden="true" />
        <div class="hero-inner">
          <h1 class="hero-title">
            Preact UI toolkit.
            <br />
            <span class="hero-accent">10x smaller</span> than you think.
          </h1>
          <p class="hero-tagline">Intuitive for humans + LLMs</p>
          <div class="hero-desc-wrap">
            <p class="hero-description">
              Kinu: The Japanese word for silk. An ultra-thin layer of styling
              and ergonomics over native HTML. Zero dependencies, zero runtime
              overhead, zero wrapper divs.
            </p>
          </div>
          <div class="hero-buttons">
            <Button href="/getting-started" size="lg" class="btn-pill btn-dark">
              Start Building
            </Button>
            <Button
              href="/docs/button"
              variant="outline"
              size="lg"
              class="btn-pill btn-outline-light"
            >
              View Components
            </Button>
          </div>
        </div>

        {/* Fluid Visual Element */}
        <div class="hero-image-wrap">
          <img
            class="hero-image"
            alt="Abstract white silk fabric flowing in air"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD4t96svJh9sUhAPBSpwgVhySABo_of9a7hkkAzjrGPGErQbMDktIxbcOUwwH9E2PQqx7YID--LKqJyt0Fjq8rnU6paqZAlDEYSSrFemSSNFJlmNq5wvyzWrs4rT8wY5AtERHPPAMpX_bHntfkMPHdbBM3_jts83DhK3c2SPLAciU8hP_24GzyQCTV2j6C5SU241SQXWsDCiUiuSqd4cwkJ_IuB1ShAurdjDMM1dc5QYxeq3jCmoWPBxIQPgOol7_saTuowNRxrCnr"
          />
          <div class="hero-image-overlay" aria-hidden="true" />
        </div>
      </section>

      {/* Architecture Section (dark) */}
      <section class="philosophy-section">
        <div class="philosophy-grid">
          <div class="philosophy-text">
            <span class="section-eyebrow philosophy-eyebrow">Architecture</span>
            <h2 class="philosophy-heading">
              A Clever
              <br />
              Facade.
            </h2>
            <p class="philosophy-body">
              Every component renders to the semantic HTML element you'd write by
              hand. A {'<Button>'} becomes a {'<button>'}. A {'<Dialog>'} becomes
              a {'<dialog>'}. Kinu just adds a single <code>k</code> attribute
              for styling and wires up native platform APIs like{' '}
              <code>commandfor</code> so you don't have to.
            </p>
            <div class="philosophy-stats">
              <div class="stat-block">
                <span class="stat-value">~5kb</span>
                <span class="stat-label">JS + CSS Total</span>
              </div>
              <div class="stat-block">
                <span class="stat-value">0</span>
                <span class="stat-label">Dependencies</span>
              </div>
            </div>
          </div>
          <div class="philosophy-visual">
            <div class="philosophy-circle">
              <img
                class="philosophy-image"
                alt="Monochromatic macro photography of zen stones"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM7vxr9gXZ17bIJRiUSE1L5XjJ91ZUp5FyBLtqLYWWX8kz_r44cjYiVjAT4F9gjnu5ZF6HowqlIhiXfQn8wcvySJd5I6ZkCluTM5gUAw28tsjRL-W5QxYVrdjMgZ6vrYMG2ZevRbFkkuV5E1Z_EvhlfvrTdRhr6EndESta5sw-R3Ex5vQld6e1l8SIl6azJToqDLZcg5B1WNNgBLpsLWftLWfn-OGebhOKL8mk3vAXnifnFuhkCcauUBJz_gX_6_4dsz5QijfxqXmK"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Primitives */}
      <section class="primitives-section">
        <div class="primitives-inner">
          <div class="primitives-header">
            <span class="section-eyebrow">Components</span>
            <h2 class="section-heading">Go ahead — try them.</h2>
            <p class="section-subhead">
              Every component below is live. Interact with them, inspect the DOM,
              check the network tab. What you see is what ships.
            </p>
          </div>
          <div class="primitives-grid">
            <Card class="primitive-card">
              <span class="demo-card-label">Task List</span>
              <TodoDemo />
            </Card>
            <Card class="primitive-card">
              <span class="demo-card-label">Controls</span>
              <ControlsDemo />
            </Card>
            <Card class="primitive-card">
              <span class="demo-card-label">Actions</span>
              <ButtonDemo />
            </Card>
            <Card class="primitive-card">
              <span class="demo-card-label">Feedback</span>
              <FeedbackDemo />
            </Card>
          </div>
        </div>
      </section>

      {/* HTML as First-Class Citizen */}
      <section class="native-section">
        <div class="native-inner">
          <div class="native-header">
            <h2 class="native-heading">
              <em>HTML</em> as a First-Class Citizen
            </h2>
            <p class="native-subhead">
              Kinu doesn't reinvent the wheel; it completes it. Your components
              render to native semantic elements with a single attribute for
              styling. No div soup, no synthetic event system, no runtime
              overhead.
            </p>
          </div>
          <div class="code-comparison">
            <div class="code-panel code-panel-light">
              <div class="code-panel-header">
                <span class="code-panel-label primary">Kinu Approach</span>
                <div class="code-panel-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <pre class="code-panel-code">{`<Button variant="outline" size="lg">
  Redefine Everything
</Button>

<Dialog>
  <Dialog.Trigger>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    Confirm action?
  </Dialog.Content>
</Dialog>`}</pre>
            </div>

            <div class="code-panel code-panel-dark">
              <div class="code-panel-header">
                <span class="code-panel-label muted">Rendered DOM</span>
                <div class="code-panel-dots dark">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <pre class="code-panel-code">{`<button k="button" variant="outline"
  size="lg">
  Redefine Everything
</button>

<button k="button" commandfor=":r0:"
  command="show-modal">Open</button>
<dialog k="dialog-content" id=":r0:">
  Confirm action?
</dialog>`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="cta-section">
        <div class="cta-glow" aria-hidden="true" />
        <div class="cta-inner">
          <h2 class="cta-heading">Ship less. Do more.</h2>
          <p class="cta-body">
            50+ components. Native HTML output. One tiny dependency.
          </p>
          <div class="cta-buttons">
            <Button
              href="https://github.com/developit/kinu"
              class="btn-pill btn-white"
            >
              Clone the Repo
            </Button>
            <a href="/docs" class="cta-link">
              Browse components
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo">KINU</span>
            <span class="footer-copy">
              &copy; {new Date().getFullYear()} Kinu. MIT License.
            </span>
          </div>
          <div class="footer-links">
            <a href="https://github.com/developit/kinu">GitHub</a>
            <a href="/docs">Components</a>
            <a href="/getting-started">Getting Started</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TodoDemo() {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Install kinu', completed: true},
    {id: 2, text: 'Import components', completed: true},
    {id: 3, text: 'Ship to production', completed: false},
    {id: 4, text: 'Celebrate', completed: false},
  ]);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    setTasks((prev) => [...prev, {id: Date.now(), text, completed: false}]);
    setNewTask('');
  };

  return (
    <div class="demo-todo-list">
      {tasks.map((task) => (
        <Label key={task.id} class="demo-todo-item">
          <Checkbox
            checked={task.completed}
            onInput={() => toggleTask(task.id)}
          />
          <span
            class={`demo-todo-text ${task.completed ? 'line-through' : ''}`}
          >
            {task.text}
          </span>
        </Label>
      ))}
      <Separator />
      <div class="demo-todo-add">
        <Input
          placeholder="Add a task..."
          value={newTask}
          onInput={(e) => setNewTask((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <Button size="sm" onClick={addTask} disabled={!newTask.trim()}>
          Add
        </Button>
      </div>
    </div>
  );
}

function ControlsDemo() {
  const [volume, setVolume] = useState(68);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div class="demo-controls">
      <div class="demo-control-row">
        <Label class="demo-control-label">Volume</Label>
        <div class="demo-control-value">{volume}%</div>
      </div>
      <Slider
        min={0}
        max={100}
        value={volume}
        onInput={(e) => setVolume(Number((e.target as HTMLInputElement).value))}
      />
      <Separator />
      <Label class="demo-switch-row">
        <div>
          <div class="demo-control-label">Dark mode</div>
          <div class="demo-control-hint">Use dark theme</div>
        </div>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </Label>
      <Label class="demo-switch-row">
        <div>
          <div class="demo-control-label">Notifications</div>
          <div class="demo-control-hint">Push alerts</div>
        </div>
        <Switch
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </Label>
    </div>
  );
}

function ButtonDemo() {
  return (
    <div class="demo-buttons-stack">
      <Button
        onClick={() => toast.show('Deployed to production.', {title: 'Success'})}
      >
        Primary Action
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

function FeedbackDemo() {
  const [progress, setProgress] = useState(62);

  return (
    <div class="demo-feedback">
      <div class="demo-feedback-row">
        <span class="demo-control-label">Upload progress</span>
        <Badge variant="outline">{progress}%</Badge>
      </div>
      <Progress value={progress} max={100} />
      <div class="demo-feedback-buttons">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setProgress(Math.max(0, progress - 10))}
        >
          -10
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setProgress(Math.min(100, progress + 10))}
        >
          +10
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setProgress(100);
            toast.show('Upload complete!');
          }}
        >
          Complete
        </Button>
      </div>
      <Separator />
      <Alert>
        All components render to native HTML elements.
      </Alert>
    </div>
  );
}
