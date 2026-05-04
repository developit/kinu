import {useEffect, useState} from 'preact/hooks';
import {Button, Tooltip} from 'kinu';

const STORAGE_KEY = 'kinu-claude-code-theme';

function isOn() {
  return document.documentElement.getAttribute('data-theme') === 'claude-code';
}

function apply(on: boolean) {
  if (on) {
    document.documentElement.setAttribute('data-theme', 'claude-code');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// Restore on load (before paint when possible).
try {
  if (typeof document !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
    apply(true);
  }
} catch {}

export function ClaudeCodeToggle() {
  const [on, setOn] = useState<boolean>(() =>
    typeof document === 'undefined' ? false : isOn(),
  );

  useEffect(() => {
    apply(on);
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch {}
  }, [on]);

  return (
    <Tooltip title={on ? 'Disable Claude Code theme' : 'Apply Claude Code theme'} side="bottom">
      <Button
        variant={on ? null : 'secondary'}
        size="icon"
        aria-label="Toggle Claude Code theme"
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
      >
        <iconify-icon icon={on ? 'lucide:sparkles' : 'lucide:terminal'} />
      </Button>
    </Tooltip>
  );
}
