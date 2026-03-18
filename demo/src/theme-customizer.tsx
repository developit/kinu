import {useEffect, useState} from 'preact/hooks';
import {Dialog, Button, Label, toast, Collapsible, Tooltip} from 'kinu';

const CUSTOM_THEME_STORAGE_KEY = 'kinu-custom-theme';
const CUSTOM_THEME_STYLE_ID = 'kinu-custom-style';

/* ── hex→HSL helper ───────────────────────────────────────── */
function hexToHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
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
  light: {step3: string; step8: string; step9: string; step10: string; step11: string};
  dark: {step3: string; step9: string; step10: string; step11: string; step12: string};
  /** true if step-9 needs dark text (light bg accent like amber/yellow) */
  darkContrast?: boolean;
}

const ACCENT_COLORS: Record<string, AccentData> = {
  tomato: {light: {step3: '#feebe7', step8: '#ec8e7b', step9: '#e54d2e', step10: '#dd4425', step11: '#d13415'}, dark: {step3: '#391714', step9: '#e54d2e', step10: '#ec6142', step11: '#ff977d', step12: '#fbd3cb'}},
  red: {light: {step3: '#feebec', step8: '#eb8e90', step9: '#e5484d', step10: '#dc3e42', step11: '#ce2c31'}, dark: {step3: '#3b1219', step9: '#e5484d', step10: '#ec5d5e', step11: '#ff9592', step12: '#ffd1d9'}},
  ruby: {light: {step3: '#feeaed', step8: '#e592a3', step9: '#e54666', step10: '#dc3b5d', step11: '#ca244d'}, dark: {step3: '#3a141e', step9: '#e54666', step10: '#ec5a72', step11: '#ff949d', step12: '#fed2e1'}},
  crimson: {light: {step3: '#ffe9f0', step8: '#e093b2', step9: '#e93d82', step10: '#df3478', step11: '#cb1d63'}, dark: {step3: '#381525', step9: '#e93d82', step10: '#ee518a', step11: '#ff92ad', step12: '#fdd3e8'}},
  pink: {light: {step3: '#fee9f5', step8: '#dd93c2', step9: '#d6409f', step10: '#cf3897', step11: '#c2298a'}, dark: {step3: '#37172f', step9: '#d6409f', step10: '#de51a8', step11: '#ff8dcc', step12: '#fdd1ea'}},
  plum: {light: {step3: '#fbebfb', step8: '#cf91d8', step9: '#ab4aba', step10: '#a144af', step11: '#953ea3'}, dark: {step3: '#351a35', step9: '#ab4aba', step10: '#b658c4', step11: '#e796f3', step12: '#f4d4f4'}},
  purple: {light: {step3: '#f7edfe', step8: '#be93e4', step9: '#8e4ec6', step10: '#8347b9', step11: '#8145b5'}, dark: {step3: '#301c3b', step9: '#8e4ec6', step10: '#9a5cd0', step11: '#d19dff', step12: '#ecd9fa'}},
  violet: {light: {step3: '#f4f0fe', step8: '#aa99ec', step9: '#6e56cf', step10: '#654dc4', step11: '#6550b9'}, dark: {step3: '#291f43', step9: '#6e56cf', step10: '#7d66d9', step11: '#baa7ff', step12: '#e2ddfe'}},
  iris: {light: {step3: '#f0f1fe', step8: '#9b9ef0', step9: '#5b5bd6', step10: '#5151cd', step11: '#5753c6'}, dark: {step3: '#202248', step9: '#5b5bd6', step10: '#6e6ade', step11: '#b1a9ff', step12: '#e0dffe'}},
  indigo: {light: {step3: '#edf2fe', step8: '#8da4ef', step9: '#3e63dd', step10: '#3358d4', step11: '#3a5bc7'}, dark: {step3: '#182449', step9: '#3e63dd', step10: '#5472e4', step11: '#9eb1ff', step12: '#d6e1ff'}},
  blue: {light: {step3: '#e6f4fe', step8: '#5eb1ef', step9: '#0090ff', step10: '#0588f0', step11: '#0d74ce'}, dark: {step3: '#0d2847', step9: '#0090ff', step10: '#3b9eff', step11: '#70b8ff', step12: '#c2e6ff'}},
  cyan: {light: {step3: '#def7f9', step8: '#3db9cf', step9: '#00a2c7', step10: '#0797b9', step11: '#107d98'}, dark: {step3: '#082c36', step9: '#00a2c7', step10: '#23afd0', step11: '#4ccce6', step12: '#b6ecf7'}},
  teal: {light: {step3: '#e0f8f3', step8: '#53b9ab', step9: '#12a594', step10: '#0d9b8a', step11: '#008573'}, dark: {step3: '#0d2d2a', step9: '#12a594', step10: '#0eb39e', step11: '#0bd8b6', step12: '#adf0dd'}},
  jade: {light: {step3: '#e6f7ed', step8: '#56ba9f', step9: '#29a383', step10: '#26997b', step11: '#208368'}, dark: {step3: '#0f2e22', step9: '#29a383', step10: '#27b08b', step11: '#1fd8a4', step12: '#adf0d4'}},
  green: {light: {step3: '#e6f6eb', step8: '#5bb98b', step9: '#30a46c', step10: '#2b9a66', step11: '#218358'}, dark: {step3: '#132d21', step9: '#30a46c', step10: '#33b074', step11: '#3dd68c', step12: '#b1f1cb'}},
  grass: {light: {step3: '#e9f6e9', step8: '#65ba74', step9: '#46a758', step10: '#3e9b4f', step11: '#2a7e3b'}, dark: {step3: '#1b2a1e', step9: '#46a758', step10: '#53b365', step11: '#71d083', step12: '#c2f0c2'}},
  orange: {light: {step3: '#ffefd6', step8: '#ec9455', step9: '#f76b15', step10: '#ef5f00', step11: '#cc4e00'}, dark: {step3: '#331e0b', step9: '#f76b15', step10: '#ff801f', step11: '#ffa057', step12: '#ffe0c2'}},
  amber: {light: {step3: '#fff7c2', step8: '#e2a336', step9: '#ffc53d', step10: '#ffba18', step11: '#ab6400'}, dark: {step3: '#302008', step9: '#ffc53d', step10: '#ffd60a', step11: '#ffca16', step12: '#ffe7b3'}, darkContrast: true},
  yellow: {light: {step3: '#fffab8', step8: '#d5ae39', step9: '#ffe629', step10: '#ffdc00', step11: '#9e6c00'}, dark: {step3: '#2d2305', step9: '#ffe629', step10: '#ffff57', step11: '#f5e147', step12: '#f6eeb4'}, darkContrast: true},
  lime: {light: {step3: '#eef6d6', step8: '#8db654', step9: '#bdee63', step10: '#b0e64c', step11: '#5c7c2f'}, dark: {step3: '#1f2917', step9: '#bdee63', step10: '#d4ff70', step11: '#bde56c', step12: '#e3f7ba'}, darkContrast: true},
  mint: {light: {step3: '#ddf9f2', step8: '#4cbba5', step9: '#86ead4', step10: '#7de0cb', step11: '#027864'}, dark: {step3: '#092c2b', step9: '#86ead4', step10: '#a8f5e5', step11: '#58d5ba', step12: '#c4f5e1'}, darkContrast: true},
  sky: {light: {step3: '#e1f6fd', step8: '#60b3d7', step9: '#7ce2fe', step10: '#74daf8', step11: '#00749e'}, dark: {step3: '#112840', step9: '#7ce2fe', step10: '#a8eeff', step11: '#75c7f0', step12: '#c2f3ff'}, darkContrast: true},
  bronze: {light: {step3: '#f6edea', step8: '#c2a499', step9: '#a18072', step10: '#957468', step11: '#7d5e54'}, dark: {step3: '#262220', step9: '#a18072', step10: '#ae8c7e', step11: '#d4b3a5', step12: '#ede0d9'}},
  gold: {light: {step3: '#f2f0e7', step8: '#b9a88d', step9: '#978365', step10: '#8c7a5e', step11: '#71624b'}, dark: {step3: '#24231f', step9: '#978365', step10: '#a39073', step11: '#cbb99f', step12: '#e8e2d9'}},
  brown: {light: {step3: '#f6eee7', step8: '#cea37e', step9: '#ad7f58', step10: '#a07553', step11: '#815e46'}, dark: {step3: '#28211d', step9: '#ad7f58', step10: '#b88c67', step11: '#dbb594', step12: '#f2e1ca'}},
};

