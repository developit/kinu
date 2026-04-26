import type {ComponentChildren} from 'preact';
import {
  Button,
  Card,
  Input,
  Switch,
  Checkbox,
  Progress,
  Label,
  toast,
} from 'kinu';
import {KinuLogo} from '../logo';

export default function Home() {
  return (
    <div class="kinu-home">
      <HomeNav />

      <section class="kh-hero">
        <div class="kh-hero-glow" aria-hidden />
        <div class="kh-hero-inner">
          <h1 class="kh-hero-title">
            Preact UI toolkit.
            <br />
            <em>10x smaller</em> than you think.
          </h1>
          <p class="kh-eyebrow">Intuitive for Humans + LLMs</p>
          <p class="kh-hero-lede">
            <em>Kinu</em>: the Japanese word for silk. An ultra-thin layer of
            styling and ergonomics over native HTML. Zero dependencies, zero
            runtime overhead, zero wrapper divs.
          </p>
          <div class="kh-hero-actions">
            <Button class="kh-pill kh-pill--dark" href="/getting-started">
              Start Building
            </Button>
            <Button class="kh-pill kh-pill--outline" href="/docs">
              View Components
            </Button>
          </div>
        </div>

        <div class="kh-silk-wrap">
          <SilkCard />
        </div>
      </section>

      <section class="kh-facade">
        <div class="kh-facade-text">
          <p class="kh-eyebrow kh-eyebrow--dark">The trick</p>
          <h2 class="kh-facade-title">
            A Clever
            <br />
            Facade.
          </h2>
          <p class="kh-facade-body">
            The thin veneer is calculated. Kinu defers the work of styling to
            the platform — your real elements, with real behavior, smoothed
            over by the lightest possible coat of CSS. The toolkit reveals the
            form beneath, then refines its lines.
          </p>
          <div class="kh-facade-links">
            <a class="kh-link kh-link--bright" href="/docs">
              Read the philosophy →
            </a>
            <a class="kh-link kh-link--muted" href="/docs">
              Browse components
            </a>
          </div>
        </div>
        <div class="kh-stones">
          <StackedStones />
        </div>
      </section>

      <section class="kh-try">
        <div class="kh-try-head">
          <h2 class="kh-section-title">
            Go ahead — <em>try them.</em>
          </h2>
          <p class="kh-section-lede">
            Sixty composable pieces, each a thin layer over the HTML it
            enhances. Hover, focus, drag, type — the components answer.
          </p>
        </div>

        <div class="kh-preview-grid">
          <PreviewCard title="Form · Field">
            <FormPreview />
          </PreviewCard>
          <PreviewCard title="Switch · Slider">
            <SwitchPreview />
          </PreviewCard>
          <PreviewCard title="Tabs">
            <TabsPreview />
          </PreviewCard>
          <PreviewCard title="Toast">
            <ToastPreview />
          </PreviewCard>
        </div>
      </section>

      <section class="kh-html">
        <h2 class="kh-html-title">
          HTML <em>as</em> a First-Class Citizen.
        </h2>
        <p class="kh-section-lede kh-html-lede">
          Write the markup you'd write anyway. Kinu just makes it look right —
          with sane defaults, accessible primitives, and no hidden re-renders.
        </p>

        <div class="kh-code-grid">
          <pre class="kh-code kh-code--light">{`<form k="form" action="/subscribe">
  <label>
    Email address
    <input type="email" required />
  </label>

  <button>Subscribe →</button>
</form>`}</pre>
          <pre class="kh-code kh-code--dark">
            <span class="kh-code-comment">{`// Theme it.`}</span>
            {`
:root {
  --k-primary: 133 11% 33%;
  --k-radius: 0.5rem;
}`}
          </pre>
        </div>
      </section>

      <section class="kh-ship">
        <h2 class="kh-ship-title">Ship less. Do more.</h2>
        <p class="kh-ship-lede">60 components. Around 6kB. Zero surprises.</p>
        <div class="kh-ship-actions">
          <a class="kh-ship-btn kh-ship-btn--cream" href="/getting-started">
            Get started
          </a>
          <a
            class="kh-ship-btn kh-ship-btn--ghost"
            href="https://github.com/developit/kinu"
          >
            Star on GitHub
          </a>
        </div>
      </section>

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

function HomeNav() {
  return (
    <nav class="kh-nav">
      <a class="kh-nav-brand" href="/" aria-label="Kinu home">
        <KinuLogo size={22} />
      </a>
      <div class="kh-nav-links">
        <a href="/docs">Docs</a>
        <a href="/docs">Components</a>
        <a href="/linear">Examples</a>
        <a href="/docs">Blog</a>
        <a href="https://github.com/developit/kinu">GitHub</a>
      </div>
      <div class="kh-nav-actions">
        <span class="kh-nav-search">
          Search <kbd>⌘K</kbd>
        </span>
      </div>
    </nav>
  );
}

function SilkCard() {
  return (
    <div class="kh-silk">
      <svg
        class="kh-silk-svg"
        viewBox="0 0 880 360"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Abstract silk fabric flowing across a dark sage backdrop"
      >
        <title>Silk fabric</title>
        <defs>
          <linearGradient id="kh-silk-main" x1="0%" y1="40%" x2="100%" y2="60%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.05" />
            <stop offset="20%" stop-color="#ffffff" stop-opacity="0.85" />
            <stop offset="55%" stop-color="#e7e8e3" stop-opacity="0.9" />
            <stop offset="85%" stop-color="#ffffff" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="kh-silk-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#000" stop-opacity="0" />
            <stop offset="50%" stop-color="#000" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#000" stop-opacity="0" />
          </linearGradient>
          <radialGradient id="kh-silk-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="880" height="360" fill="url(#kh-silk-glow)" />
        <path
          d="M -40 230 C 100 80, 220 320, 380 200 C 540 90, 680 280, 920 160 L 920 250 C 700 380, 540 200, 400 320 C 250 420, 80 240, -40 380 Z"
          fill="url(#kh-silk-main)"
          opacity="0.95"
        />
        <path
          d="M 100 130 C 220 220, 380 80, 540 180 C 700 260, 820 130, 960 200 L 960 220 C 800 280, 660 180, 520 240 C 380 290, 220 200, 100 250 Z"
          fill="url(#kh-silk-shadow)"
          opacity="0.55"
        />
        <path
          d="M -20 200 C 140 100, 280 280, 480 180 C 660 90, 800 240, 920 180"
          stroke="#fff"
          stroke-width="1.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M -20 240 C 160 160, 320 320, 520 220 C 700 140, 820 280, 920 240"
          stroke="#fff"
          stroke-width="1"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M 60 280 C 220 220, 360 380, 560 280"
          stroke="#fff"
          stroke-width="0.8"
          fill="none"
          opacity="0.3"
        />
        <ellipse cx="440" cy="320" rx="500" ry="60" fill="#fff" opacity="0.06" />
      </svg>
      <div class="kh-silk-vignette" aria-hidden />
    </div>
  );
}

function StackedStones() {
  return (
    <div class="kh-stones-disc">
      <svg
        viewBox="0 0 280 280"
        role="img"
        aria-label="Stack of stones balanced from large to small"
      >
        <title>Stacked stones</title>
        <defs>
          <radialGradient id="kh-stone" cx="40%" cy="30%" r="80%">
            <stop offset="0%" stop-color="#9DA89C" stop-opacity="1" />
            <stop offset="60%" stop-color="#5A6960" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#2C3D31" stop-opacity="0.3" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="220" rx="78" ry="14" fill="url(#kh-stone)" />
        <ellipse cx="140" cy="190" rx="60" ry="12" fill="url(#kh-stone)" opacity="0.95" />
        <ellipse cx="140" cy="162" rx="44" ry="10" fill="url(#kh-stone)" opacity="0.88" />
        <ellipse cx="140" cy="138" rx="30" ry="8" fill="url(#kh-stone)" opacity="0.78" />
        <ellipse cx="140" cy="118" rx="18" ry="6" fill="url(#kh-stone)" opacity="0.65" />
        <ellipse cx="140" cy="104" rx="9" ry="4" fill="url(#kh-stone)" opacity="0.55" />
      </svg>
    </div>
  );
}

function PreviewCard({
  title,
  children,
}: {title: string; children: ComponentChildren}) {
  return (
    <Card class="kh-preview">
      <span class="kh-preview-title">{title}</span>
      <div class="kh-preview-body">{children}</div>
    </Card>
  );
}

function FormPreview() {
  return (
    <div class="kh-preview-stack">
      <Input defaultValue="hello@kinu.sh" />
      <Label class="kh-preview-row">
        <Checkbox defaultChecked />
        <span>Send me the docs</span>
      </Label>
      <Label class="kh-preview-row">
        <Checkbox />
        <span>Subscribe to changelog</span>
      </Label>
    </div>
  );
}

function SwitchPreview() {
  return (
    <div class="kh-preview-stack">
      <div class="kh-preview-row kh-preview-row--between">
        <span>Reduced motion</span>
        <Switch defaultChecked />
      </div>
      <div class="kh-preview-row kh-preview-row--between">
        <span>System sync</span>
        <Switch />
      </div>
      <Progress value={64} max={100} />
    </div>
  );
}

function TabsPreview() {
  return (
    <div class="kh-preview-stack">
      <div class="kh-preview-tabs">
        <button class="kh-tab is-active" type="button">
          Overview
        </button>
        <button class="kh-tab" type="button">
          Install
        </button>
        <button class="kh-tab" type="button">
          Theme
        </button>
      </div>
      <p class="kh-preview-note">
        Composable tabs. Native semantics under the hood.
      </p>
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
      <div class="kh-preview-toast">
        <span>Copied to clipboard</span>
        <span class="kh-preview-toast-arrow">↗</span>
      </div>
    </div>
  );
}
