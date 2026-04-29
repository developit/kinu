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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Field,
  FileUpload,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Item,
  Kbd,
  Label,
  Listbox,
  ListboxInput,
  ListboxList,
  OTPInput,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressRing,
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
  Timeline,
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
              Sixteen real product surfaces, composed from the components in
              this toolkit. Click around. The whole grid runs on the same
              ~11&nbsp;kB you'd ship.
            </p>
          </Prose>
        </div>

        <div class="kh-preview-grid">
          <PreviewCard title="Tasks">
            <TasksPreview />
          </PreviewCard>
          <PreviewCard title="Now Playing">
            <NowPlayingPreview />
          </PreviewCard>
          <PreviewCard title="AI Composer">
            <ComposerPreview />
          </PreviewCard>
          <PreviewCard title="Team Activity">
            <ActivityPreview />
          </PreviewCard>
          <PreviewCard title="Command Palette">
            <CommandPalettePreview />
          </PreviewCard>
          <PreviewCard title="Trip Booking">
            <DateRangePreview />
          </PreviewCard>
          <PreviewCard title="Inbox">
            <InboxPreview />
          </PreviewCard>
          <PreviewCard title="Verify Email">
            <OTPPreview />
          </PreviewCard>
          <PreviewCard title="Settings">
            <SettingsPreview />
          </PreviewCard>
          <PreviewCard title="Filters">
            <FiltersPreview />
          </PreviewCard>
          <PreviewCard title="Quick Search">
            <SearchPreview />
          </PreviewCard>
          <PreviewCard title="Account">
            <AccountMenuPreview />
          </PreviewCard>
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
              {t.id === currentId && playing ? (
                <Spinner size="sm" aria-label="Playing" />
              ) : (
                <span class="kh-player-track-dur">{t.duration}</span>
              )}
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
  children,
}: {title: string; hint?: string; children: ComponentChildren}) {
  return (
    <Card class="kh-preview" padding="lg">
      <header class="kh-preview-head">
        <span class="kh-preview-title">{title}</span>
        {hint && <span class="kh-preview-hint">{hint}</span>}
      </header>
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
    if (el) el.scrollTop = el.scrollHeight;
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
      <ScrollArea class="kh-composer-thread" ref={threadRef as any}>
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
      </ScrollArea>
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
  {id: 'home',  label: 'Whole home', rate: 220},
  {id: 'condo', label: 'Condo',      rate: 160},
  {id: 'apt',   label: 'Apartment',  rate: 130},
  {id: 'hotel', label: 'Hotel room', rate: 95},
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
    setTagDraft('');
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
          <Toggle key={p.id} value={p.id}>{p.label}</Toggle>
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
            <Chip key={f} variant="primary">
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

/* ── 7. Pricing calculator — ToggleGroup + Switch + Slider ──────────────── */

const PLAN_PRICE: Record<string, number> = {solo: 9, team: 22, org: 49};
const PLAN_DESC: Record<string, string> = {
  solo: '1 seat · personal projects',
  team: 'unlimited projects · priority support',
  org:  'SSO · audit log · SLA',
};

function PricingPreview() {
  const [plan, setPlan] = useState('team');
  const [seats, setSeats] = useState(12);
  const [annual, setAnnual] = useState(true);

  const monthly = PLAN_PRICE[plan] * seats;
  const total = annual ? Math.round(monthly * 12 * 0.85) : monthly;

  return (
    <div class="kh-pricing">
      <div class="kh-pricing-row">
        <ToggleGroup
          type="single"
          value={plan}
          onValueChange={(v) => v && setPlan(v as string)}
        >
          <Toggle value="solo">Solo</Toggle>
          <Toggle value="team">Team</Toggle>
          <Toggle value="org">Org</Toggle>
        </ToggleGroup>
        <Label class="kh-pricing-annual">
          <Switch
            checked={annual}
            onInput={(e) =>
              setAnnual((e.target as HTMLInputElement).checked)
            }
          />
          <span>Annual</span>
          {annual && <Badge variant="outline">15% off</Badge>}
        </Label>
      </div>
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
      <p class="kh-pricing-desc">{PLAN_DESC[plan]}</p>
      <footer class="kh-pricing-total">
        <span class="kh-pricing-amount">${total.toLocaleString()}</span>
        <span class="kh-pricing-period">{annual ? '/year' : '/mo'}</span>
      </footer>
    </div>
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
  const [selectedId, setSelectedId] = useState(INBOX[0].id);
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(INBOX.filter((m) => !m.unread).map((m) => m.id)),
  );
  const selected = INBOX.find((m) => m.id === selectedId) ?? INBOX[0];
  const isRead = (id: string) => readIds.has(id);
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
      <ScrollArea class="kh-inbox-list">
        {INBOX.map((m) => {
          const row = (
            <button
              class={`kh-inbox-link${selectedId === m.id ? ' is-active' : ''}${isRead(m.id) ? '' : ' is-unread'}`}
              type="button"
              onClick={() => open(m.id)}
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
            </button>
          );
          return (
            <ContextMenu key={m.id}>
              <ContextMenuTrigger>
                <HoverCard>
                  <HoverCardTrigger class="kh-inbox-trigger">
                    {row}
                  </HoverCardTrigger>
                  <HoverCardContent class="kh-inbox-hover">
                    <strong>{m.subject}</strong>
                    <p>{m.preview}</p>
                  </HoverCardContent>
                </HoverCard>
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
          );
        })}
      </ScrollArea>
      <article class="kh-inbox-detail">
        <header class="kh-inbox-detail-head">
          <div class="kh-inbox-detail-from">
            <Avatar size="sm">{selected.initials}</Avatar>
            <div>
              <strong>{selected.from}</strong>
              <span class="kh-inbox-detail-email">{selected.email}</span>
            </div>
          </div>
          <span class="kh-inbox-time">{selected.time}</span>
        </header>
        <h4 class="kh-inbox-subject">{selected.subject}</h4>
        <p class="kh-inbox-body">{selected.body}</p>
      </article>
    </div>
  );
}

/* ── 9. Onboarding stepper — Timeline + ProgressRing on the active step ── */

function OnboardingPreview() {
  return (
    <Timeline class="kh-onboard">
      <Timeline.Entry data-state="done">
        <span class="kh-onboard-row">
          <strong>Create account</strong>
          <Status variant="success" class="kh-onboard-when">2m ago</Status>
        </span>
      </Timeline.Entry>
      <Timeline.Entry data-state="done">
        <span class="kh-onboard-row">
          <strong>Install kinu</strong>
          <Status variant="success" class="kh-onboard-when">just now</Status>
        </span>
      </Timeline.Entry>
      <Timeline.Entry data-state="active" class="kh-onboard-active">
        <span class="kh-onboard-row">
          <strong>Theme it</strong>
          <Status pulse variant="info" class="kh-onboard-when">
            in progress
          </Status>
        </span>
        <span class="kh-onboard-progress">
          <ProgressRing value={57} max={100} size="sm" />
          <small>4 of 7 components themed</small>
        </span>
      </Timeline.Entry>
      <Timeline.Entry>
        <span class="kh-onboard-row">
          <strong>Ship</strong>
          <Status class="kh-onboard-when">up next</Status>
        </span>
      </Timeline.Entry>
    </Timeline>
  );
}

/* ── 10. File Upload — drop zone + per-file Progress ───────────────────── */

type Upload = {name: string; size: string; pct: number; done: boolean};
const SEED_UPLOADS: Upload[] = [
  {name: 'hero.mp4',     size: '14.2 MB', pct: 72,  done: false},
  {name: 'banner.png',   size: '420 KB',  pct: 100, done: true},
];

function FileUploadPreview() {
  const [uploads, setUploads] = useState(SEED_UPLOADS);

  // Animate the in-progress upload to completion for visual life.
  useEffect(() => {
    const id = setInterval(() => {
      setUploads((prev) =>
        prev.map((u) =>
          u.done
            ? u
            : u.pct >= 100
              ? {...u, done: true}
              : {...u, pct: Math.min(100, u.pct + 4)},
        ),
      );
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div class="kh-upload">
      <FileUpload multiple class="kh-upload-zone" />
      <ul class="kh-upload-list">
        {uploads.map((u) => (
          <li key={u.name} class="kh-upload-item">
            <span class="kh-upload-name">{u.name}</span>
            <span class="kh-upload-size">{u.size}</span>
            <Progress value={u.pct} max={100} class="kh-upload-bar" />
            {u.done ? (
              <Badge variant="outline">done</Badge>
            ) : (
              <span class="kh-upload-pct">{u.pct}%</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 11. Verify Email — OTPInput + countdown + Spinner during verify ───── */

function OTPPreview() {
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [seconds, setSeconds] = useState(42);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const verify = (e: Event) => {
    e.preventDefault();
    if (code.length < 6) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setCode('');
      toast.show('Email verified', {icon: '✓'});
    }, 900);
  };

  return (
    <form class="kh-otp" onSubmit={verify}>
      <p class="kh-otp-lede">
        We sent a code to <code>hello@kinu.sh</code>.
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
      <footer class="kh-otp-foot">
        <span class="kh-otp-resend">
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
          type="submit"
          size="sm"
          disabled={code.length < 6 || verifying}
          loading={verifying}
        >
          {verifying ? <Spinner size="sm" aria-hidden="true" /> : null}
          {verifying ? 'Verifying' : 'Verify'}
        </Button>
      </footer>
    </form>
  );
}

/* ── 12. Theme Studio — ColorPicker + ToggleGroup for radius, live preview */

const RADII: Record<string, string> = {
  none: '0',
  sm:   '0.25rem',
  md:   '0.5rem',
  lg:   '0.75rem',
  full: '999px',
};

function ThemeStudioPreview() {
  const [color, setColor] = useState('#3f5246');
  const [radius, setRadius] = useState('md');
  const cssVars = `--k-primary:${hexToHsl(color)};--k-radius:${RADII[radius]}`;

  return (
    <div class="kh-studio">
      <div class="kh-studio-controls">
        <Field>
          <Field.Label>Primary</Field.Label>
          <ColorPicker
            value={color}
            onInput={(e) => setColor((e.target as HTMLInputElement).value)}
          />
        </Field>
        <Field>
          <Field.Label>Radius</Field.Label>
          <ToggleGroup
            type="single"
            value={radius}
            onValueChange={(v) => v && setRadius(v as string)}
            class="kh-studio-radius"
          >
            <Toggle value="none">none</Toggle>
            <Toggle value="sm">sm</Toggle>
            <Toggle value="md">md</Toggle>
            <Toggle value="lg">lg</Toggle>
            <Toggle value="full">full</Toggle>
          </ToggleGroup>
        </Field>
      </div>
      <Card padding="sm" class="kh-studio-stage" style={cssVars}>
        <span class="kh-studio-stage-label">Live preview</span>
        <div class="kh-studio-stage-row">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Badge>Badge</Badge>
        </div>
      </Card>
    </div>
  );
}

/* tiny hex→HSL helper for the theme stage. */
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

/* ── 13. Editor Tabs — TabList with closeable Tabs + syntax-highlighted body */

const TAB_FILES: Array<{id: string; name: string; lang: string; code: string}> = [
  {
    id: 'newpost',
    name: 'new-post.tsx',
    lang: 'tsx',
    code: `<Field>
  <Field.Label>Title</Field.Label>
  <Input name="title" required />
</Field>`,
  },
  {
    id: 'theme',
    name: 'theme.css',
    lang: 'css',
    code: `:root {
  --k-primary: 135 22% 22%;
  --k-radius: 0.5rem;
}`,
  },
  {
    id: 'readme',
    name: 'README.md',
    lang: 'markdown',
    code: `# Kinu

Preact UI toolkit.
**10x smaller** than you think.`,
  },
];

function EditorTabsPreview() {
  const [files, setFiles] = useState(TAB_FILES);
  const [tab, setTab] = useState(TAB_FILES[0].id);
  const active = files.find((f) => f.id === tab) ?? files[0];

  const closeTab = (id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (id === tab && next.length) setTab(next[0].id);
      return next;
    });
  };

  const highlighted = active
    ? hljs.highlight(active.code, {
        language:
          active.lang === 'markdown' ? 'xml' : active.lang === 'tsx' ? 'tsx' : active.lang,
      }).value
    : '';

  return (
    <div class="kh-editor">
      <TabList class="kh-editor-tabs">
        {files.map((f) => (
          <Tab
            key={f.id}
            aria-selected={tab === f.id}
            onClick={() => setTab(f.id)}
            class="kh-editor-tab"
          >
            <span>{f.name}</span>
            <Chip.Button
              onClick={() => closeTab(f.id)}
              aria-label={`Close ${f.name}`}
              class="kh-editor-close"
            >
              ×
            </Chip.Button>
          </Tab>
        ))}
      </TabList>
      {active ? (
        <TabPanel class="kh-editor-panel">
          <pre class="kh-editor-code hljs">
            <code
              class={`language-${active.lang}`}
              dangerouslySetInnerHTML={{__html: highlighted}}
            />
          </pre>
        </TabPanel>
      ) : (
        <p class="kh-editor-empty">All tabs closed.</p>
      )}
    </div>
  );
}

/* ── 14. Filters — ToggleGroup sort + removable Chips + add-filter Combobox */

const SORT_OPTIONS = ['Newest', 'Top', 'Active'];
const POSSIBLE_TAGS = ['urgent', 'docs', 'frontend', 'API', 'design', 'release'];

function FiltersPreview() {
  const [sort, setSort] = useState('Newest');
  const [tags, setTags] = useState(['Status: Open', 'Owner: Jason']);
  const [draft, setDraft] = useState('');

  const remove = (t: string) => setTags((prev) => prev.filter((x) => x !== t));
  const addDraft = () => {
    const v = draft.trim();
    if (!v || tags.includes(v)) return;
    setTags([...tags, v]);
    setDraft('');
  };

  return (
    <div class="kh-filters">
      <div class="kh-filters-row">
        <span class="kh-filters-label">Sort</span>
        <ToggleGroup
          type="single"
          value={sort}
          onValueChange={(v) => v && setSort(v as string)}
        >
          {SORT_OPTIONS.map((s) => (
            <Toggle key={s} value={s}>{s}</Toggle>
          ))}
        </ToggleGroup>
      </div>
      <div class="kh-filters-row kh-filters-row--wrap">
        {tags.map((t) => (
          <Chip key={t} variant="primary">
            {t}
            <Chip.Button onClick={() => remove(t)} aria-label={`Remove ${t}`}>
              ×
            </Chip.Button>
          </Chip>
        ))}
        <Combobox class="kh-filters-add">
          <ComboboxInput
            placeholder="+ filter"
            size="sm"
            value={draft}
            onInput={(e) => setDraft((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
              if ((e as KeyboardEvent).key === 'Enter') {
                e.preventDefault();
                addDraft();
              }
            }}
          />
          <ComboboxList>
            {POSSIBLE_TAGS.filter(
              (p) =>
                (!draft || p.toLowerCase().includes(draft.toLowerCase())) &&
                !tags.includes(`Tag: ${p}`),
            ).map((p) => (
              <Item
                key={p}
                onClick={() => {
                  setTags((prev) => [...prev, `Tag: ${p}`]);
                  setDraft('');
                }}
              >
                {p}
              </Item>
            ))}
          </ComboboxList>
        </Combobox>
      </div>
    </div>
  );
}

/* ── 15. Quick Search — Combobox with rich rows (avatar + email + role) ── */

const PEOPLE = [
  {initials: 'JM', name: 'Jason Miller',   email: 'jason@kinu.sh',   role: 'Maintainer'},
  {initials: 'AS', name: 'Alex Stein',     email: 'alex@kinu.sh',    role: 'Designer'},
  {initials: 'KM', name: 'Karen Montoya',  email: 'karen@kinu.sh',   role: 'Engineer'},
  {initials: 'TR', name: 'Toshi Rahman',   email: 'toshi@contoso.io',role: 'Customer'},
  {initials: 'RB', name: 'Rosa Beltran',   email: 'rosa@contoso.io', role: 'Customer'},
  {initials: 'SH', name: 'Sam Hwang',      email: 'sam@kinu.sh',     role: 'Engineer'},
];

function SearchPreview() {
  const [query, setQuery] = useState('');
  const matches = PEOPLE.filter((p) =>
    !query ||
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.email.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Combobox class="kh-search">
      <ComboboxInput
        placeholder="Search teammates and customers…"
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
  );
}

/* ── 16. Account menu — Avatar trigger + Popover content ────────────────── */

function AccountMenuPreview() {
  return (
    <div class="kh-account">
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
    </div>
  );
}

/* ── Settings — Tabs (Profile / Theme / Plan) ──────────────────────────── */
function SettingsPreview() {
  // Implementation comes in CHUNK F.
  return <p style={{margin: 0, padding: 16, color: 'hsl(var(--k-muted-foreground))'}}>Settings — coming next chunk</p>;
}
