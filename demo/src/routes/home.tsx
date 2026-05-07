import {
  Avatar,
  Badge,
  Button,
  Calendar,
  Card,
  Checkbox,
  Chip,
  ColorPicker,
  Combobox,
  ComboboxInput,
  ComboboxList,
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  Field,
  FileUpload,
  Input,
  InputGroup,
  Item,
  Label,
  Listbox,
  ListboxInput,
  ListboxList,
  OTPInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Prose,
  ScrollArea,
  Select,
  Separator,
  Slider,
  Spinner,
  Status,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Textarea,
  Toggle,
  ToggleGroup,
  Tooltip,
  ToastContainer,
  toast,
} from 'kinu';
import type {ComponentChildren} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
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
              Eight real product surfaces, composed from the components in this
              toolkit. The whole grid runs on the same ~11&nbsp;kB you'd ship.
            </p>
          </Prose>
        </div>

        <div class="kh-preview-grid">
          <PreviewCard title="Tasks">
            <TasksPreview />
          </PreviewCard>
          <PreviewCard title="Media Player">
            <NowPlayingPreview />
          </PreviewCard>
          <PreviewCard title="AI Composer">
            <ComposerPreview />
          </PreviewCard>
          <PreviewCard title="Activity">
            <ActivityPreview />
          </PreviewCard>
          <PreviewCard title="Command Palette">
            <CommandPalettePreview />
          </PreviewCard>
          <PreviewCard title="Trip Booking">
            <DateRangePreview />
          </PreviewCard>
          <PreviewCard wide>
            <InboxPreview />
          </PreviewCard>
          <PreviewCard title="Settings">
            <SettingsPreview />
          </PreviewCard>
        </div>
      </section>

      <section class="kh-html">
        <h2 class="kh-html-title">
          JSX <em>in</em>, native HTML <em>out</em>.
        </h2>
        <Prose class="kh-section-lede kh-html-lede">
          <p>
            The Dialog you write on the left renders as the markup on the
            right. No portals, no state hooks — just <code>commandfor</code>,
            a native <code>&lt;dialog&gt;</code>, and the form-associated
            elements you already know.
          </p>
        </Prose>

        <div class="kh-code-grid">
          <Card class="kh-code kh-code--light" padding="lg">
            <Badge variant="outline" class="kh-code-label">
              You write
            </Badge>
            <pre>
              <span class="kh-code-comment">{`// edit-profile.tsx`}</span>
              {`
import {Dialog, Field, Input, Button} from 'kinu';

export function EditProfile() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Field>
          <Field.Label>Display name</Field.Label>
          <Input defaultValue="Jason" required />
        </Field>
        <Dialog.Close>
          <Button>Save</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>
  );
}`}
            </pre>
          </Card>
          <Card class="kh-code kh-code--dark" padding="lg">
            <Badge variant="outline" class="kh-code-label">
              The browser sees
            </Badge>
            <pre>
              <span class="kh-code-comment">{`<!-- ESC closes. Click-outside closes. Focus is trapped. Free. -->`}</span>
              {`
<button commandfor="d-1" command="show-modal">
  Edit profile
</button>

<dialog id="d-1">
  <div k="field">
    <label>Display name</label>
    <input k="input" value="Jason" required />
  </div>
  <button commandfor="d-1" command="close">Save</button>
</dialog>`}
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

type Track = {
  id: number; title: string; artist: string; album: string;
  duration: string; cover: string; liked: boolean;
};
const TRACKS: Track[] = [
  {id: 1, title: 'Summer Breeze', artist: 'DJ Sunwave',         album: 'Golden Hour',     duration: '4:18', cover: '🌅', liked: true},
  {id: 2, title: 'Midnight Coffee', artist: 'Lofi Dreams',      album: 'Chill Nights',    duration: '3:42', cover: '☕', liked: false},
  {id: 3, title: 'Neon Lights',   artist: 'Synthwave City',     album: 'Retro Future',    duration: '5:03', cover: '🌃', liked: false},
  {id: 4, title: 'Ocean Waves',   artist: 'Nature Sounds',      album: 'Peaceful Mind',   duration: '2:57', cover: '🌊', liked: true},
  {id: 5, title: 'Forest Path',   artist: 'Organic Beats',      album: 'Natural Rhythm',  duration: '3:28', cover: '🌲', liked: false},
];

