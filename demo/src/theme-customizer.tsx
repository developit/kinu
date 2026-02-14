import {useEffect, useRef, useState} from 'preact/hooks';
import {Dialog, Button, Label, Separator, toast} from 'pui';

const CUSTOM_THEME_STORAGE_KEY = 'pui-radix-custom-theme';
const CUSTOM_THEME_STYLE_ID = 'pui-radix-custom-style';

/* ── hex→HSL helper ───────────────────────────────────────── */
function hexToHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 1000) / 10];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [
    Math.round(h * 3600) / 10,
    Math.round(s * 1000) / 10,
    Math.round(l * 1000) / 10,
  ];
}
function hsl(hex: string) {
  const [h, s, l] = hexToHsl(hex);
  return `${h} ${s}% ${l}%`;
}

/* ── Radix accent color data (from @radix-ui/colors step hex values) ─ */
interface AccentData {
  step3: string;
  step8: string;
  step9: string;
  step10: string;
  step11: string;
  /** true if step-9 needs dark text (light bg accent like amber/yellow) */
  darkContrast?: boolean;
}

const ACCENT_COLORS: Record<string, AccentData> = {
  tomato: {step3: '#feebe7', step8: '#ec8e7b', step9: '#e54d2e', step10: '#dd4425', step11: '#d13415'},
  red: {step3: '#feebec', step8: '#eb8e90', step9: '#e5484d', step10: '#dc3e42', step11: '#ce2c31'},
  ruby: {step3: '#feeaed', step8: '#e592a3', step9: '#e54666', step10: '#dc3b5d', step11: '#ca244d'},
  crimson: {step3: '#ffe9f0', step8: '#e093b2', step9: '#e93d82', step10: '#df3478', step11: '#cb1d63'},
  pink: {step3: '#fee9f5', step8: '#dd93c2', step9: '#d6409f', step10: '#cf3897', step11: '#c2298a'},
  plum: {step3: '#fbebfb', step8: '#cf91d8', step9: '#ab4aba', step10: '#a144af', step11: '#953ea3'},
  purple: {step3: '#f7edfe', step8: '#be93e4', step9: '#8e4ec6', step10: '#8347b9', step11: '#8145b5'},
  violet: {step3: '#f4f0fe', step8: '#aa99ec', step9: '#6e56cf', step10: '#654dc4', step11: '#6550b9'},
  iris: {step3: '#f0f1fe', step8: '#9b9ef0', step9: '#5b5bd6', step10: '#5151cd', step11: '#5753c6'},
  indigo: {step3: '#edf2fe', step8: '#8da4ef', step9: '#3e63dd', step10: '#3358d4', step11: '#3a5bc7'},
  blue: {step3: '#e6f4fe', step8: '#5eb1ef', step9: '#0090ff', step10: '#0588f0', step11: '#0d74ce'},
  cyan: {step3: '#def7f9', step8: '#3db9cf', step9: '#00a2c7', step10: '#0797b9', step11: '#107d98'},
  teal: {step3: '#e0f8f3', step8: '#53b9ab', step9: '#12a594', step10: '#0d9b8a', step11: '#008573'},
  jade: {step3: '#e6f7ed', step8: '#56ba9f', step9: '#29a383', step10: '#26997b', step11: '#208368'},
  green: {step3: '#e6f6eb', step8: '#5bb98b', step9: '#30a46c', step10: '#2b9a66', step11: '#218358'},
  grass: {step3: '#e9f6e9', step8: '#65ba74', step9: '#46a758', step10: '#3e9b4f', step11: '#2a7e3b'},
  orange: {step3: '#ffefd6', step8: '#ec9455', step9: '#f76b15', step10: '#ef5f00', step11: '#cc4e00'},
  amber: {step3: '#fff7c2', step8: '#e2a336', step9: '#ffc53d', step10: '#ffba18', step11: '#ab6400', darkContrast: true},
  yellow: {step3: '#fffab8', step8: '#d5ae39', step9: '#ffe629', step10: '#ffdc00', step11: '#9e6c00', darkContrast: true},
  lime: {step3: '#eef6d6', step8: '#8db654', step9: '#bdee63', step10: '#b0e64c', step11: '#5c7c2f', darkContrast: true},
  mint: {step3: '#ddf9f2', step8: '#4cbba5', step9: '#86ead4', step10: '#7de0cb', step11: '#027864', darkContrast: true},
  sky: {step3: '#e1f6fd', step8: '#60b3d7', step9: '#7ce2fe', step10: '#74daf8', step11: '#00749e', darkContrast: true},
  bronze: {step3: '#f6edea', step8: '#c2a499', step9: '#a18072', step10: '#957468', step11: '#7d5e54'},
  gold: {step3: '#f2f0e7', step8: '#b9a88d', step9: '#978365', step10: '#8c7a5e', step11: '#71624b'},
  brown: {step3: '#f6eee7', step8: '#cea37e', step9: '#ad7f58', step10: '#a07553', step11: '#815e46'},
};

const ACCENT_NAMES = Object.keys(ACCENT_COLORS);

