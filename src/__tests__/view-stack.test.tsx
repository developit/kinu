// @vitest-environment jsdom
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {hydrate, render} from 'preact';
import {act} from 'preact/test-utils';
import {useState} from 'preact/hooks';
import renderToString from 'preact-render-to-string';
import {ViewStack} from '../components/view-stack';

let host: HTMLDivElement;
const scrollTo = vi.fn();
let entries: (entries: Partial<IntersectionObserverEntry>[]) => void;
const disconnect = vi.fn();
const observe = vi.fn();
let frames: Map<number, FrameRequestCallback>;
let nextFrame: number;
function flushFrames() {
  const pending = Array.from(frames.values());
  frames.clear();
  act(() => { for (const callback of pending) callback(0); });
}
beforeEach(() => {
  host = document.createElement('div');
  document.body.append(host);
  HTMLElement.prototype.scrollTo = scrollTo;
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof entries) { entries = callback; }
    observe = observe;
    disconnect = disconnect;
  });
  frames = new Map();
  nextFrame = 0;
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => { frames.delete(id); });
  vi.clearAllMocks();
});
afterEach(() => {
  act(() => render(null, host));
  host.remove();
  vi.unstubAllGlobals();
});
function command(value: string, target = host.firstElementChild!) {
  act(() => { target.dispatchEvent(Object.assign(new Event('command', {bubbles: true, cancelable: true}), {command: value})); });
}
function snap(index: number) {
  const root = host.firstElementChild!;
  act(() => { root.dispatchEvent(Object.assign(new Event('scrollsnapchange'), {snapTargetInline: root.children[index]})); });
}
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
function mount() {
  act(() => render(
    <ViewStack id="stack">
      <ViewStack.View id="root"><button>Open</button></ViewStack.View>
      <ViewStack.View id="detail">{() => <Counter />}</ViewStack.View>
      <ViewStack.View id="last"><p>Last</p></ViewStack.View>
    </ViewStack>, host));
  Object.defineProperty(host.firstElementChild!, 'clientWidth', {value: 320});
  return host.firstElementChild!;
}

