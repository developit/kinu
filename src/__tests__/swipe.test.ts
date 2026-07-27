import {beforeAll, describe, expect, it, vi} from 'vitest';
import {installSwipe} from '../lib/commands';

const handlers: Record<string, (e: unknown) => void> = {};

function makeEvent(target: unknown, newState?: string) {
  return {target, newState, preventDefault: vi.fn()};
}

function makeDialog(opts: {
  swipe?: string | false;
  open?: boolean;
  scrollTop?: number;
  scrollLeft?: number;
  scrollWidth?: number;
  scrollHeight?: number;
  clientWidth?: number;
  clientHeight?: number;
}) {
  return {
    open: opts.open ?? true,
    scrollTop: opts.scrollTop ?? 0,
    scrollLeft: opts.scrollLeft ?? 0,
    scrollHeight: opts.scrollHeight ?? 1000,
    scrollWidth: opts.scrollWidth ?? 1000,
    clientWidth: opts.clientWidth ?? 390,
    clientHeight: opts.clientHeight ?? 844,
    style: {} as Record<string, string>,
    __swipe: opts.swipe || '',
    matches: () => !!opts.swipe,
    scrollTo: vi.fn(),
    close: vi.fn(),
  };
}

beforeAll(() => {
  vi.stubGlobal('document', {});
  vi.stubGlobal('addEventListener', (type: string, fn: (e: unknown) => void) => {
    handlers[type] = fn;
  });
  vi.stubGlobal('getComputedStyle', (el: {__swipe?: string}) => ({
    getPropertyValue: () => el.__swipe ?? '',
  }));
  vi.stubGlobal('requestAnimationFrame', (cb: (t: number) => void) => {
    cb(0);
    return 0;
  });
  installSwipe();
});

describe('installSwipe control plane', () => {
  it('registers the two edge listeners', () => {
    expect(typeof handlers.beforetoggle).toBe('function');
    expect(typeof handlers.scrollend).toBe('function');
  });

  // --- Vertical (drawer, --swipe: y) ---
  it('drawer: jumps to max scrollTop on open', () => {
    const el = makeDialog({swipe: 'y', scrollHeight: 1200, clientHeight: 800});
    handlers.beforetoggle(makeEvent(el, 'open'));
    expect(el.scrollTop).toBe(400);
  });

  it('drawer: closes when scrollTop settles at 0', () => {
    const el = makeDialog({swipe: 'y', scrollTop: 0});
    handlers.scrollend({target: el});
    expect(el.style.transitionDuration).toBe('0s');
    expect(el.close).toHaveBeenCalled();
  });

  it('drawer: stays open when scrollTop > 0', () => {
    const el = makeDialog({swipe: 'y', scrollTop: 150});
    handlers.scrollend({target: el});
    expect(el.close).not.toHaveBeenCalled();
  });

  // --- Horizontal right panel (sheet, --swipe: x) ---
  it('sheet: jumps to max scrollLeft on open', () => {
    const el = makeDialog({swipe: 'x', scrollWidth: 700, clientWidth: 390});
    handlers.beforetoggle(makeEvent(el, 'open'));
    expect(el.scrollLeft).toBe(310);
  });

  it('sheet: closes when scrollLeft settles at 0', () => {
    const el = makeDialog({swipe: 'x', scrollLeft: 0});
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  it('sheet: stays open when scrollLeft > 0', () => {
    const el = makeDialog({swipe: 'x', scrollLeft: 200});
    handlers.scrollend({target: el});
    expect(el.close).not.toHaveBeenCalled();
  });

  // --- Horizontal left panel (sidebar, --swipe: -x) ---
  it('sidebar: jumps to scrollLeft 0 on open', () => {
    const el = makeDialog({swipe: '-x'});
    handlers.beforetoggle(makeEvent(el, 'open'));
    expect(el.scrollLeft).toBe(0);
  });

  it('sidebar: closes when scrollLeft reaches max', () => {
    const el = makeDialog({swipe: '-x', scrollLeft: 610, scrollWidth: 1000, clientWidth: 390});
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  it('sidebar: stays open when scrollLeft < max', () => {
    const el = makeDialog({swipe: '-x', scrollLeft: 100, scrollWidth: 1000, clientWidth: 390});
    handlers.scrollend({target: el});
    expect(el.close).not.toHaveBeenCalled();
  });

  // --- Rubber-band overscroll (Apple platforms report offsets past the
  // boundary — negative at the start edge, beyond max at the end edge) ---
  it('drawer: closes when a bounce overshoots past scrollTop 0', () => {
    const el = makeDialog({swipe: 'y', scrollTop: -40});
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  it('sheet: closes when a bounce overshoots past scrollLeft 0', () => {
    const el = makeDialog({swipe: 'x', scrollLeft: -25});
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  it('sidebar: closes when a bounce overshoots past max scrollLeft', () => {
    const el = makeDialog({swipe: '-x', scrollLeft: 650, scrollWidth: 1000, clientWidth: 390});
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  // --- Shared ---
  it('clears the inline exit-suppression on reopen', () => {
    const el = makeDialog({swipe: 'y'});
    el.style.transitionDuration = '0s';
    handlers.beforetoggle(makeEvent(el, 'open'));
    expect(el.style.transitionDuration).toBe('');
  });

  it('ignores dialogs not in swipe mode', () => {
    const el = makeDialog({swipe: false, scrollTop: 0});
    handlers.beforetoggle(makeEvent(el, 'open'));
    handlers.scrollend({target: el});
    expect(el.scrollTo).not.toHaveBeenCalled();
    expect(el.close).not.toHaveBeenCalled();
  });
});

// Safari shipped scrollend in 26.2; older WebKit needs plain scroll to stand in
// for it, since every dismiss position is a scroll boundary. These load the
// module fresh because installSwipe self-guards against double installation.
describe('scrollend fallback gate', () => {
  async function installWith(hasScrollend: boolean) {
    const seen: string[] = [];
    vi.resetModules();
    vi.stubGlobal('document', hasScrollend ? {onscrollend: null} : {});
    vi.stubGlobal('addEventListener', (type: string) => void seen.push(type));
    const mod = await import('../lib/commands');
    mod.installSwipe();
    return seen;
  }

  it('adds no scroll listener where scrollend is supported', async () => {
    const seen = await installWith(true);
    expect(seen).toContain('scrollend');
    expect(seen).not.toContain('scroll');
  });

  it('falls back to scroll where scrollend is missing (Safari < 26.2)', async () => {
    const seen = await installWith(false);
    expect(seen).toContain('scrollend');
    expect(seen).toContain('scroll');
  });
});
