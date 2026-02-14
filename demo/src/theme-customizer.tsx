import {useEffect, useRef} from 'preact/hooks';
import {Dialog, Button, Label, Textarea, toast} from 'pui';

const CUSTOM_THEME_STORAGE_KEY = 'pui-radix-custom-theme';
const CUSTOM_THEME_STYLE_ID = 'pui-radix-custom-style';

function applyCustomTheme(css: string) {
  const existing = document.getElementById(CUSTOM_THEME_STYLE_ID);
  if (existing) existing.remove();
  if (!css.trim()) return;
  const style = document.createElement('style');
  style.id = CUSTOM_THEME_STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

export function ThemeCustomizer() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load saved custom theme CSS on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
      if (saved) applyCustomTheme(saved);
    } catch {}
  }, []);

  const handleApply = () => {
    const css = textareaRef.current?.value ?? '';
    try {
      localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, css);
      applyCustomTheme(css);
      toast.show('Custom theme applied', {title: 'Success'});
    } catch {
      toast.show('Failed to apply theme', {title: 'Error'});
    }
  };

  const handleClear = () => {
    if (textareaRef.current) textareaRef.current.value = '';
    try {
      localStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
    } catch {}
    const existing = document.getElementById(CUSTOM_THEME_STYLE_ID);
    if (existing) existing.remove();
    toast.show('Custom theme cleared', {title: 'Success'});
  };

  // Pre-fill textarea when dialog opens
  const handleDialogOpen = () => {
    try {
      const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
      if (saved && textareaRef.current) textareaRef.current.value = saved;
    } catch {}
  };

  return (
    <Dialog>
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="sm"
          title="Customize Radix theme colors and tokens"
          onClick={handleDialogOpen}
        >
          <iconify-icon icon="lucide:palette" />
          Customize
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <h2 style={{margin: 0, fontSize: '1.25rem', fontWeight: 600}}>
              Custom Radix Theme
            </h2>
            <p
              style={{
                margin: '0.5rem 0 0',
                color: 'hsl(var(--p-muted-foreground))',
                fontSize: '0.875rem',
              }}
            >
              Paste CSS from the{' '}
              <a
                href="https://www.radix-ui.com/themes/playground"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'hsl(var(--p-primary))',
                  textDecoration: 'underline',
                }}
              >
                Radix Themes Playground
              </a>{' '}
              to customize colors, radius, spacing, and more.
            </p>
          </div>

          <div
            style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}
          >
            <Label for="custom-css">Custom CSS</Label>
            <Textarea
              ref={textareaRef}
              id="custom-css"
              placeholder={`:root {
  --p-primary: 262 83% 58%;
  --p-radius: 0.75rem;
  /* override any --p-* token */
}`}
              style={{
                minHeight: '300px',
                fontFamily: 'monospace',
                fontSize: '0.8125rem',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="outline" onClick={handleClear}>
              Clear
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
