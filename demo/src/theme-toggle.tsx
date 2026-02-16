import {useState, useEffect} from 'preact/hooks';

// Import the Radix theme CSS as a URL so we can toggle it dynamically
import radixThemeUrl from 'pui-theme-radix/src/index.css?url';

const STORAGE_KEY = 'pui-theme';
const LINK_ID = 'pui-theme-radix-link';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'default' | 'radix'>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as 'default' | 'radix') || 'default';
    } catch {
      return 'default';
    }
  });

  useEffect(() => {
    let link = document.getElementById(LINK_ID) as HTMLLinkElement | null;

    if (theme === 'radix') {
      if (!link) {
        link = document.createElement('link');
        link.id = LINK_ID;
        link.rel = 'stylesheet';
        link.href = radixThemeUrl;
        document.head.appendChild(link);
      }
    } else {
      link?.remove();
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'default' ? 'radix' : 'default'));

  return (
    <button
      type="button"
      onClick={toggle}
      class="theme-toggle"
      title={`Theme: ${theme === 'default' ? 'PUI Default' : 'Radix'} (click to switch)`}
    >
      <span class="theme-toggle-indicator" data-active={theme === 'radix' || undefined}>
        {theme === 'radix' ? 'Radix' : 'Default'}
      </span>
    </button>
  );
}
