import {useEffect, useState} from 'preact/hooks';
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

interface ThemeOption {
  /** `data-theme` attribute value; empty string = no theme (kinu default look) */
  id: string;
  /** Human-readable name shown in the dropdown */
  name: string;
}

const THEMES: ReadonlyArray<ThemeOption> = [
  {id: '', name: 'Default'},
  {id: 'claw', name: 'Claw'},
];

function readActiveTheme(): string {
  if (typeof document === 'undefined') return '';
  return document.documentElement.getAttribute('data-theme') ?? '';
}

function applyTheme(id: string) {
  if (id) {
    document.documentElement.setAttribute('data-theme', id);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// Restore the persisted theme as early as possible (before paint when bundled
// after the initial CSS, but at worst within the first React render tick).
try {
  if (typeof document !== 'undefined') {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) applyTheme(saved);
  }
} catch {}

export function ThemePicker() {
  const [active, setActive] = useState<string>(() => readActiveTheme());

  // Keep our state in sync if anything else mutates `data-theme`
  // (the customizer's MutationObserver, devtools, another picker, etc.).
  useEffect(() => {
    const obs = new MutationObserver(() => setActive(readActiveTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => obs.disconnect();
  }, []);

  const choose = (id: string) => {
    applyTheme(id);
    try {
      if (id) localStorage.setItem(THEME_STORAGE_KEY, id);
      else localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {}
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Tooltip title="Theme" side="bottom">
            <Button variant="secondary" size="icon" aria-label="Theme picker">
              <iconify-icon icon="lucide:palette" />
            </Button>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent to="left">
          {THEMES.map((t) => (
            <DropdownMenuItem
              key={t.id || 'default'}
              onClick={() => choose(t.id)}
              aria-pressed={active === t.id}
            >
              <span style="display:flex; align-items:center; gap:.5rem; flex:1;">
                <iconify-icon
                  icon={active === t.id ? 'lucide:check' : 'lucide:dot'}
                  style={`opacity:${active === t.id ? 1 : 0};`}
                />
                {t.name}
              </span>
            </DropdownMenuItem>
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
      {/* Dialog rendered alongside so the dropdown item's `commandfor` can
          target it. The dialog has no inline trigger; it's invoked here
          and from anywhere else that knows the id. */}
      <ThemeCustomizer />
    </>
  );
}