const ACCENT_NAMES = Object.keys(ACCENT_COLORS);

const GRAY_COLORS: Record<string, {light: {step1: string; step3: string; step6: string; step11: string; step12: string}; dark: {step1: string; step3: string; step6: string; step11: string; step12: string}}> = {
  gray: {light: {step1: '#fcfcfc', step3: '#f0f0f0', step6: '#d9d9d9', step11: '#646464', step12: '#202020'}, dark: {step1: '#111111', step3: '#222222', step6: '#3a3a3a', step11: '#b4b4b4', step12: '#eeeeee'}},
  mauve: {light: {step1: '#fdfcfd', step3: '#f1eef1', step6: '#d9d5dc', step11: '#645f6b', step12: '#211f26'}, dark: {step1: '#121113', step3: '#232225', step6: '#3c393f', step11: '#b5b2bc', step12: '#eeeef0'}},
  slate: {light: {step1: '#fcfcfd', step3: '#eef0f3', step6: '#d3d8e0', step11: '#5b6373', step12: '#1a2030'}, dark: {step1: '#111113', step3: '#212225', step6: '#363a3f', step11: '#b0b4ba', step12: '#edeef0'}},
  sage: {light: {step1: '#fbfdfc', step3: '#eff1f0', step6: '#d4dad7', step11: '#5f6563', step12: '#1a211e'}, dark: {step1: '#101211', step3: '#202221', step6: '#373b39', step11: '#adb5b2', step12: '#eceeed'}},
  olive: {light: {step1: '#fcfdfc', step3: '#eff1ef', step6: '#d5d8d3', step11: '#60655f', step12: '#1d211c'}, dark: {step1: '#111210', step3: '#212220', step6: '#383a36', step11: '#afb5ad', step12: '#eceeec'}},
  sand: {light: {step1: '#fdfdfc', step3: '#f1f0ef', step6: '#d7d5d0', step11: '#63635e', step12: '#21201c'}, dark: {step1: '#111110', step3: '#222221', step6: '#3b3a37', step11: '#b5b3ad', step12: '#eeeeec'}},
};

