import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Field,
  Input,
  Item,
  Label,
  Progress,
  Prose,
  Select,
  Separator,
  Slider,
  Status,
  Switch,
  Textarea,
  Toggle,
  Tooltip,
  ToastContainer,
  toast,
} from 'kinu';
import type {ComponentChildren} from 'preact';
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
          <h2 class="kh-section-title">Built with Kinu.</h2>
          <Prose class="kh-section-lede">
            <p>
              Four small surfaces composed from the components in this
              toolkit. The hero playground above publishes at roughly 11&nbsp;kB.
            </p>
          </Prose>
        </div>

        <div class="kh-preview-grid">
          <Card class="kh-preview" padding="lg">
            <TasksPreview />
          </Card>
          <Card class="kh-preview" padding="lg">
            <NowPlayingPreview />
          </Card>
          <Card class="kh-preview" padding="lg">
            <ComposerPreview />
          </Card>
          <Card class="kh-preview" padding="lg">
            <ActivityPreview />
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

/* ── Tasks (Project dashboard) ──────────────────────────────────────────── */
type Task = {id: number; text: string; done: boolean};
const INITIAL_TASKS: Task[] = [
  {id: 1, text: 'Pricing page copy', done: true},
  {id: 2, text: 'Migrate auth to OAuth', done: true},
  {id: 3, text: 'Onboarding flow QA', done: false},
  {id: 4, text: 'Ship release notes', done: false},
];

function TasksPreview() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draft, setDraft] = useState('');
  const completed = tasks.filter((t) => t.done).length;
  const progress = (completed / tasks.length) * 100;

  const toggle = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? {...t, done: !t.done} : t)),
    );

  const add = (e: Event) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTasks((prev) => [...prev, {id: Date.now(), text, done: false}]);
    setDraft('');
  };

  return (
    <div class="kh-tasks">
      <header class="kh-tasks-head">
        <Avatar size="sm">JD</Avatar>
        <div class="kh-tasks-meta">
          <p>Q4 launches</p>
          <Badge variant={progress === 100 ? 'default' : 'secondary'}>
            {completed}/{tasks.length} done
          </Badge>
        </div>
      </header>
      <Progress value={progress} max={100} />
      <ul class="kh-tasks-list">
        {tasks.map((t) => (
          <li key={t.id} class="kh-tasks-item">
            <Checkbox
              id={`kh-task-${t.id}`}
              checked={t.done}
              onInput={() => toggle(t.id)}
            />
            <Label
              htmlFor={`kh-task-${t.id}`}
              class={t.done ? 'is-done' : undefined}
            >
              {t.text}
            </Label>
          </li>
        ))}
      </ul>
      <form class="kh-tasks-add" onSubmit={add}>
        <Input
          size="sm"
          placeholder="Next task…"
          value={draft}
          onInput={(e) => setDraft((e.target as HTMLInputElement).value)}
        />
        <Tooltip title="Add task">
          <Button size="sm" type="submit" disabled={!draft.trim()}>
            ＋
          </Button>
        </Tooltip>
      </form>
    </div>
  );
}

/* ── Now Playing (Media player) ─────────────────────────────────────────── */
/* ── Inline SVG icons (Lucide-style, currentColor) ──────────────────────── */
const Icon = ({
  name,
  path,
  size = 16,
}: {name: string; path: ComponentChildren; size?: number}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <title>{name}</title>
    {path}
  </svg>
);
const IconPlay = ({size = 16}: {size?: number}) => (
  <Icon name="Play" size={size} path={<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />} />
);
const IconPause = ({size = 16}: {size?: number}) => (
  <Icon
    name="Pause"
    size={size}
    path={
      <>
        <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
        <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
      </>
    }
  />
);
const IconSkipBack = ({size = 16}: {size?: number}) => (
  <Icon
    name="Previous"
    size={size}
    path={
      <>
        <polygon points="19 20 9 12 19 4 19 20" fill="currentColor" />
        <line x1="5" y1="19" x2="5" y2="5" />
      </>
    }
  />
);
const IconSkipFwd = ({size = 16}: {size?: number}) => (
  <Icon
    name="Next"
    size={size}
    path={
      <>
        <polygon points="5 4 15 12 5 20 5 4" fill="currentColor" />
        <line x1="19" y1="5" x2="19" y2="19" />
      </>
    }
  />
);
const IconHeart = ({size = 16, filled = false}: {size?: number; filled?: boolean}) => (
  <Icon
    name={filled ? 'Liked' : 'Like'}
    size={size}
    path={
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={filled ? 'currentColor' : 'none'}
      />
    }
  />
);

