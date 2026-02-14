import {useState, useEffect} from 'preact/hooks';
import {
  Dialog,
  Button,
  Label,
  Textarea,
  toast,
} from 'pui';

const CUSTOM_THEME_STORAGE_KEY = 'pui-radix-custom-theme';
const CUSTOM_THEME_STYLE_ID = 'pui-radix-custom-style';

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [cssInput, setCssInput] = useState('');

  // Load saved custom theme CSS on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
      if (saved) {
        setCssInput(saved);
        applyCustomTheme(saved);
      }
    } catch {}
  }, []);

  const applyCustomTheme = (css: string) => {
    // Remove existing custom style if any
    const existing = document.getElementById(CUSTOM_THEME_STYLE_ID);
    if (existing) {
      existing.remove();
    }

    if (!css.trim()) return;

    // Create new style element with custom CSS
    const style = document.createElement('style');
    style.id = CUSTOM_THEME_STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  };

  const handleApply = () => {
    try {
      // Save to localStorage
      localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, cssInput);

      // Apply the CSS
      applyCustomTheme(cssInput);

      toast.show('Custom theme applied', {title: 'Success'});
      setOpen(false);
    } catch (error) {
      toast.show('Failed to apply theme', {title: 'Error'});
    }
  };

  const handleClear = () => {
    setCssInput('');
    try {
      localStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
    } catch {}

    const existing = document.getElementById(CUSTOM_THEME_STYLE_ID);
    if (existing) {
      existing.remove();
    }

    toast.show('Custom theme cleared', {title: 'Success'});
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        title="Customize Radix theme colors and tokens"
      >
        <iconify-icon icon="lucide:palette" />
        Customize
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div>
              <h2 style={{margin: 0, fontSize: '1.25rem', fontWeight: 600}}>
                Custom Radix Theme
              </h2>
              <p style={{margin: '0.5rem 0 0', color: 'hsl(var(--p-muted-foreground))', fontSize: '0.875rem'}}>
                Paste CSS from the{' '}
                <a
                  href="https://www.radix-ui.com/themes/playground"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{color: 'hsl(var(--p-primary))', textDecoration: 'underline'}}
                >
                  Radix Themes Playground
                </a>
                {' '}to customize colors, radius, spacing, and more.
              </p>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <Label for="custom-css">Custom CSS</Label>
              <Textarea
                id="custom-css"
                value={cssInput}
                onInput={(e) => setCssInput((e.target as HTMLTextAreaElement).value)}
                placeholder=":root, .radix-themes {
  --accent-9: 206 100% 50%;
  --gray-12: 206 6% 10%;
  --radius-1: 4px;
  /* ... */
}"
                style={{minHeight: '300px', fontFamily: 'monospace', fontSize: '0.8125rem'}}
              />
            </div>

            <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
