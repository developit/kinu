// Global hotkey singleton (CON-4 pattern). One keydown listener matches the
// pressed chord against `[data-hotkey]` elements and clicks the first match,
// which fires its command on the command bus. No per-app keyboard handlers, no
// registry to keep in sync — the DOM is the registry.
let hotkeysInstalled: boolean;

const MOD_ORDER = ['mod', 'alt', 'shift'];

function chordFromEvent(e: KeyboardEvent): string {
  const key = e.key.toLowerCase();
  if (key === 'control' || key === 'meta' || key === 'shift' || key === 'alt') {
    return '';
  }
  const parts: string[] = [];
  // `mod` = ⌘ on Apple, Ctrl elsewhere.
  if (e.metaKey || e.ctrlKey) parts.push('mod');
  if (e.altKey) parts.push('alt');
  if (e.shiftKey) parts.push('shift');
  parts.push(key === ' ' ? 'space' : key);
  return parts.join('+');
}

/**
 * Normalize a `keys` string (e.g. `"Mod+K"`, `"cmd+shift+p"`) into the canonical
 * chord form produced from keyboard events, so registrations match.
 */
export function normalizeChord(keys: string): string {
  const mods = new Set<string>();
  let key = '';
  for (const raw of keys.toLowerCase().split('+')) {
    const token = raw.trim();
    if (['mod', 'cmd', 'ctrl', 'control', 'meta', 'command'].includes(token)) {
      mods.add('mod');
    } else if (token === 'alt' || token === 'option') {
      mods.add('alt');
    } else if (token === 'shift') {
      mods.add('shift');
    } else if (token) {
      key = token;
    }
  }
  const parts = MOD_ORDER.filter((m) => mods.has(m));
  if (key) parts.push(key);
  return parts.join('+');
}

export function installHotkeys() {
  if (hotkeysInstalled) return;
  if (typeof document === 'undefined') return;
  hotkeysInstalled = true;

  addEventListener('keydown', (e) => {
    const chord = chordFromEvent(e);
    if (!chord) return;

    // Bare-key chords are ignored while typing in a field; chords with a
    // modifier (mod/alt) still fire so ⌘K works from anywhere.
    const hasMod = chord.includes('mod') || chord.includes('alt');
    const target = e.target as HTMLElement | null;
    const typing =
      !!target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable);
    if (typing && !hasMod) return;

    const el = document.querySelector<HTMLElement>(
      `[data-hotkey="${chord}"]`,
    );
    if (el) {
      e.preventDefault();
      el.click();
    }
  });
}
