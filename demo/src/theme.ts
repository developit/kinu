import radixThemeCss from './theme-radix.css?inline';

export type DemoTheme = 'default' | 'radix';

const THEME_STORAGE_KEY = 'pui-demo-theme';
const RADIX_STYLE_ID = 'pui-demo-radix-theme';

export function getInitialTheme(): DemoTheme {
  if (typeof window === 'undefined') return 'default';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'radix' ? 'radix' : 'default';
}

export function applyTheme(theme: DemoTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  if (theme === 'radix') {
    ensureRadixThemeStyle();
  } else {
    removeRadixThemeStyle();
  }
}

function ensureRadixThemeStyle() {
  if (document.getElementById(RADIX_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = RADIX_STYLE_ID;
  style.textContent = radixThemeCss;
  document.head.appendChild(style);
}

function removeRadixThemeStyle() {
  document.getElementById(RADIX_STYLE_ID)?.remove();
}