const GRAY_COLORS: Record<string, {step1: string; step3: string; step6: string; step11: string; step12: string}> = {
  gray: {step1: '#fcfcfc', step3: '#f0f0f0', step6: '#d9d9d9', step11: '#646464', step12: '#202020'},
  mauve: {step1: '#fdfcfd', step3: '#f1eef1', step6: '#d9d5dc', step11: '#645f6b', step12: '#211f26'},
  slate: {step1: '#fcfcfd', step3: '#eef0f3', step6: '#d3d8e0', step11: '#5b6373', step12: '#1a2030'},
  sage: {step1: '#fbfdfc', step3: '#eff1f0', step6: '#d4dad7', step11: '#5f6563', step12: '#1a211e'},
  olive: {step1: '#fcfdfc', step3: '#eff1ef', step6: '#d5d8d3', step11: '#60655f', step12: '#1d211c'},
  sand: {step1: '#fdfdfc', step3: '#f1f0ef', step6: '#d7d5d0', step11: '#63635e', step12: '#21201c'},
};

const GRAY_NAMES = Object.keys(GRAY_COLORS);

const RADIUS_MAP: Record<string, string> = {
  none: '0',
  small: '0.25rem',
  medium: '0.5rem',
  large: '0.75rem',
  full: '9999px',
};

const SCALING_OPTIONS = ['90%', '95%', '100%', '105%', '110%'];

/* ── Generate CSS from settings ────────────────────────────── */
interface ThemeSettings {
  accentColor: string;
  grayColor: string;
  radius: string;
  scaling: string;
}

function generateCSS(settings: ThemeSettings): string {
  const accent = ACCENT_COLORS[settings.accentColor];
  const gray = GRAY_COLORS[settings.grayColor];
  if (!accent || !gray) return '';

  const fg = accent.darkContrast ? '0 0% 0%' : '0 0% 100%';
  const radius = RADIUS_MAP[settings.radius] ?? '0.5rem';
  const scale = parseInt(settings.scaling) / 100;

  const lines = [
    ':root {',
    `  --p-primary: ${hsl(accent.step9)};`,
    `  --p-primary-hover: ${hsl(accent.step10)};`,
    `  --p-primary-foreground: ${fg};`,
    `  --p-ring: ${hsl(accent.step8)};`,
    `  --p-accent: ${hsl(accent.step3)};`,
    `  --p-accent-foreground: ${hsl(accent.step11)};`,
    `  --p-foreground: ${hsl(gray.step12)};`,
    `  --p-card-foreground: ${hsl(gray.step12)};`,
    `  --p-popover-foreground: ${hsl(gray.step12)};`,
    `  --p-secondary-foreground: ${hsl(gray.step12)};`,
    `  --p-muted-foreground: ${hsl(gray.step11)};`,
    `  --p-border: ${hsl(gray.step6)};`,
    `  --p-input: ${hsl(gray.step6)};`,
    `  --p-muted: ${hsl(gray.step3)};`,
    `  --p-secondary: ${hsl(gray.step3)};`,
    `  --p-background: ${hsl(gray.step1)};`,
    `  --p-card: ${hsl(gray.step1)};`,
    `  --p-popover: ${hsl(gray.step1)};`,
    `  --p-radius: ${radius};`,
  ];

  if (scale !== 1) {
    lines.push(`  font-size: ${scale * 100}%;`);
  }

  lines.push('}');
  return lines.join('\n');
}

/* ── Parse Radix <Theme> JSX ──────────────────────────────── */
function parseThemeJSX(input: string): Partial<ThemeSettings> | null {
  // Match <Theme ... > with any attributes
  const m = input.match(/<Theme\s+([^>]+)>/);
  if (!m) return null;
  const attrs = m[1];
  const result: Partial<ThemeSettings> = {};

  const accentMatch = attrs.match(/accentColor="([^"]+)"/);
  if (accentMatch) result.accentColor = accentMatch[1];

  const grayMatch = attrs.match(/grayColor="([^"]+)"/);
  if (grayMatch) result.grayColor = grayMatch[1];

  const radiusMatch = attrs.match(/radius="([^"]+)"/);
  if (radiusMatch) result.radius = radiusMatch[1];

  const scalingMatch = attrs.match(/scaling="([^"]+)"/);
  if (scalingMatch) result.scaling = scalingMatch[1];

  return Object.keys(result).length ? result : null;
}

