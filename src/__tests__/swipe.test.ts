import {beforeAll, describe, expect, it, vi} from 'vitest';
import {installSwipe} from '../lib/commands';

const handlers: Record<string, (e: unknown) => void> = {};

function makeEvent(target: unknown, newState?: string) {
  return {target, newState, preventDefault: vi.fn()};
}

function makeDialog(opts: {swipe?: boolean; open?: boolean; scrollTop?: number}) {
  return {
    open: opts.open ?? true,
    scrollTop: opts.scrollTop ?? 0,
    scrollHeight: 1000,
    __swipe: opts.swipe ? '1' : '',
    matches: (sel: string) => sel.includes('drawer-content'),
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

  it('scrolls to the bottom of the dialog on open', () => {
    const el = makeDialog({swipe: true});
    handlers.beforetoggle(makeEvent(el, 'open'));
    expect(el.scrollTo).toHaveBeenCalledWith({top: 1000, behavior: 'smooth'});
  });

  it('does not scroll on close events', () => {
    const el = makeDialog({swipe: true});
    handlers.beforetoggle(makeEvent(el, 'closed'));
    expect(el.scrollTo).not.toHaveBeenCalled();
  });

  it('closes the dialog when scrollend settles at scrollTop 0', () => {
    const el = makeDialog({swipe: true, scrollTop: 0});
    handlers.scrollend({target: el});
    expect(el.close).toHaveBeenCalled();
  });

  it('keeps the dialog open when scrollend settles with scrollTop > 0', () => {
    const el = makeDialog({swipe: true, scrollTop: 150});
    handlers.scrollend({target: el});
    expect(el.close).not.toHaveBeenCalled();
  });

  it('ignores dialogs CSS has not put into swipe mode', () => {
    const el = makeDialog({swipe: false, scrollTop: 0});
    handlers.beforetoggle(makeEvent(el, 'open'));
    handlers.scrollend({target: el});
    expect(el.scrollTo).not.toHaveBeenCalled();
    expect(el.close).not.toHaveBeenCalled();
  });
});
