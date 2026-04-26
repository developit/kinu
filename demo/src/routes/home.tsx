import {
  Button,
  Card,
  Input,
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
  ToastContainer,
  toast,
} from 'kinu';
import {useState} from 'preact/hooks';
import {Nav} from '../nav';

export default function Home() {
  return (
    <div class="kinu-home">
      <Nav class="home-nav home-nav--marketing" search />
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

        <Card padding="none" class="kh-silk">
          <SilkArt />
        </Card>
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
              The thin veneer is calculated. Kinu defers the work of styling to
              the platform — your real elements, with real behavior, smoothed
              over by the lightest possible coat of CSS. The toolkit reveals
              the form beneath, then refines its lines.
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
        <div class="kh-stones" aria-hidden>
          <StackedStones />
        </div>
      </section>

      <section class="kh-try">
        <div class="kh-try-head">
          <h2 class="kh-section-title">
            Go ahead — <em>try them.</em>
          </h2>
          <Prose class="kh-section-lede">
            <p>
              Sixty composable pieces, each a thin layer over the HTML it
              enhances. Hover, focus, drag, type — the components answer.
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
            Write the markup you'd write anyway. Kinu just makes it look right
            — with sane defaults, accessible primitives, and no hidden
            re-renders.
          </p>
        </Prose>

        <div class="kh-code-grid">
          <Card class="kh-code kh-code--light" padding="lg">
            <Badge variant="outline" class="kh-code-label">
              Markup
            </Badge>
            <pre>{`<form k="form" action="/subscribe">
  <label>
    Email address
    <input type="email" required />
  </label>

  <button>Subscribe →</button>
</form>`}</pre>
          </Card>
          <Card class="kh-code kh-code--dark" padding="lg">
            <Badge variant="outline" class="kh-code-label">
              Theme
            </Badge>
            <pre>
              <span class="kh-code-comment">{`// Theme it.`}</span>
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
          <p>60 components. Around 6kB. Zero surprises.</p>
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

function TabsPreview() {
  return (
    <div class="kh-preview-stack">
      <TabList>
        <Tab aria-selected="true">Overview</Tab>
        <Tab>Install</Tab>
        <Tab>Theme</Tab>
      </TabList>
      <TabPanel>
        <Prose>
          <p>Composable tabs. Native semantics under the hood.</p>
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

function SilkArt() {
  return (
    <div class="kh-silk-art">
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
        aria-label="A stack of stones balanced from large to small"
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
