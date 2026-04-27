import {
  Button,
  Card,
  Input,
  Select,
  Switch,
  Slider,
  Checkbox,
  Field,
  Label,
  TabList,
  Tab,
  TabPanel,
  Badge,
  Prose,
  Separator,
  Status,
  ToastContainer,
  toast,
} from 'kinu';
import {useState} from 'preact/hooks';
import {Nav} from '../nav';
import {hljs} from '../highlight';

export default function Home() {
  return (
    <div class="kinu-home">
      <Nav class="home-nav home-nav--marketing" />
      <ToastContainer />

      <section class="kh-hero">
        <div class="kh-hero-glow" aria-hidden />
        <div class="kh-hero-inner">
          <h1 class="kh-hero-title">
            Preact UI toolkit.
            <br />
            <em>10x smaller</em> than you think.
          </h1>
          <Badge variant="outline" class="kh-eyebrow">
            Intuitive for Humans + LLMs
          </Badge>
          <Prose class="kh-hero-lede">
            <p>
              <em>Kinu</em>: the Japanese word for silk. An ultra-thin layer of
              styling and ergonomics over native HTML. Zero dependencies, zero
              runtime overhead, zero wrapper divs.
            </p>
          </Prose>
          <div class="kh-hero-actions">
            <Button class="kh-pill" size="lg" href="/getting-started">
              Start Building
            </Button>
            <Button class="kh-pill" variant="outline" size="lg" href="/docs">
              View Components
            </Button>
          </div>
        </div>

        <HeroPlayground />
      </section>

      <section class="kh-facade">
        <div class="kh-facade-text">
          <Badge variant="outline" class="kh-eyebrow kh-eyebrow--dark">
            The trick
          </Badge>
          <h2 class="kh-facade-title">
            A Clever
            <br />
            Facade.
          </h2>
          <Prose class="kh-facade-prose">
            <p>
              Kinu feels like a Preact UI toolkit, but it's really
              progressively-enhanced HTML. Where other toolkits implement
              variants, state, and behavior in JavaScript, kinu does it in
              CSS — leaning on{' '}
              <code>commandFor</code>, native <code>&lt;dialog&gt;</code>,
              anchor positioning, form validation, and the form-associated
              elements you already know.
            </p>
            <p>
              The silk lies on top. The form beneath is yours.
            </p>
          </Prose>
          <div class="kh-facade-links">
            <Button variant="ghost" class="kh-link kh-link--bright" href="/docs">
              Read the philosophy →
            </Button>
            <Button variant="ghost" class="kh-link kh-link--muted" href="/docs">
              Browse components
            </Button>
          </div>
        </div>
        <div class="kh-drape" aria-hidden>
          <SilkDrape />
        </div>
      </section>

      <section class="kh-try">
        <div class="kh-try-head">
          <h2 class="kh-section-title">
            Go ahead — <em>try them.</em>
          </h2>
          <Prose class="kh-section-lede">
            <p>
              Every preview below is a real, live kinu component — not a
              screenshot. Hover, focus, drag, type. They answer because they're
              just the underlying HTML, lightly enhanced.
            </p>
          </Prose>
        </div>

        <div class="kh-preview-grid">
          <Card class="kh-preview" padding="lg">
            <Badge variant="outline" class="kh-preview-title">
              Form · Field
            </Badge>
            <FormPreview />
          </Card>
          <Card class="kh-preview" padding="lg">
            <Badge variant="outline" class="kh-preview-title">
              Switch · Slider
            </Badge>
            <SwitchPreview />
          </Card>
          <Card class="kh-preview" padding="lg">
            <Badge variant="outline" class="kh-preview-title">
              Tabs
            </Badge>
            <TabsPreview />
          </Card>
          <Card class="kh-preview" padding="lg">
            <Badge variant="outline" class="kh-preview-title">
              Toast
            </Badge>
            <ToastPreview />
          </Card>
        </div>
      </section>

      <section class="kh-html">
        <h2 class="kh-html-title">
          HTML <em>as</em> a First-Class Citizen.
        </h2>
        <Prose class="kh-section-lede kh-html-lede">
          <p>
            Write the markup you'd write anyway, then theme it with CSS
            custom properties. No new state hooks, no manually-wired event
            handlers, no hidden re-renders.
          </p>
        </Prose>

        <div class="kh-code-grid">
          <Card class="kh-code kh-code--light" padding="lg">
            <Badge variant="outline" class="kh-code-label">
              Compose
            </Badge>
            <pre>{`import {Field, Input, Button} from 'kinu';

export function Subscribe() {
  return (
    <Field>
      <Field.Label>Email address</Field.Label>
      <Input type="email" required />
      <Button>Subscribe →</Button>
    </Field>
  );
}`}</pre>
          </Card>
          <Card class="kh-code kh-code--dark" padding="lg">
            <Badge variant="outline" class="kh-code-label">
              Theme
            </Badge>
            <pre>
              <span class="kh-code-comment">{`/* Override the brand on any element. */`}</span>
              {`
:root {
  --k-primary: 133 11% 33%;
  --k-radius: 0.5rem;
}`}
            </pre>
          </Card>
        </div>
      </section>

      <section class="kh-ship">
        <h2 class="kh-ship-title">Ship less. Do more.</h2>
        <Prose class="kh-ship-lede">
          <p>60+ components. ~5kB of JS, ~6kB of CSS. No dependencies, no surprises.</p>
        </Prose>
        <div class="kh-ship-actions">
          <Button class="kh-pill kh-ship-btn" size="lg" href="/getting-started">
            Get started
          </Button>
          <Button
            class="kh-pill kh-ship-btn kh-ship-btn--ghost"
            variant="outline"
            size="lg"
            href="https://github.com/developit/kinu"
          >
            Star on GitHub
          </Button>
        </div>
      </section>

      <Separator class="kh-footer-rule" />
      <footer class="kh-footer">
        <span>© 2026 Kinu — MIT licensed.</span>
        <span class="kh-footer-links">
          <a href="https://github.com/developit/kinu">GitHub</a>
          <a href="https://www.npmjs.com/package/kinu">npm</a>
          <a href="/docs">Docs</a>
        </span>
      </footer>
    </div>
  );
}

