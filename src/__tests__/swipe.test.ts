import {beforeAll, describe, expect, it, vi} from 'vitest';
import {installSwipe} from '../lib/commands';

// installSwipe wires two global listeners and drives a native scroll-snap
// scroller at the open/close edges. There's no DOM environment here, so we mock
// just enough of the platform to exercise the control plane directly.

const handlers: Record<string, (e: unknown) => void> = {};

function makeEvent(target: unknown, newState?: string) {
  return {target, newState, preventDefault: vi.fn()};
}

function offscreen() {
  return {top: 9999, bottom: 99999, left: 9999, right: 99999};
}
function onscreen() {
  return {top: 0, bottom: 100, left: 0, right: 100};
}

function makeScroller(opts: {swipe?: boolean; open?: boolean; panelVisible?: boolean}) {
  const panel = {
    getBoundingClientRect: () => (opts.panelVisible ? onscreen() : offscreen()),
    scrollIntoView: vi.fn(),
  };
  const rail = {scrollIntoView: vi.fn()};
  const el = {
    open: opts.open ?? true,
    // Reflected back through the mocked getComputedStyle below.
    __swipe: opts.swipe ? '1' : '',
    matches: (sel: string) => sel.includes('drawer-content'),
    querySelector: (sel: string) =>
      sel.includes('-panel') ? panel : sel.includes('-rail') ? rail : null,
    close: vi.fn(),
  };
  return {el, panel, rail};
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
  vi.stubGlobal('innerHeight', 800);
  vi.stubGlobal('innerWidth', 400);
  installSwipe();
});

describe('installSwipe control plane', () => {
  it('registers the two edge listeners', () => {
    expect(typeof handlers.beforetoggle).toBe('function');
    expect(typeof handlers.scrollend).toBe('function');
  });

  it('glides the panel in from the rail edge when opening', () => {
    const {el, panel, rail} = makeScroller({swipe: true, panelVisible: false});
    handlers.beforetoggle(makeEvent(el, 'open'));
    // Jump to the closed edge instantly, then animate the panel into view.
    expect(rail.scrollIntoView).toHaveBeenCalledWith({behavior: 'instant'});
    expect(panel.scrollIntoView).toHaveBeenCalledWith({behavior: 'smooth'});
  });

  it('does not intercept close events (closing is always instant)', () => {
    const {el, rail, panel} = makeScroller({swipe: true, panelVisible: true});
    const e = makeEvent(el, 'closed');
    handlers.beforetoggle(e);
    expect(e.preventDefault).not.toHaveBeenCalled();
    expect(rail.scrollIntoView).not.toHaveBeenCalled();
    expect(panel.scrollIntoView).not.toHaveBeenCalled();
  });

  it('closes the dialog when a swipe settles on the rail', () => {
    const {el} = makeScroller({swipe: true, panelVisible: false});
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  it('does not mistake its own entrance scroll for a dismiss', () => {
    const {el} = makeScroller({swipe: true, panelVisible: false});
    // Open first: the entrance scroll briefly parks on the rail (off screen).
    handlers.beforetoggle(makeEvent(el, 'open'));
    handlers.scrollend({target: el}); // the entrance settle — must be ignored
    expect(el.close).not.toHaveBeenCalled();
    // A subsequent real dismiss still closes.
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  it('keeps the dialog open when a swipe settles on the panel', () => {
    const {el} = makeScroller({swipe: true, panelVisible: true});
    handlers.scrollend({target: el});
    expect(el.close).not.toHaveBeenCalled();
  });

  it('ignores dialogs CSS has not put into swipe mode', () => {
    const {el, panel} = makeScroller({swipe: false, panelVisible: false});
    handlers.beforetoggle(makeEvent(el, 'open'));
    handlers.scrollend({target: el});
    expect(panel.scrollIntoView).not.toHaveBeenCalled();
    expect(el.close).not.toHaveBeenCalled();
  });
});
