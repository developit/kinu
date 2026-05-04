import {useEffect, useState} from 'preact/hooks';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Tooltip,
} from 'kinu';

const STORAGE_KEY = 'kinu-density';

interface DensityOption {
  /** `data-kinu-density` attribute value; empty string = no attr (auto/default) */
  id: string;
  /** Human-readable name */
  name: string;
  /** One-line hint shown beside the name */
  hint: string;
}

const DENSITIES: ReadonlyArray<DensityOption> = [
  {id: '', name: 'Auto', hint: 'md on desktop, lg on touch'},
  {id: 'sm', name: 'Compact', hint: 'denser power-user UI'},
  {id: 'md', name: 'Default', hint: 'comfortable desktop'},
  {id: 'lg', name: 'Spacious', hint: 'touch-friendly everywhere'},
];

function readActive(): string {
  if (typeof document === 'undefined') return '';
  return document.documentElement.getAttribute('data-kinu-density') ?? '';
}

function apply(id: string) {
  if (id) {
    document.documentElement.setAttribute('data-kinu-density', id);
  } else {
    document.documentElement.removeAttribute('data-kinu-density');
  }
}

// Restore the persisted choice (the inline script in index.html primes
// this before paint; this just keeps things in sync if the script is
// missing for any reason).
try {
  if (typeof document !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) apply(saved);
  }
} catch {}

export function DensityPicker() {
  const [active, setActive] = useState<string>(() => readActive());

  // Stay in sync with external mutations (devtools, other code).
  useEffect(() => {
    const obs = new MutationObserver(() => setActive(readActive()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-kinu-density'],
    });
    return () => obs.disconnect();
  }, []);

  const choose = (id: string) => {
    apply(id);
    try {
      if (id) localStorage.setItem(STORAGE_KEY, id);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Tooltip title="Density" side="bottom">
          <Button variant="secondary" size="icon" aria-label="Density picker">
            <iconify-icon icon="lucide:rows-3" />
          </Button>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent to="left">
        {DENSITIES.map((d) => (
          <DropdownMenuItem
            key={d.id || 'auto'}
            onClick={() => choose(d.id)}
            aria-pressed={active === d.id}
          >
            <span style="display:flex; align-items:center; gap:.5rem; flex:1;">
              <iconify-icon
                icon={active === d.id ? 'lucide:check' : 'lucide:dot'}
                style={`opacity:${active === d.id ? 1 : 0};`}
              />
              <span style="display:flex; flex-direction:column; flex:1;">
                <span>{d.name}</span>
                <span style="font-size:.75em; opacity:.6;">{d.hint}</span>
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