function FormPreview() {
  return (
    <div class="kh-preview-stack">
      <Field>
        <Field.Label>Email address</Field.Label>
        <Input type="email" defaultValue="hello@kinu.sh" />
        <Field.Description>We'll only mail you the good bits.</Field.Description>
      </Field>
      <Label class="kh-preview-row">
        <Checkbox defaultChecked /> Send me the docs
      </Label>
      <Label class="kh-preview-row">
        <Checkbox /> Subscribe to changelog
      </Label>
    </div>
  );
}

function SwitchPreview() {
  const [volume, setVolume] = useState(64);
  return (
    <div class="kh-preview-stack">
      <Label class="kh-preview-row kh-preview-row--between">
        <span>Reduced motion</span>
        <Switch defaultChecked />
      </Label>
      <Label class="kh-preview-row kh-preview-row--between">
        <span>System sync</span>
        <Switch />
      </Label>
      <Label class="kh-preview-row kh-preview-row--stack">
        <span>Volume — {volume}%</span>
        <Slider
          min={0}
          max={100}
          value={volume}
          onInput={(e) =>
            setVolume(Number((e.target as HTMLInputElement).value))
          }
        />
      </Label>
    </div>
  );
}

const TABS = [
  {
    id: 'overview',
    label: 'Overview',
    body: 'Composable tabs wrapping native semantics — selected state lives in your component, the rest is CSS.',
  },
  {
    id: 'install',
    label: 'Install',
    body: 'pnpm add kinu — that\'s the whole story. ~5kB of JS, ~6kB of CSS.',
  },
  {
    id: 'theme',
    label: 'Theme',
    body: 'Override the --k-* tokens on :root (or any element) to rebrand. No build step required.',
  },
];

function TabsPreview() {
  const [tab, setTab] = useState('overview');
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];
  return (
    <div class="kh-preview-stack">
      <TabList>
        {TABS.map((t) => (
          <Tab
            key={t.id}
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </Tab>
        ))}
      </TabList>
      <TabPanel>
        <Prose class="kh-preview-note">
          <p>{active.body}</p>
        </Prose>
      </TabPanel>
    </div>
  );
}