function NowPlayingPreview() {
  const [position, setPosition] = useState(82);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  const total = 222;
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, '0')}`;
  };
  const cur = (position / 100) * total;

  return (
    <div class="kh-player">
      <header class="kh-player-head">
        <span class="kh-player-cover" aria-hidden>
          🌅
        </span>
        <div class="kh-player-meta">
          <p class="kh-player-title">Summer Breeze</p>
          <p class="kh-player-artist">DJ Sunwave · Golden Hour</p>
        </div>
        <Toggle
          pressed={liked}
          onClick={() => setLiked((v) => !v)}
          class="kh-player-like"
          aria-label="Like"
        >
          <IconHeart filled={liked} />
        </Toggle>
      </header>
      <div class="kh-player-scrub">
        <span class="kh-player-time">{fmt(cur)}</span>
        <Slider
          min={0}
          max={100}
          value={position}
          onInput={(e) =>
            setPosition(Number((e.target as HTMLInputElement).value))
          }
        />
        <span class="kh-player-time">{fmt(total)}</span>
      </div>
      <div class="kh-player-controls">
        <Button variant="ghost" size="icon" aria-label="Previous">
          <IconSkipBack />
        </Button>
        <Button
          size="icon"
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Next">
          <IconSkipFwd />
        </Button>
      </div>
    </div>
  );
}

/* ── AI Composer (Textarea + model picker) ──────────────────────────────── */
const MODELS = [
  {id: 'sonnet', label: 'Claude Sonnet 4.6', meta: 'Fast · 200K context'},
  {id: 'opus',   label: 'Claude Opus 4.7',   meta: 'Smart · 1M context'},
  {id: 'haiku',  label: 'Claude Haiku 4.5',  meta: 'Cheapest · 200K'},
  {id: 'gpt5',   label: 'GPT-5',             meta: 'OpenAI'},
  {id: 'gemini', label: 'Gemini 2.5 Pro',    meta: 'Google'},
];

function ComposerPreview() {
  const [modelId, setModelId] = useState('sonnet');
  const [text, setText] = useState('');
  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  const send = (e: Event) => {
    e.preventDefault();
    if (!text.trim()) return;
    toast.show(`Sent to ${model.label}`, {title: 'Composer', icon: '✨'});
    setText('');
  };

  return (
    <form class="kh-composer" onSubmit={send}>
      <Textarea
        autosize
        rows={3}
        class="kh-composer-input"
        placeholder="Ask anything…"
        value={text}
        onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
      />
      <footer class="kh-composer-bar">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm" class="kh-composer-model">
              <span class="kh-composer-dot" aria-hidden />
              {model.label}
              <span aria-hidden>▾</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {MODELS.map((m) => (
              <Item
                key={m.id}
                selected={m.id === modelId}
                onClick={() => setModelId(m.id)}
              >
                <span class="kh-composer-option">
                  <strong>{m.label}</strong>
                  <span class="kh-composer-option-meta">{m.meta}</span>
                </span>
              </Item>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button type="submit" size="sm" disabled={!text.trim()}>
          Send →
        </Button>
      </footer>
    </form>
  );
}

/* ── Team Activity (Avatar + Status + Item) ─────────────────────────────── */
const ACTIVITY: Array<{
  initials: string;
  name: string;
  action: string;
  when: string;
  variant: 'success' | 'info' | 'warning' | undefined;
  pulse?: boolean;
}> = [
  {initials: 'JM', name: 'Jason',    action: 'merged pull/124',     when: '2m',  variant: 'success', pulse: true},
  {initials: 'AS', name: 'Alex',     action: 'is reviewing pull/126', when: '7m', variant: 'info'},
  {initials: 'KM', name: 'Karen',    action: 'opened issue #2031',  when: '14m', variant: 'success'},
  {initials: 'TR', name: 'Toshi',    action: 'is away',             when: '1h',  variant: 'warning'},
];

function ActivityPreview() {
  return (
    <div class="kh-activity">
      <header class="kh-activity-head">
        <Avatar.Group>
          <Avatar size="sm">JM</Avatar>
          <Avatar size="sm">AS</Avatar>
          <Avatar size="sm">KM</Avatar>
          <Avatar size="sm">+4</Avatar>
        </Avatar.Group>
        <Status pulse variant="success" class="kh-activity-live">
          Live
        </Status>
      </header>
      <ul class="kh-activity-list">
        {ACTIVITY.map((a) => (
          <li key={a.name} class="kh-activity-item">
            <Avatar size="sm">{a.initials}</Avatar>
            <div class="kh-activity-text">
              <p>
                <strong>{a.name}</strong> {a.action}
              </p>
              <Status
                variant={a.variant}
                pulse={a.pulse}
                aria-label={a.action}
                class="kh-activity-when"
              >
                {a.when}
              </Status>
            </div>
          </li>
        ))}
      </ul>
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

const NEW_POST_SOURCE = `import {Field, Input, Select, Switch, Label, Button, toast} from 'kinu';

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
      <div class="row">
        <Switch id="notify" name="notify" defaultChecked />
        <Label htmlFor="notify">Email subscribers</Label>
      </div>
      <Button type="submit">Publish →</Button>
    </form>
  );
}`;

function HeroPlayground() {
  const {value: highlighted} = hljs.highlight(NEW_POST_SOURCE, {language: 'tsx'});
  const lineCount = NEW_POST_SOURCE.trimEnd().split('\n').length;
  return (
    <Card padding="none" class="kh-playground">
      <div class="kh-playground-pane kh-playground-pane--code">
        <header class="kh-playground-bar">
          <span class="kh-playground-dots" aria-hidden>
            <i /><i /><i />
          </span>
          <span class="kh-playground-file">new-post.tsx</span>
          <Badge variant="outline" class="kh-playground-bar-badge">
            {lineCount} lines
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
      <div class="kh-newpost-switch">
        <Switch id="kh-notify" name="notify" defaultChecked />
        <Label htmlFor="kh-notify">Email subscribers</Label>
      </div>
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