const GRAY_NAMES = Object.keys(GRAY_COLORS);

const RADIUS_MAP: Record<string, string> = {
  none: '0',
  small: '0.25rem',
  medium: '0.5rem',
  large: '0.75rem',
  full: '2rem',
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

  const fgLight = accent.darkContrast ? '0 0% 0%' : '0 0% 100%';
  const fgDark = '0 0% 0%'; // dark mode always uses dark text on light accent
  const radius = RADIUS_MAP[settings.radius] ?? '0.5rem';
  const scale = parseInt(settings.scaling) / 100;

  const lines = [
    '/* Light mode */',
    ':root {',
    `  --k-primary: ${hsl(accent.light.step9)};`,
    `  --k-primary-hover: ${hsl(accent.light.step10)};`,
    `  --k-primary-foreground: ${fgLight};`,
    `  --k-ring: ${hsl(accent.light.step8)};`,
    `  --k-accent: ${hsl(accent.light.step3)};`,
    `  --k-accent-foreground: ${hsl(accent.light.step11)};`,
    `  --k-foreground: ${hsl(gray.light.step12)};`,
    `  --k-card-foreground: ${hsl(gray.light.step12)};`,
    `  --k-popover-foreground: ${hsl(gray.light.step12)};`,
    `  --k-secondary-foreground: ${hsl(gray.light.step12)};`,
    `  --k-muted-foreground: ${hsl(gray.light.step11)};`,
    `  --k-border: ${hsl(gray.light.step6)};`,
    `  --k-input: ${hsl(gray.light.step6)};`,
    `  --k-muted: ${hsl(gray.light.step3)};`,
    `  --k-secondary: ${hsl(gray.light.step3)};`,
    `  --k-background: ${hsl(gray.light.step1)};`,
    `  --k-card: ${hsl(gray.light.step1)};`,
    `  --k-popover: ${hsl(gray.light.step1)};`,
    `  --k-radius: ${radius};`,
  ];

  if (scale !== 1) {
    lines.push(`  font-size: ${scale * 100}%;`);
  }

  lines.push('}');
  lines.push('');

  // Dark mode (automatic)
  lines.push('/* Dark mode (automatic) */');
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push('  :root {');
  lines.push('    color-scheme: dark;');
  lines.push(`    --k-primary: ${hsl(accent.dark.step9)};`);
  lines.push(`    --k-primary-hover: ${hsl(accent.dark.step10)};`);
  lines.push(`    --k-primary-foreground: ${fgDark};`);
  lines.push(`    --k-ring: ${hsl(accent.dark.step9)};`);
  lines.push(`    --k-accent: ${hsl(accent.dark.step3)};`);
  lines.push(`    --k-accent-foreground: ${hsl(accent.dark.step11)};`);
  lines.push(`    --k-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`    --k-card-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`    --k-popover-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`    --k-secondary-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`    --k-muted-foreground: ${hsl(gray.dark.step11)};`);
  lines.push(`    --k-border: ${hsl(gray.dark.step6)};`);
  lines.push(`    --k-input: ${hsl(gray.dark.step6)};`);
  lines.push(`    --k-muted: ${hsl(gray.dark.step3)};`);
  lines.push(`    --k-secondary: ${hsl(gray.dark.step3)};`);
  lines.push(`    --k-background: ${hsl(gray.dark.step1)};`);
  lines.push(`    --k-card: ${hsl(gray.dark.step1)};`);
  lines.push(`    --k-popover: ${hsl(gray.dark.step1)};`);
  lines.push('  }');
  lines.push('}');
  lines.push('');

  // Dark mode (explicit class)
  lines.push('/* Dark mode (explicit) */');
  lines.push('.dark {');
  lines.push('  color-scheme: dark;');
  lines.push(`  --k-primary: ${hsl(accent.dark.step9)};`);
  lines.push(`  --k-primary-hover: ${hsl(accent.dark.step10)};`);
  lines.push(`  --k-primary-foreground: ${fgDark};`);
  lines.push(`  --k-ring: ${hsl(accent.dark.step9)};`);
  lines.push(`  --k-accent: ${hsl(accent.dark.step3)};`);
  lines.push(`  --k-accent-foreground: ${hsl(accent.dark.step11)};`);
  lines.push(`  --k-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`  --k-card-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`  --k-popover-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`  --k-secondary-foreground: ${hsl(gray.dark.step12)};`);
  lines.push(`  --k-muted-foreground: ${hsl(gray.dark.step11)};`);
  lines.push(`  --k-border: ${hsl(gray.dark.step6)};`);
  lines.push(`  --k-input: ${hsl(gray.dark.step6)};`);
  lines.push(`  --k-muted: ${hsl(gray.dark.step3)};`);
  lines.push(`  --k-secondary: ${hsl(gray.dark.step3)};`);
  lines.push(`  --k-background: ${hsl(gray.dark.step1)};`);
  lines.push(`  --k-card: ${hsl(gray.dark.step1)};`);
  lines.push(`  --k-popover: ${hsl(gray.dark.step1)};`);
  lines.push('}');

  return lines.join('\n');
}

/* ── Parse Radix <Theme> JSX ──────────────────────────────── */
/*
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
  */

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

try {
  const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
  if (saved) applyCustomTheme(saved);
} catch {}

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
        border: selected ? '2px solid hsl(var(--k-foreground))' : '2px solid transparent',
        outline: selected ? '2px solid hsl(var(--k-background))' : 'none',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
      }}
    />
  );
}

/* ── Main component ───────────────────────────────────────── */
export function ThemeCustomizer() {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY + '-settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {accentColor: 'blue', grayColor: 'slate', radius: 'medium', scaling: '100%'};
  });

  // const handlePaste = () => {
  //   const val = pasteRef.current?.value ?? '';
  //   const parsed = parseThemeJSX(val);
  //   if (parsed) {
  //     setSettings((s) => ({...s, ...parsed}));
  //     toast.show('Parsed Radix theme config');
  //     if (pasteRef.current) pasteRef.current.value = '';
  //   } else {
  //     toast.show('Could not parse — paste a <Theme ...> tag', {title: 'Error'});
  //   }
  // };

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
        <Tooltip title="Theme" side="bottom">
          <Button variant="secondary" size="icon">
            <iconify-icon icon="lucide:palette" />
          </Button>
        </Tooltip>
      </Dialog.Trigger>

      <Dialog.Content>
        <div style="display:flex; flex-direction:column; gap:1.5rem">
          <div style="display:flex; align-items:center; justify-content:space-between; margin:-.5rem 0;">
            <h2 style="display:flex; align-items:center; gap:.5rem; margin:0; font-size:1.125rem; font-weight:normal;">
              <iconify-icon icon="lucide:palette" style="opacity:0.5;" />
              Customize Theme
            </h2>
            <Dialog.Close>
              <Button variant="ghost" size="icon">
                <iconify-icon icon="lucide:x" />
              </Button>
            </Dialog.Close>
          </div>

          {/* Accent color */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <Label>
              Accent color: <strong>{settings.accentColor}</strong>
            </Label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.375rem'}}>
              {ACCENT_NAMES.map((name) => (
                <Swatch
                  key={name}
                  color={ACCENT_COLORS[name].light.step9}
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
                  color={GRAY_COLORS[name].light.step11}
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
                  variant={settings.radius === r ? null : 'outline'}
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
                  variant={settings.scaling === s ? null : 'outline'}
                  size="sm"
                  onClick={() => setSettings((prev) => ({...prev, scaling: s}))}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <Collapsible id="theme-css">
            <pre style={{
              fontSize: '0.6875rem',
              fontFamily: 'monospace',
              background: 'hsl(var(--k-muted))',
              borderRadius: 'var(--k-radius)',
              padding: '0.5rem',
              margin: '0.5rem 0 0',
              overflow: 'auto',
              maxHeight: '200px',
            }}>
              {generateCSS(settings)}
            </pre>
          </Collapsible>

          {/* Actions */}
          <div style="display:flex; gap:0.5rem; justifyContent:flex-end;">
            <Button variant="outline" command="--toggle" commandFor="theme-css" style="margin-right:auto;">Generated CSS</Button>
            <Button variant="outline" onClick={handleClear}>
              Reset
            </Button>
            <Dialog.Close>
              <Button onClick={handleApply}>Apply</Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