function ToastPreview() {
  return (
    <div class="kh-preview-stack">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.show('Copied to clipboard', {title: 'Saved', icon: '✓'})
        }
      >
        Trigger toast
      </Button>
      <Prose class="kh-preview-note">
        <p>Click → fires a real kinu toast in the corner.</p>
      </Prose>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * HeroPlayground — the source on the left, the live result on the right.
 *
 * Same source string drives the syntax-highlighted code and the rendered
 * <NewPost /> component, so what you see really is what you wrote. The
 * form is a real <form> with browser validation + a Switch + a Select +
 * Status indicator + toast on submit.
 * ─────────────────────────────────────────────────────────────────────── */

const NEW_POST_SOURCE = `import {Field, Input, Select, Switch, Button, toast} from 'kinu';

export function NewPost() {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      toast.show('Post published', {icon: '✓'});
    }}>
      <Field>
        <Field.Label>Title</Field.Label>
        <Input name="title" placeholder="On silk and software" required />
      </Field>
      <Field>
        <Field.Label>Audience</Field.Label>
        <Select name="audience" defaultValue="subscribers">
          <option value="subscribers">Subscribers</option>
          <option value="team">Team only</option>
          <option value="public">Public</option>
        </Select>
      </Field>
      <Field>
        <Field.Label>
          <Switch name="notify" defaultChecked /> Email subscribers
        </Field.Label>
      </Field>
      <Button type="submit">Publish →</Button>
    </form>
  );
}`;

function HeroPlayground() {
  const {value: highlighted} = hljs.highlight(NEW_POST_SOURCE, {language: 'tsx'});
  return (
    <Card padding="none" class="kh-playground">
      <div class="kh-playground-pane kh-playground-pane--code">
        <header class="kh-playground-bar">
          <span class="kh-playground-dots" aria-hidden>
            <i /><i /><i />
          </span>
          <span class="kh-playground-file">new-post.tsx</span>
          <Badge variant="outline" class="kh-playground-bar-badge">
            22 lines
          </Badge>
        </header>
        <pre class="kh-playground-code hljs">
          <code
            class="language-tsx"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: highlighted}}
          />
        </pre>
      </div>
      <div class="kh-playground-pane kh-playground-pane--demo">
        <header class="kh-playground-bar">
          <span class="kh-playground-file">preview</span>
          <Status variant="success" class="kh-playground-bar-status">
            Live
          </Status>
        </header>
        <div class="kh-playground-stage">
          <NewPost />
        </div>
      </div>
    </Card>
  );
}

function NewPost() {
  return (
    <form
      class="kh-newpost"
      onSubmit={(e) => {
        e.preventDefault();
        toast.show('Post published', {icon: '✓'});
      }}
    >
      <Field>
        <Field.Label>Title</Field.Label>
        <Input name="title" placeholder="On silk and software" required />
      </Field>
      <Field>
        <Field.Label>Audience</Field.Label>
        <Select name="audience" defaultValue="subscribers">
          <option value="subscribers">Subscribers</option>
          <option value="team">Team only</option>
          <option value="public">Public</option>
        </Select>
      </Field>
      <Field>
        <Field.Label class="kh-newpost-switch">
          <Switch name="notify" defaultChecked /> Email subscribers
        </Field.Label>
      </Field>
      <Button type="submit">Publish →</Button>
    </form>
  );
}

/* Vertical drape of silk inside a circular crop — replaces the literal stones. */
function SilkDrape() {
  return (
    <div class="kh-drape-disc">
      <svg
        viewBox="0 0 280 280"
        role="img"
        aria-label="A vertical drape of silk fabric falling under soft light"
      >
        <title>Silk drape</title>
        <defs>
          <linearGradient id="kh-drape-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#34433a" />
            <stop offset="100%" stop-color="#1a2620" />
          </linearGradient>
          <linearGradient id="kh-drape-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
            <stop offset="20%" stop-color="#ffffff" stop-opacity="0.55" />
            <stop offset="55%" stop-color="#ece6cf" stop-opacity="0.9" />
            <stop offset="85%" stop-color="#ffffff" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="kh-drape-soft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="50%" stop-color="#fff" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </linearGradient>
        </defs>
        <rect width="280" height="280" fill="url(#kh-drape-bg)" />

        {/* Three falling silk ribbons, slightly offset, with light catching the front fold */}
        <path
          d="M 90 -10 C 110 80, 70 160, 96 280 L 138 280 C 124 170, 158 90, 132 -10 Z"
          fill="url(#kh-drape-soft)"
          opacity="0.7"
        />
        <path
          d="M 168 -10 C 152 70, 192 170, 174 280 L 212 280 C 222 180, 188 80, 196 -10 Z"
          fill="url(#kh-drape-soft)"
          opacity="0.55"
        />
        <path
          d="M 118 -10 C 142 80, 102 170, 136 280 L 178 280 C 152 180, 188 80, 162 -10 Z"
          fill="url(#kh-drape-light)"
          opacity="0.95"
        />

        {/* Hairline highlight rib */}
        <path
          d="M 140 -10 C 162 80, 122 170, 148 280"
          stroke="#fff"
          stroke-width="0.8"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M 156 -10 C 138 80, 174 170, 156 280"
          stroke="#fff"
          stroke-width="0.5"
          fill="none"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
