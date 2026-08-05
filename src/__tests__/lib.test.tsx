import {describe, expect, it} from 'vitest';
import {normalizeChord} from '../lib/hotkeys';
import {transition} from '../lib/motion';

describe('lib helpers', () => {
  it('normalizeChord canonicalizes modifiers and order', () => {
    expect(normalizeChord('Mod+K')).toBe('mod+k');
    expect(normalizeChord('cmd+shift+p')).toBe('mod+shift+p');
    expect(normalizeChord('ctrl+alt+s')).toBe('mod+alt+s');
    expect(normalizeChord('shift+mod+a')).toBe('mod+shift+a');
  });

  it('transition runs the callback synchronously when unsupported', () => {
    let ran = false;
    transition(() => {
      ran = true;
    });
    expect(ran).toBe(true);
  });
});
