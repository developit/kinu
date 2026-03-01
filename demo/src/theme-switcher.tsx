import {useEffect, useState} from 'preact/hooks';

const DEMO_THEME_KEY = 'pui-demo-theme';

type DemoTheme = 'default' | 'android';

function readInitialTheme(): DemoTheme {
  if (typeof window === 'undefined') return 'default';
  return localStorage.getItem(DEMO_THEME_KEY) === 'android' ? 'android' : 'default';
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<DemoTheme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'android') {
      root.dataset.theme = 'android';
      localStorage.setItem(DEMO_THEME_KEY, 'android');
      return;
    }
    delete root.dataset.theme;
    localStorage.removeItem(DEMO_THEME_KEY);
  }, [theme]);

  return (
    <label class="theme-switcher" for="demo-theme-select">
      <span>Theme</span>
      <select
        id="demo-theme-select"
        value={theme}
        onInput={(event) => {
          const target = event.currentTarget as HTMLSelectElement;
          setTheme(target.value === 'android' ? 'android' : 'default');
        }}
      >
        <option value="default">Default</option>
        <option value="android">Android</option>
      </select>
    </label>
  );
}
