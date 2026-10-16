// @vitest-environment jsdom
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {render} from 'preact';
import {act} from 'preact/test-utils';
import {useState} from 'preact/hooks';
import renderToString from 'preact-render-to-string';
import {ViewStack} from '../components/view-stack';

let host: HTMLDivElement;
const scrollTo = vi.fn();
let entries: (entries: Partial<IntersectionObserverEntry>[]) => void;
const disconnect = vi.fn();
const observe = vi.fn();
beforeEach(() => {
  host = document.createElement('div');
  document.body.append(host);
  HTMLElement.prototype.scrollTo = scrollTo;
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof entries) { entries = callback; }
    observe = observe;
    disconnect = disconnect;
  });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { callback(0); return 1; });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
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
    expect(scrollTo).toHaveBeenCalledWith({left: 0, behavior: 'auto'});
    snap(1);
    expect(root.children[0].hasAttribute('inert')).toBe(true);
    expect(root.children[1].hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(root.children[1]);
    act(() => (root.children[1].querySelector('button')!).click());
    command('--prev');
    snap(0);
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
    command('--other');
    command('--next', root.children[0]);
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