/* ── apply/remove style element ───────────────────────────── */
function applyCustomTheme(css: string) {
  const existing = document.getElementById(CUSTOM_THEME_STYLE_ID);
  if (existing) existing.remove();
  if (!css.trim()) return;
  const style = document.createElement('style');
  style.id = CUSTOM_THEME_STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

/* ── Color swatch ─────────────────────────────────────────── */
function Swatch({color, selected, onClick, label}: {
  color: string;
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      style={{
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%',
        backgroundColor: color,
        border: selected ? '2px solid hsl(var(--p-foreground))' : '2px solid transparent',
        outline: selected ? '2px solid hsl(var(--p-background))' : 'none',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
      }}
    />
  );
}

/* ── Main component ───────────────────────────────────────── */
export function ThemeCustomizer() {
  const pasteRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY + '-settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {accentColor: 'blue', grayColor: 'slate', radius: 'medium', scaling: '100%'};
  });

  // Apply saved theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
      if (saved) applyCustomTheme(saved);
    } catch {}
  }, []);

  const handlePaste = () => {
    const val = pasteRef.current?.value ?? '';
    const parsed = parseThemeJSX(val);
    if (parsed) {
      setSettings((s) => ({...s, ...parsed}));
      toast.show('Parsed Radix theme config');
      if (pasteRef.current) pasteRef.current.value = '';
    } else {
      toast.show('Could not parse — paste a <Theme ...> tag', {title: 'Error'});
    }
  };

  const handleApply = () => {
    const css = generateCSS(settings);
    try {
      localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, css);
      localStorage.setItem(CUSTOM_THEME_STORAGE_KEY + '-settings', JSON.stringify(settings));
    } catch {}
    applyCustomTheme(css);
    toast.show('Theme applied');
  };

  const handleClear = () => {
    try {
      localStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
      localStorage.removeItem(CUSTOM_THEME_STORAGE_KEY + '-settings');
    } catch {}
    applyCustomTheme('');
    setSettings({accentColor: 'blue', grayColor: 'slate', radius: 'medium', scaling: '100%'});
    toast.show('Theme reset to defaults');
  };

  return (
    <Dialog>
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="sm"
          title="Customize Radix theme"
        >
          <iconify-icon icon="lucide:palette" />
          Customize
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <h2 style={{margin: 0, fontSize: '1.125rem', fontWeight: 600}}>
              Customize Radix Theme
            </h2>
            <p style={{margin: '0.25rem 0 0', color: 'hsl(var(--p-muted-foreground))', fontSize: '0.8125rem'}}>
              Pick colors and settings, or paste a{' '}
              <code style={{fontSize: '0.75rem'}}>&lt;Theme&gt;</code> tag from the{' '}
              <a
                href="https://www.radix-ui.com/themes/playground"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: 'hsl(var(--p-primary))'}}
              >
                Radix Playground
              </a>.
            </p>
          </div>

          {/* Paste input */}
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <input
              ref={pasteRef}
              type="text"
              p="input"
              placeholder={'<Theme accentColor="violet" grayColor="sage" ...>'}
              style={{flex: 1, fontFamily: 'monospace', fontSize: '0.75rem'}}
            />
            <Button variant="outline" size="sm" onClick={handlePaste}>
              Parse
            </Button>
          </div>

          <Separator />

          {/* Accent color */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <Label>
              Accent color: <strong>{settings.accentColor}</strong>
            </Label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.375rem'}}>
              {ACCENT_NAMES.map((name) => (
                <Swatch
                  key={name}
                  color={ACCENT_COLORS[name].step9}
                  selected={settings.accentColor === name}
                  onClick={() => setSettings((s) => ({...s, accentColor: name}))}
                  label={name}
                />
              ))}
            </div>
          </div>

          {/* Gray color */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <Label>
              Gray: <strong>{settings.grayColor}</strong>
            </Label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.375rem'}}>
              {GRAY_NAMES.map((name) => (
                <Swatch
                  key={name}
                  color={GRAY_COLORS[name].step9 ?? GRAY_COLORS[name].step11}
                  selected={settings.grayColor === name}
                  onClick={() => setSettings((s) => ({...s, grayColor: name}))}
                  label={name}
                />
              ))}
            </div>
          </div>

          {/* Radius */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <Label>Radius</Label>
            <div style={{display: 'flex', gap: '0.375rem', flexWrap: 'wrap'}}>
              {Object.keys(RADIUS_MAP).map((r) => (
                <Button
                  key={r}
                  variant={settings.radius === r ? 'solid' : 'outline'}
                  size="sm"
                  onClick={() => setSettings((s) => ({...s, radius: r}))}
                  style={{
                    borderRadius:
                      r === 'full'
                        ? '9999px'
                        : r === 'none'
                          ? '0'
                          : undefined,
                  }}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          {/* Scaling */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <Label>Scaling</Label>
            <div style={{display: 'flex', gap: '0.375rem', flexWrap: 'wrap'}}>
              {SCALING_OPTIONS.map((s) => (
                <Button
                  key={s}
                  variant={settings.scaling === s ? 'solid' : 'outline'}
                  size="sm"
                  onClick={() => setSettings((prev) => ({...prev, scaling: s}))}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Preview */}
          <details>
            <summary style={{cursor: 'pointer', fontSize: '0.8125rem', color: 'hsl(var(--p-muted-foreground))'}}>
              Generated CSS
            </summary>
            <pre style={{
              fontSize: '0.6875rem',
              fontFamily: 'monospace',
              background: 'hsl(var(--p-muted))',
              borderRadius: 'var(--p-radius)',
              padding: '0.5rem',
              margin: '0.5rem 0 0',
              overflow: 'auto',
              maxHeight: '200px',
            }}>
              {generateCSS(settings)}
            </pre>
          </details>

          {/* Actions */}
          <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
            <Button variant="outline" onClick={handleClear}>
              Reset
            </Button>
            <Dialog.Close>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleApply}>Apply</Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
