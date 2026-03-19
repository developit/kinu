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
              Kinu: The Japanese word for silk. An ultra-thin, consistent layer
              of styling and ergonomics. Performance as a product feature, not
              an after-thought.
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

      {/* Philosophy Section (dark) */}
      <section class="philosophy-section">
        <div class="philosophy-grid">
          <div class="philosophy-text">
            <h2 class="philosophy-heading">
              Constraint-Driven
              <br />
              Innovation.
            </h2>
            <p class="philosophy-body">
              We believe the best experiences aren't built by adding more, but
              by refining what's essential. Kinu follows the 80/20 rule: 20% of
              the primitives solve 80% of the UI challenges.
            </p>
            <div class="philosophy-stats">
              <div class="stat-block">
                <span class="stat-value">5kb</span>
                <span class="stat-label">Gzipped</span>
              </div>
              <div class="stat-block">
                <span class="stat-value">&lt;1ms</span>
                <span class="stat-label">Time to Interactive</span>
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
            <span class="section-eyebrow">The Atelier</span>
            <h2 class="section-heading">Go ahead — try them.</h2>
          </div>
          <div class="primitives-grid">
            <Card class="primitive-card">
              <SliderDemo />
            </Card>
            <Card class="primitive-card">
              <TodoDemo />
            </Card>
            <Card class="primitive-card">
              <ButtonDemo />
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
              Kinu doesn't reinvent the wheel; it completes it. We use native
              semantic elements with a thin veneer of elegance.
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
          <h2 class="cta-heading">Redefine Everything.</h2>
          <p class="cta-body">The web was meant to feel this smooth.</p>
          <div class="cta-buttons">
            <Button
              href="https://github.com/developit/kinu"
              class="btn-pill btn-white"
            >
              Clone the Repo
            </Button>
            <a href="/docs" class="cta-link">
              Read the philosophy
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
              &copy; 2024 Kinu Technical Atelier. Constraint-Driven Excellence.
            </span>
          </div>
          <div class="footer-links">
            <a href="https://twitter.com">Twitter</a>
            <a href="https://github.com/developit/kinu">GitHub</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(68);
  return (
    <div class="demo-slider-wrap">
      <Slider
        min={0}
        max={100}
        value={value}
        onInput={(e) => setValue(Number((e.target as HTMLInputElement).value))}
      />
      <div class="demo-slider-labels">
        <span>Intensity</span>
        <span>{value}%</span>
      </div>
    </div>
  );
}

function TodoDemo() {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Initialize workspace', completed: true},
    {id: 2, text: 'Refine layout hierarchy', completed: true},
    {id: 3, text: 'Deploy to production', completed: false},
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
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
    </div>
  );
}

function ButtonDemo() {
  return (
    <div class="demo-buttons-stack">
      <Button
        onClick={() => toast.show('Action triggered!', {title: 'Primary'})}
      >
        Primary Action
      </Button>
      <Button variant="outline">Ghost Variant</Button>
    </div>
  );
}