describe('ViewStack', () => {
  it('renders only the initial view, including during SSR', () => {
    const lazy = vi.fn(() => <p>Lazy</p>);
    const html = renderToString(<ViewStack><ViewStack.View>Root</ViewStack.View><ViewStack.View>{lazy}</ViewStack.View></ViewStack>);
    expect(html).toContain('Root');
    expect(lazy).not.toHaveBeenCalled();
    const root = mount();
    expect(root.children).toHaveLength(3);
    expect(root.children[1].textContent).toBe('');
    expect(root.children[1].hasAttribute('inert')).toBe(true);
    expect(root.children[0].hasAttribute('inert')).toBe(false);
  });

  it('renders before command scrolling, commits inert/focus, and retains local state', () => {
    const root = mount();
    const trigger = root.querySelector('button')!;
    trigger.focus();
    command('--next');
    expect(root.children[1].textContent).toBe('0');
    expect(scrollTo).not.toHaveBeenCalled();
    scrollTo.mockImplementationOnce(() => { expect(root.children[1].textContent).toBe('0'); });
    flushFrames();
    expect(scrollTo).toHaveBeenCalledWith({left: 320, behavior: 'auto'});
    snap(1);
    flushFrames();
    expect(root.children[0].hasAttribute('inert')).toBe(true);
    expect(root.children[1].hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(root.children[1]);
    act(() => (root.children[1].querySelector('button')!).click());
    command('--prev');
    snap(0);
    flushFrames();
    expect(document.activeElement).toBe(trigger);
    command('--view-detail');
    snap(1);
    expect(root.children[1].textContent).toBe('1');
  });

  it('uses fully visible observer entries for swipe navigation and cleans up', () => {
    const root = mount();
    expect(observe).toHaveBeenCalledTimes(3);
    act(() => entries([{target: root.children[1], isIntersecting: true, intersectionRatio: 0.5}]));
    expect(root.children[1].textContent).toBe('');
    act(() => entries([{target: root.children[1], isIntersecting: true, intersectionRatio: 1}]));
    expect(root.children[1].textContent).toBe('0');
    expect(root.children[1].hasAttribute('inert')).toBe(false);
    act(() => render(null, host));
    expect(disconnect).toHaveBeenCalled();
  });

  it('ignores invalid commands, nested commands and external history changes', () => {
    const root = mount();
    const push = vi.spyOn(history, 'pushState');
    const replace = vi.spyOn(history, 'replaceState');
    command('--prev');
    command('--view-missing');
    root.children[0].removeAttribute('id');
    command('--view-');
    command('--other');
    command('--next', root.children[0]);
    flushFrames();
    expect(scrollTo).not.toHaveBeenCalled();
    window.dispatchEvent(new PopStateEvent('popstate', {state: {depth: 2}}));
    expect(root.children[2].textContent).toBe('');
    command('--view-last');
    snap(2);
    expect(root.children[2].textContent).toBe('Last');
    expect(push).not.toHaveBeenCalled();
    expect(replace).not.toHaveBeenCalled();
    push.mockRestore();
    replace.mockRestore();
  });

  it('uses snap events without installing an observer when natively supported', () => {
    Object.defineProperty(HTMLElement.prototype, 'onscrollsnapchange', {value: null, configurable: true});
    try {
      const root = mount();
      expect(observe).not.toHaveBeenCalled();
      snap(2);
      expect(root.children[2].textContent).toBe('Last');
      expect(root.children[2].hasAttribute('inert')).toBe(false);
    } finally {
      Reflect.deleteProperty(HTMLElement.prototype, 'onscrollsnapchange');
    }
  });

  it('recovers when the active tail is removed and keeps replacement content lazy', () => {
    const replacement = vi.fn(() => <p>Replacement</p>);
    const update = (tail: 'old' | 'new' | null) => act(() => render(
      <ViewStack>
        <ViewStack.View key="home">Home</ViewStack.View>
        {tail && <ViewStack.View key={tail}>{tail === 'new' ? replacement : <p>Old</p>}</ViewStack.View>}
      </ViewStack>, host));
    update('old');
    snap(1);
    expect(host.textContent).toBe('HomeOld');
    update(null);
    expect(host.firstElementChild!.children[0].hasAttribute('inert')).toBe(false);
    update('new');
    expect(replacement).not.toHaveBeenCalled();
    expect(host.firstElementChild!.children[1].textContent).toBe('');
    snap(1);
    expect(host.textContent).toBe('HomeReplacement');
  });

  it('cancels deferred scrolling on unmount', () => {
    mount();
    command('--next');
    expect(frames.size).toBeGreaterThan(0);
    act(() => render(null, host));
    flushFrames();
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('falls back to the view when the saved focus target is disabled', () => {
    const root = mount();
    const trigger = root.querySelector('button')!;
    trigger.focus();
    snap(1);
    flushFrames();
    trigger.disabled = true;
    snap(0);
    flushFrames();
    expect(document.activeElement).toBe(root.children[0]);
  });

  it('does not re-render an unchanged off-screen view during unrelated navigation', () => {
    const home = vi.fn(() => <p>Home</p>);
    act(() => render(<ViewStack>
      <ViewStack.View>{home}</ViewStack.View>
      <ViewStack.View>Detail</ViewStack.View>
      <ViewStack.View id="last">Last</ViewStack.View>
    </ViewStack>, host));
    command('--next');
    flushFrames();
    snap(1);
    flushFrames();
    home.mockClear();
    command('--view-last');
    flushFrames();
    snap(2);
    flushFrames();
    expect(home).not.toHaveBeenCalled();
  });

  it('hydrates without mounting lazy content or stealing focus', () => {
    const lazy = vi.fn(() => <p>Lazy</p>);
    const content = <ViewStack>
      <ViewStack.View><button>Home</button></ViewStack.View>
      <ViewStack.View>{lazy}</ViewStack.View>
    </ViewStack>;
    host.innerHTML = renderToString(content);
    const root = host.firstElementChild;
    const button = host.querySelector('button')!;
    button.focus();
    act(() => hydrate(content, host));
    flushFrames();
    expect(host.firstElementChild).toBe(root);
    expect(document.activeElement).toBe(button);
    expect(lazy).not.toHaveBeenCalled();
    command('--next');
    flushFrames();
    snap(1);
    flushFrames();
    expect(host.textContent).toBe('HomeLazy');
  });

  it('scrolls in RTL without hard-coding smooth motion', () => {
    const root = mount();
    root.setAttribute('dir', 'rtl');
    // jsdom does not resolve the direction inherited from dir.
    (root as HTMLElement).style.direction = 'rtl';
    command('--view-last');
    flushFrames();
    expect(scrollTo).toHaveBeenLastCalledWith({left: -640, behavior: 'auto'});
  });

  it('lets the latest destination win before the next frame', () => {
    mount();
    command('--next');
    command('--view-last');
    flushFrames();
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith({left: 640, behavior: 'auto'});
  });

  it('does not activate on leaving entries or on nested snap events', () => {
    const root = mount();
    act(() => entries([{target: root.children[1], isIntersecting: false, intersectionRatio: 1}]));
    act(() => {
      root.children[0].dispatchEvent(Object.assign(new Event('scrollsnapchange', {bubbles: true}), {snapTargetInline: root.children[1]}));
    });
    expect(root.children[1].hasAttribute('inert')).toBe(true);
    expect(root.children[1].textContent).toBe('');
  });

  it('preserves the active keyed view when an earlier view is removed', () => {
    const last = vi.fn(() => <p>Last</p>);
    const update = (showHome: boolean) => act(() => render(<ViewStack>
      {showHome && <ViewStack.View key="home">Home</ViewStack.View>}
      <ViewStack.View key="detail"><button>Detail</button></ViewStack.View>
      <ViewStack.View key="last">{last}</ViewStack.View>
    </ViewStack>, host));
    update(true);
    snap(1);
    flushFrames();
    update(false);
    expect(host.firstElementChild!.children[0].hasAttribute('inert')).toBe(false);
    expect(last).not.toHaveBeenCalled();
    command('--next');
    flushFrames();
    expect(host.textContent).toBe('DetailLast');
  });

  it('resolves deferred focus against the latest keyed view position', () => {
    const update = (showHome: boolean) => act(() => render(<ViewStack>
      {showHome && <ViewStack.View key="home">Home</ViewStack.View>}
      <ViewStack.View key="detail">Detail</ViewStack.View>
      <ViewStack.View key="last">Last</ViewStack.View>
    </ViewStack>, host));
    update(true);
    snap(1);
    update(false);
    flushFrames();
    expect(document.activeElement).toBe(host.firstElementChild!.children[0]);
  });

  it('cancels a pending destination removed before scrolling', () => {
    const update = (showDetail: boolean) => act(() => render(<ViewStack>
      <ViewStack.View key="home">Home</ViewStack.View>
      {showDetail && <ViewStack.View key="detail">Detail</ViewStack.View>}
      <ViewStack.View key="last">Last</ViewStack.View>
    </ViewStack>, host));
    update(true);
    command('--next');
    update(false);
    flushFrames();
    expect(scrollTo).not.toHaveBeenCalled();
    expect(host.textContent).toBe('Home');
  });

  it('recomputes a pending keyed destination after an earlier view is removed', () => {
    const update = (showHome: boolean) => act(() => render(<ViewStack>
      {showHome && <ViewStack.View key="home">Home</ViewStack.View>}
      <ViewStack.View key="detail">Detail</ViewStack.View>
      <ViewStack.View key="last" id="last">Last</ViewStack.View>
    </ViewStack>, host));
    update(true);
    Object.defineProperty(host.firstElementChild!, 'clientWidth', {value: 320});
    command('--view-last');
    update(false);
    flushFrames();
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith({left: 320, behavior: 'auto'});
  });

  it('updates retained off-screen content when its application props change', () => {
    const update = (name: string) => act(() => render(<ViewStack>
      <ViewStack.View key="home">{() => <p>{name}</p>}</ViewStack.View>
      <ViewStack.View key="detail">Detail</ViewStack.View>
    </ViewStack>, host));
    update('Before');
    snap(1);
    flushFrames();
    update('After');
    expect(host.firstElementChild!.children[0].textContent).toBe('After');
    expect(host.firstElementChild!.children[0].hasAttribute('inert')).toBe(true);
  });

  it('can be emptied and repopulated without leaving the new first view inert', () => {
    mount();
    snap(2);
    flushFrames();
    act(() => render(<ViewStack />, host));
    expect(host.firstElementChild!.children).toHaveLength(0);
    act(() => render(<ViewStack><ViewStack.View key="new">New</ViewStack.View></ViewStack>, host));
    expect(host.textContent).toBe('New');
    expect(host.firstElementChild!.children[0].hasAttribute('inert')).toBe(false);
  });

  it('detaches old callback refs on replacement without breaking navigation', () => {
    const first = vi.fn((_el: HTMLDivElement | null) => {});
    const second = vi.fn((_el: HTMLDivElement | null) => {});
    const update = (ref: typeof first) => act(() => render(<ViewStack ref={ref}>
      <ViewStack.View>Home</ViewStack.View>
      <ViewStack.View>Detail</ViewStack.View>
    </ViewStack>, host));
    update(first);
    const root = host.firstElementChild!;
    update(second);
    expect(first).toHaveBeenLastCalledWith(null);
    expect(second).toHaveBeenLastCalledWith(root);
    command('--next');
    flushFrames();
    snap(1);
    expect(root.children[1].hasAttribute('inert')).toBe(false);
    act(() => render(null, host));
    expect(second).toHaveBeenLastCalledWith(null);
  });

  it('ignores canceled commands and removes command listeners on detach', () => {
    const root = mount();
    const canceled = Object.assign(new Event('command', {cancelable: true}), {command: '--next'});
    canceled.preventDefault();
    act(() => { root.dispatchEvent(canceled); });
    flushFrames();
    expect(root.children[1].textContent).toBe('');
    expect(scrollTo).not.toHaveBeenCalled();
    act(() => render(null, host));
    command('--next', root);
    flushFrames();
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('honors caller ref cleanup on detach', () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    act(() => render(<ViewStack ref={ref}><ViewStack.View>Home</ViewStack.View></ViewStack>, host));
    expect(ref).toHaveBeenCalledWith(host.firstElementChild);
    act(() => render(null, host));
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenCalledTimes(1);
  });

  it('forwards root and view refs and attributes', () => {
    const rootRef = {current: null as HTMLDivElement | null};
    const viewRef = {current: null as HTMLDivElement | null};
    act(() => render(<ViewStack ref={rootRef} aria-label="Screens"><ViewStack.View ref={viewRef} title="Home">Home</ViewStack.View></ViewStack>, host));
    expect(rootRef.current).toBe(host.firstElementChild);
    expect(rootRef.current?.getAttribute('aria-label')).toBe('Screens');
    expect(viewRef.current?.title).toBe('Home');
    act(() => render(null, host));
    expect(rootRef.current).toBeNull();
    expect(viewRef.current).toBeNull();
  });
});

describe('ViewStack swipe policy', () => {
  let style: HTMLStyleElement;
  beforeEach(() => {
    style = document.createElement('style');
    // Vitest stubs CSS imports; use Node's builtin to test the real stylesheet.
    style.textContent = process.getBuiltinModule('fs').readFileSync(
      'src/components/view-stack/style.css', 'utf8',
    );
    document.head.append(style);
  });
  afterEach(() => style.remove());

  it('defaults to native back-only touch panning in CSS, without a JS default attribute', () => {
    const root = mount();
    expect(root.hasAttribute('swipe')).toBe(false);
    expect(getComputedStyle(root).getPropertyValue('touch-action')).toBe('pan-left pan-y pinch-zoom');
  });

  it('propagates the policy to each independently scrolling content wrapper', () => {
    const root = mount();
    for (const view of Array.from(root.children)) {
      for (const element of [view, view.firstElementChild!]) {
        // jsdom can leave inherit unresolved; real Chromium also verifies the
        // effective policy, including gestures started inside this scroller.
        expect(getComputedStyle(element).getPropertyValue('touch-action')).toMatch(/^(inherit|pan-left pan-y pinch-zoom)$/);
      }
    }
  });

  it('reverses the native touch policy in RTL', () => {
    const root = mount();
    root.setAttribute('dir', 'rtl');
    expect(getComputedStyle(root).getPropertyValue('touch-action')).toBe('pan-right pan-y pinch-zoom');
  });

  it('forwards the both-directions opt-in without eagerly rendering content', () => {
    const lazy = vi.fn(() => <p>Lazy</p>);
    act(() => render(<ViewStack swipe="both">
      <ViewStack.View>Home</ViewStack.View>
      <ViewStack.View>{lazy}</ViewStack.View>
    </ViewStack>, host));
    const root = host.firstElementChild!;
    expect(root.getAttribute('swipe')).toBe('both');
    expect(getComputedStyle(root).getPropertyValue('touch-action')).not.toContain('pan-left');
    expect(lazy).not.toHaveBeenCalled();
  });

  it('supports changing the forwarded policy attribute without new JS behavior', () => {
    const root = mount();
    root.setAttribute('swipe', 'both');
    expect(getComputedStyle(root).getPropertyValue('touch-action')).not.toContain('pan-left');
    root.setAttribute('swipe', 'back');
    expect(getComputedStyle(root).getPropertyValue('touch-action')).toBe('pan-left pan-y pinch-zoom');
    command('--next');
    flushFrames();
    expect(scrollTo).toHaveBeenCalledWith({left: 320, behavior: 'auto'});
    snap(1);
    expect(root.children[1].hasAttribute('inert')).toBe(false);
  });
});