const parseDuration = (s: string) => {
  const [m, sec] = s.split(':').map(Number);
  return m * 60 + sec;
};
const fmtTime = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, '0')}`;
};

function NowPlayingPreview() {
  const [tracks, setTracks] = useState(TRACKS);
  const [currentId, setCurrentId] = useState(TRACKS[0].id);
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(58); // seconds

  const current = tracks.find((t) => t.id === currentId) ?? tracks[0];
  const total = parseDuration(current.duration);

  // Auto-progress when playing; advance to the next track on end.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setPosition((p) => {
        if (p + 1 >= total) {
          // wrap to next track
          const i = tracks.findIndex((t) => t.id === currentId);
          const next = tracks[(i + 1) % tracks.length];
          setCurrentId(next.id);
          return 0;
        }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, currentId, total, tracks]);

  const play = (id: number) => {
    setCurrentId(id);
    setPosition(0);
    setPlaying(true);
  };
  const step = (delta: -1 | 1) => {
    const i = tracks.findIndex((t) => t.id === currentId);
    const next = tracks[(i + delta + tracks.length) % tracks.length];
    play(next.id);
  };
  const toggleLike = (id: number) =>
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? {...t, liked: !t.liked} : t)),
    );

  return (
    <div class="kh-player">
      <header class="kh-player-head">
        <span class="kh-player-cover" aria-hidden>
          {current.cover}
        </span>
        <div class="kh-player-meta">
          <p class="kh-player-title">{current.title}</p>
          <p class="kh-player-artist">
            {current.artist} · {current.album}
          </p>
        </div>
        <Toggle
          pressed={current.liked}
          onClick={() => toggleLike(current.id)}
          class="kh-player-like"
          aria-label={current.liked ? 'Unlike' : 'Like'}
        >
          <IconHeart filled={current.liked} />
        </Toggle>
      </header>
      <div class="kh-player-scrub">
        <span class="kh-player-time">{fmtTime(position)}</span>
        <Slider
          min={0}
          max={total}
          value={position}
          // Slider only updates its --progress CSS var on the input event;
          // pin it from React so auto-progress repaints the green fill too.
          style={`--progress: ${(position / total) * 100}%`}
          onInput={(e) =>
            setPosition(Number((e.target as HTMLInputElement).value))
          }
          aria-label="Seek"
        />
        <span class="kh-player-time">{current.duration}</span>
      </div>
      <div class="kh-player-controls">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous"
          onClick={() => step(-1)}
        >
          <IconSkipBack />
        </Button>
        <Button
          size="icon"
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next"
          onClick={() => step(1)}
        >
          <IconSkipFwd />
        </Button>
      </div>
      <ScrollArea class="kh-player-list">
        {tracks.map((t) => (
          <button
            key={t.id}
            type="button"
            class={`kh-player-track${t.id === currentId ? ' is-active' : ''}`}
            onClick={() => play(t.id)}
            aria-current={t.id === currentId}
          >
            <span class="kh-player-track-cover" aria-hidden>{t.cover}</span>
            <span class="kh-player-track-text">
              <strong>{t.title}</strong>
              <span>{t.artist}</span>
            </span>
            <span class="kh-player-track-meta">
              <span class="kh-player-track-dur">{t.duration}</span>
            </span>
          </button>
        ))}
      </ScrollArea>
    </div>
  );
}

/* ── AI Composer (Textarea + model picker) ──────────────────────────────── */
/* Reusable card shell — header with title + (optional) hint, then body. */
function PreviewCard({
  title,
  hint,
  wide,
  children,
}: {
  title?: string;
  hint?: string;
  wide?: boolean;
  children: ComponentChildren;
}) {
  return (
    <Card
      class={`kh-preview${wide ? ' kh-preview--wide' : ''}${title ? '' : ' kh-preview--bare'}`}
      padding="lg"
    >
      {title && (
        <header class="kh-preview-head">
          <span class="kh-preview-title">{title}</span>
          {hint && <span class="kh-preview-hint">{hint}</span>}
        </header>
      )}
      <div class="kh-preview-body">{children}</div>
    </Card>
  );
}

/* ── 3. AI Composer with adaptive model picker ──────────────────────────── *
 * Replaces the flat DropdownMenu with a Popover (mobile=drawer) housing a
 * search input + grouped model list with ↑/↓ keyboard navigation. Inspired
 * by the Contraption picker. Uses kinu Popover's native commandFor magic. */

type ModelOption = {id: string; provider: string; label: string; meta: string; recent?: boolean};
const MODELS: ModelOption[] = [
  {id: 'opus',   provider: 'Anthropic', label: 'Claude Opus 4.7',     meta: 'Smartest · 1M context', recent: true},
  {id: 'sonnet', provider: 'Anthropic', label: 'Claude Sonnet 4.6',   meta: 'Balanced · 200K',       recent: true},
  {id: 'haiku',  provider: 'Anthropic', label: 'Claude Haiku 4.5',    meta: 'Cheapest · 200K'},
  {id: 'gpt5',   provider: 'OpenAI',    label: 'GPT-5',               meta: 'Reasoning · 256K'},
  {id: 'o3',     provider: 'OpenAI',    label: 'o3',                  meta: 'Deep think · 200K'},
  {id: 'gemini', provider: 'Google',    label: 'Gemini 2.5 Pro',      meta: 'Multimodal · 2M'},
  {id: 'flash',  provider: 'Google',    label: 'Gemini 2.5 Flash',    meta: 'Lightning · 1M'},
];

type ChatMsg = {id: number; role: 'user' | 'model'; text: string; pending?: boolean};

const CANNED_REPLIES: Record<string, string> = {
  default:
    "Sure — kinu's <Popover mobile=\"drawer\"> renders an anchor-positioned popover on desktop and a bottom sheet on phones. Same JSX, no per-device branching.",
  size: 'Around 5 kB of JS plus 6 kB of CSS, gzipped. The grid you see below ships with the page.',
  hello:
    "Hey! Ask anything about kinu — components, theming, the commandFor pattern, the platform-native bits.",
};

function fakeReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (/(size|kb|bundle|small)/.test(p)) return CANNED_REPLIES.size;
  if (/(hi|hello|hey)/.test(p)) return CANNED_REPLIES.hello;
  return CANNED_REPLIES.default;
}

function ComposerPreview() {
  const [modelId, setModelId] = useState('sonnet');
  const [filter, setFilter] = useState('');
  const [cursor, setCursor] = useState(-1);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 1,
      role: 'model',
      text:
        "Hi — I'm a placeholder model running inside this card. Try asking about kinu's bundle size, or just say hello.",
    },
  ]);
  const threadRef = useRef<HTMLDivElement>(null);
  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  // Keep the thread pinned to the latest message.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = 9e9;
  }, [messages]);

  const filtered = MODELS.filter(
    (m) =>
      !filter ||
      m.label.toLowerCase().includes(filter.toLowerCase()) ||
      m.provider.toLowerCase().includes(filter.toLowerCase()),
  );
  const groups: Array<{provider: string; items: ModelOption[]}> = [];
  for (const m of filtered) {
    const last = groups[groups.length - 1];
    if (last && last.provider === m.provider) last.items.push(m);
    else groups.push({provider: m.provider, items: [m]});
  }

  const select = (id: string) => {
    setModelId(id);
    setFilter('');
    setCursor(-1);
    // Close the parent <dialog> popover by walking up.
    requestAnimationFrame(() => {
      (document.activeElement?.closest('dialog') as HTMLDialogElement | null)?.close();
    });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter' && cursor >= 0) {
      e.preventDefault();
      select(filtered[cursor].id);
    }
  };

  const send = (e: Event) => {
    e.preventDefault();
    const prompt = text.trim();
    if (!prompt) return;
    const userId = Date.now();
    const replyId = userId + 1;
    setMessages((m) => [
      ...m,
      {id: userId, role: 'user', text: prompt},
      {id: replyId, role: 'model', text: '', pending: true},
    ]);
    setText('');
    // Simulated streaming reply.
    setTimeout(() => {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === replyId
            ? {id: replyId, role: 'model', text: fakeReply(prompt)}
            : msg,
        ),
      );
    }, 700);
  };

  let flatIndex = 0;
  return (
    <form class="kh-composer" onSubmit={send}>
      {/* Plain <div k="scroll-area"> so our ref attaches — kinu's
       * createSimpleComponent only forwards refs through components that
       * carry defaultProps or an internal ref callback, and ScrollArea
       * has neither. Using a div with k="scroll-area" still picks up the
       * library's overflow + themed scrollbar rules. */}
      <div k="scroll-area" class="kh-composer-thread" ref={threadRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            class={`kh-composer-msg kh-composer-msg--${m.role}`}
          >
            {m.role === 'model' && (
              <Avatar size="sm" class="kh-composer-msg-avatar">
                ✦
              </Avatar>
            )}
            <div class="kh-composer-bubble">
              {m.pending ? (
                <Spinner size="sm" aria-label="Thinking" />
              ) : (
                m.text
              )}
            </div>
          </div>
        ))}
      </div>
      <Textarea
        autosize
        rows={2}
        class="kh-composer-input"
        placeholder="Ask anything…"
        value={text}
        onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
        onKeyDown={(e) => {
          if ((e as KeyboardEvent).key === 'Enter' && !(e as KeyboardEvent).shiftKey) {
            e.preventDefault();
            send(e);
          }
        }}
      />
      <footer class="kh-composer-bar">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm" class="kh-composer-model">
              <Status pulse variant="success" aria-label="Active model" />
              <span class="kh-composer-model-label">{model.label}</span>
              <span aria-hidden class="kh-composer-chev">▾</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent mobile="drawer" class="kh-composer-popover">
            <div class="kh-composer-search">
              <Input
                size="sm"
                placeholder="Search models…"
                value={filter}
                onInput={(e) => {
                  setFilter((e.target as HTMLInputElement).value);
                  setCursor(-1);
                }}
                onKeyDown={onKey}
              />
            </div>
            <Separator />
            <ScrollArea class="kh-composer-list">
              {groups.length === 0 && (
                <p class="kh-composer-empty">
                  No models match <code>{filter}</code>.
                </p>
              )}
              {groups.map((g) => (
                <section key={g.provider} class="kh-composer-group">
                  <header class="kh-composer-group-head">{g.provider}</header>
                  {g.items.map((m) => {
                    const i = flatIndex++;
                    return (
                      <Item
                        key={m.id}
                        selected={m.id === modelId}
                        data-active={i === cursor || undefined}
                        onClick={() => select(m.id)}
                      >
                        <span class="kh-composer-option">
                          <strong>{m.label}</strong>
                          <span class="kh-composer-option-meta">{m.meta}</span>
                        </span>
                        {m.recent && (
                          <Badge variant="outline" class="kh-composer-recent">
                            recent
                          </Badge>
                        )}
                      </Item>
                    );
                  })}
                </section>
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <Button type="submit" size="sm" disabled={!text.trim()}>
          Send →
        </Button>
      </footer>
    </form>
  );
}

/* ── Activity — search/filters bar + live team feed ────────────────────── */
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

const ACTIVITY_PEOPLE = [
  {initials: 'JM', name: 'Jason Miller',   email: 'jason@kinu.sh',    role: 'Maintainer'},
  {initials: 'AS', name: 'Alex Stein',     email: 'alex@kinu.sh',     role: 'Designer'},
  {initials: 'KM', name: 'Karen Montoya',  email: 'karen@kinu.sh',    role: 'Engineer'},
  {initials: 'TR', name: 'Toshi Rahman',   email: 'toshi@contoso.io', role: 'Customer'},
  {initials: 'RB', name: 'Rosa Beltran',   email: 'rosa@contoso.io',  role: 'Customer'},
  {initials: 'SH', name: 'Sam Hwang',      email: 'sam@kinu.sh',      role: 'Engineer'},
];

const ACTIVITY_SORT = ['Newest', 'Top', 'Active'];
const ACTIVITY_TAG_OPTIONS = ['urgent', 'docs', 'frontend', 'API', 'design', 'release'];

function ActivityPreview() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('Newest');
  const [tags, setTags] = useState(['Owner: Jason']);
  const [tagDraft, setTagDraft] = useState('');

  const matches = ACTIVITY_PEOPLE.filter((p) =>
    !query ||
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.email.toLowerCase().includes(query.toLowerCase()),
  );

  const removeTag = (t: string) =>
    setTags((prev) => prev.filter((x) => x !== t));
  const addTag = (t: string) => {
    const v = t.trim();
    if (!v || tags.includes(v)) return;
    setTags([...tags, v]);
    requestAnimationFrame(() => setTagDraft(''));
  };

  return (
    <div class="kh-activity">
      <Combobox class="kh-activity-search">
        <ComboboxInput
          placeholder="Search teammates…"
          size="sm"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        />
        <ComboboxList>
          {matches.length === 0 && (
            <p class="kh-search-empty">
              No matches for <code>{query}</code>.
            </p>
          )}
          {matches.map((p) => (
            <Item
              key={p.email}
              value={p.name}
              onClick={() =>
                toast.show(`Opened ${p.name}`, {title: 'Profile', icon: '↗'})
              }
            >
              <span class="kh-search-row">
                <Avatar size="sm">{p.initials}</Avatar>
                <span class="kh-search-text">
                  <strong>{p.name}</strong>
                  <span class="kh-search-email">{p.email}</span>
                </span>
                <Badge variant="outline" class="kh-search-role">
                  {p.role}
                </Badge>
              </span>
            </Item>
          ))}
        </ComboboxList>
      </Combobox>

      <div class="kh-activity-filters">
        <ToggleGroup
          type="single"
          value={sort}
          onValueChange={(v) => v && setSort(v as string)}
          class="kh-activity-sort"
        >
          {ACTIVITY_SORT.map((s) => (
            <Toggle key={s} value={s} type="button">{s}</Toggle>
          ))}
        </ToggleGroup>
        {tags.map((t) => (
          <Chip key={t} variant="primary" form="">
            {t}
            <Chip.Button onClick={() => removeTag(t)} aria-label={`Remove ${t}`}>
              ×
            </Chip.Button>
          </Chip>
        ))}
        <Combobox class="kh-activity-add">
          <ComboboxInput
            placeholder="+ filter"
            size="sm"
            value={tagDraft}
            onInput={(e) =>
              setTagDraft((e.target as HTMLInputElement).value)
            }
            onKeyDown={(e) => {
              if ((e as KeyboardEvent).key === 'Enter') {
                e.preventDefault();
                addTag(tagDraft);
              }
            }}
          />
          <ComboboxList>
            {ACTIVITY_TAG_OPTIONS.filter(
              (p) =>
                (!tagDraft || p.toLowerCase().includes(tagDraft.toLowerCase())) &&
                !tags.includes(`Tag: ${p}`),
            ).map((p) => (
              <Item key={p} value={p} onClick={() => addTag(`Tag: ${p}`)}>
                {p}
              </Item>
            ))}
          </ComboboxList>
        </Combobox>
      </div>

      <Separator />

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

/* ── 5. Command Palette (⌘K) ───────────────────────────────────────────── */

const COMMANDS = [
  {group: 'Pages',   id: 'p-gs', label: 'Open Getting Started',  shortcut: 'G S'},
  {group: 'Pages',   id: 'p-bt', label: 'Open Button reference', shortcut: 'G B'},
  {group: 'Pages',   id: 'p-dl', label: 'Open Dialog reference', shortcut: 'G D'},
  {group: 'Actions', id: 'a-dk', label: 'Toggle dark mode',      shortcut: '⌘D'},
  {group: 'Actions', id: 'a-cp', label: 'Copy npm install',      shortcut: '⌘C'},
  {group: 'Actions', id: 'a-ai', label: 'Ask the AI Composer',   shortcut: '⌘K'},
  {group: 'Recent',  id: 'r-1',  label: '/docs/dialog'},
  {group: 'Recent',  id: 'r-2',  label: '/docs/popover'},
];

function CommandPalettePreview() {
  const [filter, setFilter] = useState('');
  const matches = COMMANDS.filter((c) =>
    !filter || c.label.toLowerCase().includes(filter.toLowerCase()),
  );
  let lastGroup = '';
  return (
    <Listbox class="kh-cmd">
      <ListboxInput
        placeholder="Search docs, run a command…"
        value={filter}
        onInput={(e) => setFilter((e.target as HTMLInputElement).value)}
      />
      <ListboxList>
        {matches.length === 0 && (
          <p class="kh-cmd-empty">No commands match.</p>
        )}
        {matches.map((c) => {
          const newGroup = c.group !== lastGroup;
          lastGroup = c.group;
          return (
            <span key={c.id}>
              {newGroup && <header class="kh-cmd-group">{c.group}</header>}
              <Item
                shortcut={c.shortcut}
                onClick={() => toast.show(c.label, {title: 'Ran command'})}
              >
                {c.label}
              </Item>
            </span>
          );
        })}
      </ListboxList>
    </Listbox>
  );
}

/* ── 6. Trip Booking — two Calendars + Select + computed total ──────────── */

const PROPERTY_TYPES = [
  {id: 'home',  label: 'House',     rate: 220},
  {id: 'condo', label: 'Condo',     rate: 160},
  {id: 'apt',   label: 'Apartment', rate: 130},
  {id: 'hotel', label: 'Hotel',     rate: 95},
];

const FEATURE_OPTIONS = [
  'Pet friendly', 'Crib / rollaway', 'Two bedrooms', 'City center',
  'Balcony view', 'Workspace', 'EV charger', 'Pool', 'Hot tub',
];

function DateRangePreview() {
  const [checkIn, setCheckIn] = useState('2026-04-28');
  const [checkOut, setCheckOut] = useState('2026-05-02');
  const [guests, setGuests] = useState(2);
  const [propertyType, setPropertyType] = useState('condo');
  const [features, setFeatures] = useState<string[]>(['City center', 'Balcony view']);
  const [tagDraft, setTagDraft] = useState('');

  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.max(0, Math.round(ms / 86_400_000));
  const rate = PROPERTY_TYPES.find((p) => p.id === propertyType)?.rate ?? 160;
  const total = nights * rate;

  const addFeature = (f: string) => {
    if (!f || features.includes(f)) return;
    setFeatures([...features, f]);
    // Clear after the kinu Combobox has finished writing the picked
    // value into the input on its own click handler.
    requestAnimationFrame(() => setTagDraft(''));
  };
  const removeFeature = (f: string) =>
    setFeatures((prev) => prev.filter((x) => x !== f));

  return (
    <form
      class="kh-trip"
      onSubmit={(e) => {
        e.preventDefault();
        toast.show(`Reserved ${nights} nights · $${total}`, {icon: '🗝️'});
      }}
    >
      <ToggleGroup
        type="single"
        value={propertyType}
        onValueChange={(v) => v && setPropertyType(v as string)}
        class="kh-trip-types"
      >
        {PROPERTY_TYPES.map((p) => (
          <Toggle key={p.id} value={p.id} type="button">{p.label}</Toggle>
        ))}
      </ToggleGroup>

      <div class="kh-trip-dates">
        <Field>
          <Field.Label>Check-in</Field.Label>
          <Calendar
            value={checkIn}
            onInput={(e) =>
              setCheckIn((e.target as HTMLInputElement).value)
            }
          />
        </Field>
        <Field>
          <Field.Label>Check-out</Field.Label>
          <Calendar
            value={checkOut}
            onInput={(e) =>
              setCheckOut((e.target as HTMLInputElement).value)
            }
          />
        </Field>
      </div>

      <Field>
        <Field.Label>Guests</Field.Label>
        <Input
          type="number"
          min={1}
          max={12}
          value={String(guests)}
          onInput={(e) =>
            setGuests(
              Math.max(1, Number((e.target as HTMLInputElement).value) || 1),
            )
          }
        />
      </Field>

      <Field>
        <Field.Label>Property features</Field.Label>
        <div class="kh-trip-features">
          {features.map((f) => (
            <Chip key={f} variant="primary" form="">
              {f}
              <Chip.Button
                onClick={() => removeFeature(f)}
                aria-label={`Remove ${f}`}
              >
                ×
              </Chip.Button>
            </Chip>
          ))}
          <Combobox class="kh-trip-feature-add">
            <ComboboxInput
              placeholder="+ feature"
              size="sm"
              value={tagDraft}
              onInput={(e) =>
                setTagDraft((e.target as HTMLInputElement).value)
              }
              onKeyDown={(e) => {
                if ((e as KeyboardEvent).key === 'Enter') {
                  e.preventDefault();
                  addFeature(tagDraft.trim());
                }
              }}
            />
            <ComboboxList>
              {FEATURE_OPTIONS.filter(
                (f) =>
                  !features.includes(f) &&
                  (!tagDraft ||
                    f.toLowerCase().includes(tagDraft.toLowerCase())),
              ).map((f) => (
                <Item key={f} value={f} onClick={() => addFeature(f)}>
                  {f}
                </Item>
              ))}
            </ComboboxList>
          </Combobox>
        </div>
      </Field>

      <footer class="kh-trip-footer">
        <span class="kh-trip-summary">
          <strong>{nights}</strong> nights · ${total}
        </span>
        <Button type="submit" size="sm" disabled={nights === 0}>
          Reserve
        </Button>
      </footer>
    </form>
  );
}

/* ── 8. Inbox — two-pane master/detail ──────────────────────────────────── */

type InboxMsg = {
  id: string;
  initials: string;
  from: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  status?: 'success' | 'warning' | 'info';
  unread: boolean;
  body: string;
};

const INBOX: InboxMsg[] = [
  {
    id: 'jm', initials: 'JM', from: 'Jason Miller',  email: 'jason@kinu.sh',
    subject: 'Build is green',
    preview: 'CI is green and the bundle is at 11.2 kB.',
    time: '2m', status: 'success', unread: true,
    body:
      "Hey — CI is green and the bundle is at 11.2 kB. The changeset touched theme tokens, so I tagged you. Want to look at it before I cut a release? No rush.",
  },
  {
    id: 'as', initials: 'AS', from: 'Alex Stein',    email: 'alex@kinu.sh',
    subject: 'Re: pricing draft',
    preview: 'Team feels too cheap relative to Org.',
    time: '14m', status: 'warning', unread: true,
    body:
      "Re: pricing draft — Team feels too cheap relative to Org. What if we move Team to $24 and bump Org to $59? It would also make the per-seat math line up better with the Slider in the demo.",
  },
  {
    id: 'km', initials: 'KM', from: 'Karen Montoya', email: 'karen@kinu.sh',
    subject: 'Weekly retro notes',
    preview: 'Three highlights, two action items.',
    time: '1h', unread: false,
    body:
      "Weekly retro: three highlights (commandFor pattern is finally clicking, the docs sidebar got nicer, OTP shipped) and two action items (split Tab and document anchor positioning fallbacks).",
  },
  {
    id: 'tr', initials: 'TR', from: 'Toshi Rahman',  email: 'toshi@contoso.io',
    subject: 'Re: Re: contract revisions',
    preview: 'Legal cleared the indemnification clause.',
    time: '2h', status: 'info', unread: false,
    body:
      "Re: Re: contract revisions — legal cleared the indemnification clause; we're ready for signature. They'd like the redline back by EOD Friday if at all possible.",
  },
];

function InboxPreview() {
  // Default to no selection — on mobile that means the list is the first
  // surface you see, and tapping a row triggers the slide. On desktop the
  // detail pane just shows the first message via shownRef without a row
  // highlight until you click one.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(INBOX.filter((m) => !m.unread).map((m) => m.id)),
  );
  const selected = INBOX.find((m) => m.id === selectedId);
  // Keep the last-shown message rendered while the detail pane is sliding
  // off — otherwise the content blanks halfway through the back animation.
  const shownRef = useRef(INBOX[0]);
  if (selected) shownRef.current = selected;
  const shown = shownRef.current;
  const isRead = (id: string) => readIds.has(id);
  const unreadCount = INBOX.filter((m) => !isRead(m.id)).length;
  const open = (id: string) => {
    setSelectedId(id);
    setReadIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div class="kh-inbox">
      <header class="kh-inbox-bar">
        <span class="kh-inbox-bar-title">
          Inbox
          {unreadCount > 0 && (
            <Badge variant="primary" class="kh-inbox-bar-count">
              {unreadCount}
            </Badge>
          )}
        </span>
        <Popover>
          <PopoverTrigger>
            <button class="kh-account-trigger" type="button" aria-label="Account">
              <Avatar size="sm">JM</Avatar>
              <span class="kh-account-name">Jason</span>
              <span class="kh-account-chev" aria-hidden>▾</span>
            </button>
          </PopoverTrigger>
          <PopoverContent class="kh-account-pop" mobile="drawer">
            <header class="kh-account-head">
              <Avatar size="lg">JM</Avatar>
              <span class="kh-account-headtext">
                <strong>Jason Miller</strong>
                <span class="kh-account-email">jason@kinu.sh</span>
                <Status pulse variant="success" class="kh-account-status">
                  Online
                </Status>
              </span>
            </header>
            <Separator />
            <div class="kh-account-list">
              <Item onClick={() => toast.show('Profile')} shortcut="⌘P">
                Profile
              </Item>
              <Item onClick={() => toast.show('Settings')} shortcut="⌘,">
                Settings
              </Item>
              <Item onClick={() => toast.show('Billing')}>
                Billing <Badge variant="outline">Pro</Badge>
              </Item>
            </div>
            <Separator />
            <div class="kh-account-list">
              <Item destructive onClick={() => toast.show('Signed out')}>
                Sign out
              </Item>
            </div>
          </PopoverContent>
        </Popover>
      </header>
      <div class="kh-inbox-body">
        <Listbox class="kh-inbox-list">
          <ListboxList>
            {INBOX.map((m) => (
              <ContextMenu key={m.id}>
                <ContextMenuTrigger>
                  <Item
                    selected={selectedId === m.id}
                    onClick={() => open(m.id)}
                    class={`kh-inbox-link${isRead(m.id) ? '' : ' is-unread'}`}
                  >
                    <span class="kh-inbox-avatar">
                      <Avatar size="sm">{m.initials}</Avatar>
                      {m.status && (
                        <Status
                          variant={m.status}
                          aria-label={m.status}
                          class="kh-inbox-presence"
                        />
                      )}
                    </span>
                    <span class="kh-inbox-text">
                      <span class="kh-inbox-line">
                        <strong>{m.from.split(' ')[0]}</strong>
                        <span class="kh-inbox-time">{m.time}</span>
                      </span>
                      <span class="kh-inbox-preview">{m.preview}</span>
                    </span>
                    {!isRead(m.id) && (
                      <span class="kh-inbox-dot" aria-label="unread" />
                    )}
                  </Item>
                </ContextMenuTrigger>
                <ContextMenuContent mobile="drawer">
                  <Item onClick={() => open(m.id)}>Open</Item>
                  <Item onClick={() => toast.show(`Archived · ${m.from}`)}>
                    Archive
                  </Item>
                  <Item onClick={() => toast.show(`Starred · ${m.from}`)}>
                    Star
                  </Item>
                  <Item destructive onClick={() => toast.show(`Deleted · ${m.from}`)}>
                    Delete
                  </Item>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </ListboxList>
        </Listbox>
        <article class="kh-inbox-detail">
          <header class="kh-inbox-detail-head">
            <button
              type="button"
              class="kh-inbox-back"
              onClick={() => setSelectedId(null)}
              aria-label="Back to inbox"
            >
              ←
            </button>
            <div class="kh-inbox-detail-from">
              <Avatar size="sm">{shown.initials}</Avatar>
              <div>
                <strong>{shown.from}</strong>
                <span class="kh-inbox-detail-email">{shown.email}</span>
              </div>
            </div>
            <span class="kh-inbox-time">{shown.time}</span>
          </header>
          <h4 class="kh-inbox-subject">{shown.subject}</h4>
          <p class="kh-inbox-body-text">{shown.body}</p>
        </article>
      </div>
    </div>
  );
}

/* ── Settings — Tabs (Profile / Theme / Plan) ──────────────────────────── *
 * Combines the avatar upload, theme studio, and pricing calculator demos
 * into a single multi-tab panel — exactly the kind of place where Tabs
 * earn their keep (separate facets of one screen, not multi-document UI).
 * The avatar upload reads the chosen file with URL.createObjectURL and
 * sets it as the live Avatar src (no upload, just a blob URL on the
 * client). The Theme tab pipes its picker into a real --k-* override on
 * an inline preview card, so editing actually re-themes the kinu Buttons
 * + Badge inside it. The Plan tab keeps the ToggleGroup + Slider + Switch
 * pricing math.
 */

const SETTINGS_PLAN_PRICE: Record<string, number> = {solo: 9, team: 22, org: 49};
const SETTINGS_PLAN_DESC: Record<string, string> = {
  solo: '1 seat · personal projects',
  team: 'unlimited projects · priority support',
  org:  'SSO · audit log · SLA',
};

function SettingsPreview() {
  const [tab, setTab] = useState<'profile' | 'theme' | 'plan'>('profile');
  return (
    <div class="kh-settings">
      <TabList class="kh-settings-tabs">
        <Tab
          aria-selected={tab === 'profile'}
          onClick={() => setTab('profile')}
        >
          Profile
        </Tab>
        <Tab aria-selected={tab === 'theme'} onClick={() => setTab('theme')}>
          Theme
        </Tab>
        <Tab aria-selected={tab === 'plan'} onClick={() => setTab('plan')}>
          Plan
        </Tab>
      </TabList>
      {tab === 'profile' && <SettingsProfile />}
      {tab === 'theme' && <SettingsTheme />}
      {tab === 'plan' && <SettingsPlan />}
    </div>
  );
}

function SettingsProfile() {
  const [email] = useState('jason@kinu.sh');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const lastBlobRef = useRef<string | null>(null);
  // Stays in the verifying state for the demo so the OTP UI is visible.
  const verifying = true;

  // Revoke any previously-issued blob URL when the component unmounts so
  // we don't leak object references across re-renders.
  useEffect(() => () => {
    if (lastBlobRef.current) URL.revokeObjectURL(lastBlobRef.current);
  }, []);

  const onPickAvatar = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (lastBlobRef.current) URL.revokeObjectURL(lastBlobRef.current);
    const url = URL.createObjectURL(file);
    lastBlobRef.current = url;
    setAvatarUrl(url);
  };

  return (
    <TabPanel class="kh-settings-panel">
      <div class="kh-settings-avatar">
        {avatarUrl ? (
          <Avatar size="lg" src={avatarUrl} alt="Profile" />
        ) : (
          <Avatar size="lg">JM</Avatar>
        )}
        <Field>
          <Field.Label>Avatar</Field.Label>
          <FileUpload accept="image/*" onChange={onPickAvatar} />
        </Field>
      </div>
      <Field>
        <Field.Label>Email</Field.Label>
        <InputGroup>
          <Input value={email} disabled />
          <Button type="button" variant="outline">
            Verify
          </Button>
        </InputGroup>
      </Field>
      {verifying && <VerifyEmailBlock email={email} />}
    </TabPanel>
  );
}

function VerifyEmailBlock({email}: {email: string}) {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(42);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  return (
    <div class="kh-verify">
      <p class="kh-verify-lede">
        We sent a code to <code>{email}</code>.
      </p>
      <OTPInput
        maxLength={6}
        value={code}
        onInput={(e) =>
          setCode(
            (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 6),
          )
        }
        aria-label="Verification code"
      />
      <div class="kh-verify-foot">
        <span class="kh-verify-resend">
          {seconds > 0 ? (
            <>
              Resend in <strong>0:{seconds.toString().padStart(2, '0')}</strong>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => {
                setSeconds(42);
                toast.show('Code re-sent');
              }}
            >
              Resend code
            </Button>
          )}
        </span>
        <Button
          type="button"
          size="sm"
          disabled={code.length < 6}
          onClick={() => {
            toast.show('Email verified', {icon: '✓'});
            setCode('');
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}

function SettingsTheme() {
  const [color, setColor] = useState('#3f5246');
  const [radius, setRadius] = useState('md');
  const radii: Record<string, string> = {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '999px',
  };
  const cssVars = `--k-primary:${hexToHsl(color)};--k-radius:${radii[radius]}`;

  return (
    <TabPanel class="kh-settings-panel">
      <Field>
        <Field.Label>Primary color</Field.Label>
        <ColorPicker
          value={color}
          onInput={(e) => setColor((e.target as HTMLInputElement).value)}
        />
      </Field>
      <Field>
        <Field.Label>Corner radius</Field.Label>
        <ToggleGroup
          type="single"
          value={radius}
          onValueChange={(v) => v && setRadius(v as string)}
        >
          <Toggle value="none">none</Toggle>
          <Toggle value="sm">sm</Toggle>
          <Toggle value="md">md</Toggle>
          <Toggle value="lg">lg</Toggle>
          <Toggle value="full">full</Toggle>
        </ToggleGroup>
      </Field>
      <Card padding="sm" class="kh-settings-stage" style={cssVars}>
        <span class="kh-settings-stage-label">Live preview</span>
        <div class="kh-settings-stage-row">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Badge>Badge</Badge>
        </div>
      </Card>
    </TabPanel>
  );
}

function SettingsPlan() {
  const [plan, setPlan] = useState('team');
  const [seats, setSeats] = useState(12);
  const [annual, setAnnual] = useState(true);

  const monthly = SETTINGS_PLAN_PRICE[plan] * seats;
  const total = annual ? Math.round(monthly * 12 * 0.85) : monthly;

  return (
    <TabPanel class="kh-settings-panel">
      <ToggleGroup
        type="single"
        value={plan}
        onValueChange={(v) => v && setPlan(v as string)}
      >
        <Toggle value="solo">Solo</Toggle>
        <Toggle value="team">Team</Toggle>
        <Toggle value="org">Org</Toggle>
      </ToggleGroup>
      <Label class="kh-settings-annual">
        <Switch
          checked={annual}
          onInput={(e) =>
            setAnnual((e.target as HTMLInputElement).checked)
          }
        />
        <span>Annual billing</span>
        {annual && <Badge variant="outline">15% off</Badge>}
      </Label>
      <Field>
        <Field.Label>
          Seats: <strong>{seats}</strong>
        </Field.Label>
        <Slider
          min={1}
          max={50}
          value={seats}
          onInput={(e) =>
            setSeats(Number((e.target as HTMLInputElement).value))
          }
        />
      </Field>
      <p class="kh-settings-desc">{SETTINGS_PLAN_DESC[plan]}</p>
      <footer class="kh-settings-total">
        <span class="kh-settings-amount">${total.toLocaleString()}</span>
        <span class="kh-settings-period">{annual ? '/year' : '/mo'}</span>
      </footer>
    </TabPanel>
  );
}

/* hex→HSL helper used by the Theme tab in Settings. */
function hexToHsl(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${Math.round(l * 100)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

