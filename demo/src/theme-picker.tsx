import {useEffect, useState} from 'preact/hooks';
import type {ComponentChildren} from 'preact';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Tooltip,
} from 'kinu';
import {ThemeCustomizer, THEME_CUSTOMIZER_DIALOG_ID} from './theme-customizer.tsx';

const THEME_STORAGE_KEY = 'kinu-theme';
const DENSITY_STORAGE_KEY = 'kinu-density';

interface ThemeOption {
  /** `data-theme` attribute value; empty string = no theme (kinu default look) */
  id: string;
  /** Human-readable name */
  name: string;
}

interface DensityOption {
  /** `data-kinu-density` attribute value; empty string = no attr (auto/default) */
  id: string;
  /** Human-readable name */
  name: string;
  /** One-line hint shown below the name */
  hint: string;
}

const THEMES: ReadonlyArray<ThemeOption> = [
  {id: '', name: 'Default'},
  {id: 'claw', name: 'Claw'},
];

const DENSITIES: ReadonlyArray<DensityOption> = [
  {id: '', name: 'Auto', hint: 'comfortable on desktop, spacious on touch'},
  {id: 'sm', name: 'Compact', hint: 'denser power-user UI'},
  {id: 'md', name: 'Comfortable', hint: 'kinu default desktop'},
  {id: 'lg', name: 'Spacious', hint: 'touch-friendly everywhere'},
];

function readAttr(name: string): string {
  if (typeof document === 'undefined') return '';
  return document.documentElement.getAttribute(name) ?? '';
}

function writeAttr(name: string, value: string) {
  if (value) document.documentElement.setAttribute(name, value);
  else document.documentElement.removeAttribute(name);
}

// Restore the persisted choices (the inline script in index.html primes
// these before paint; this just keeps things in sync if the script ran
// before localStorage existed for any reason).
try {
  if (typeof document !== 'undefined') {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    if (t) writeAttr('data-theme', t);
    const d = localStorage.getItem(DENSITY_STORAGE_KEY);
    if (d) writeAttr('data-kinu-density', d);
  }
} catch {}

/* ── Section header ──────────────────────────────────────── */
function SectionHeader({children}: {children: ComponentChildren}) {
  return (
    <div
      style="
        padding: 0.375rem 0.5rem 0.125rem;
        font-size: 0.6875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: hsl(var(--k-muted-foreground));
      "
    >
      {children}
    </div>
  );
}

/* ── Selectable item with active-state check ─────────────────
 *  Stops click propagation so DropdownMenuContent's `command="close"`
 *  on the parent <dialog> doesn't auto-dismiss the dropdown — lets
 *  the user flip through theme/density options without re-opening
 *  the menu. (Same trick kinu's `Item.Field` uses.) */
function PickerItem({
  active,
  onClick,
  primary,
  secondary,
  ...rest
}: {
  active: boolean;
  onClick: () => void;
  primary: ComponentChildren;
  secondary?: ComponentChildren;
} & {[key: string]: unknown}) {
  const handle = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <DropdownMenuItem onClick={handle} aria-pressed={active} {...rest}>
      <span style="display:flex; align-items:center; gap:.5rem; flex:1;">
        <iconify-icon
          icon={active ? 'lucide:check' : 'lucide:dot'}
          style={`opacity:${active ? 1 : 0}; flex-shrink:0;`}
        />
        <span style="display:flex; flex-direction:column; flex:1; min-width:0;">
          <span>{primary}</span>
          {secondary && (
            <span style="font-size:.75em; opacity:.6; line-height:1.2;">
              {secondary}
            </span>
          )}
        </span>
      </span>
    </DropdownMenuItem>
  );
}

/* ── Picker ──────────────────────────────────────────────── */
export function ThemePicker() {
  // Start from the empty state the prerender produced (no attributes exist
  // at prerender time) so the first client render matches the prerendered
  // DOM — Preact's hydrate() attaches listeners but does NOT patch attribute
  // diffs, so initializing straight to the live attribute value would leave
  // the baked-in "Default"/"Auto" checkmarks stale until the next render.
  // The effect below syncs to the real attributes after hydration, and that
  // state change triggers the re-render that moves the checkmarks.
  const [theme, setTheme] = useState('');
  const [density, setDensity] = useState('');

  useEffect(() => {
    const sync = () => {
      setTheme(readAttr('data-theme'));
      setDensity(readAttr('data-kinu-density'));
    };
    // Reconcile once post-hydration (the bootstrap script in index.html
    // applied the persisted attributes before paint), then stay in sync if
    // anything else mutates them (devtools, the customizer, etc.).
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-kinu-density'],
    });
    return () => obs.disconnect();
  }, []);

  const chooseTheme = (id: string) => {
    writeAttr('data-theme', id);
    try {
      if (id) localStorage.setItem(THEME_STORAGE_KEY, id);
      else localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {}
  };

  const chooseDensity = (id: string) => {
    writeAttr('data-kinu-density', id);
    try {
      if (id) localStorage.setItem(DENSITY_STORAGE_KEY, id);
      else localStorage.removeItem(DENSITY_STORAGE_KEY);
    } catch {}
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Tooltip title="Theme &amp; density" side="bottom">
            <Button variant="secondary" size="icon" aria-label="Theme picker">
              <iconify-icon icon="lucide:palette" />
            </Button>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent to="left">
          <SectionHeader>Theme</SectionHeader>
          {THEMES.map((t) => (
            <PickerItem
              key={t.id || 'default'}
              active={theme === t.id}
              onClick={() => chooseTheme(t.id)}
              primary={t.name}
            />
          ))}
          <hr />
          <SectionHeader>Density</SectionHeader>
          {DENSITIES.map((d) => (
            <PickerItem
              key={d.id || 'auto'}
              active={density === d.id}
              onClick={() => chooseDensity(d.id)}
              primary={d.name}
              secondary={d.hint}
            />
          ))}
          <hr />
          <DropdownMenuItem
            commandfor={THEME_CUSTOMIZER_DIALOG_ID}
            command="show-modal"
          >
            <span style="display:flex; align-items:center; gap:.5rem;">
              <iconify-icon icon="lucide:sliders-horizontal" style="opacity:.6;" />
              Customize…
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeCustomizer />
    </>
  );
}
