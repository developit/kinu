// @vitest-environment jsdom
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {hydrate, render} from 'preact';
import {act} from 'preact/test-utils';
import {useState} from 'preact/hooks';
import renderToString from 'preact-render-to-string';
import {ViewStack} from '../components/view-stack';

let host: HTMLDivElement;
let observers: Map<Element, {cb: IntersectionObserverCallback; init?: IntersectionObserverInit}>;
const disconnect = vi.fn();
beforeEach(() => {
  host = document.createElement('div');
  document.body.append(host);
  observers = new Map();
  vi.stubGlobal('IntersectionObserver', class {
    constructor(public cb: IntersectionObserverCallback, public init?: IntersectionObserverInit) {}
    observe(el: Element) { observers.set(el, this); }
    disconnect() { disconnect(); for (const [el, o] of observers) if (o === this) observers.delete(el); }
  });
  vi.clearAllMocks();
});
afterEach(() => {
  act(() => render(null, host));
  host.remove();
  vi.unstubAllGlobals();
});
/** Report a view's visible fraction within the stack, as the observer would. */
function visible(view: Element, intersectionRatio: number) {
  const o = observers.get(view)!;
  act(() => o.cb([{target: view, intersectionRatio} as unknown as IntersectionObserverEntry], o as never));
}
/** Settle on one view: it becomes majority-visible, the rest leave. */
function settle(root: Element, index: number) {
  Array.from(root.children).forEach((view, i) => visible(view, i === index ? 1 : 0));
}
function navigate(view: Element) {
  act(() => { view.dispatchEvent(new Event('command')); });
}
const content = (view: Element) => view.firstElementChild as HTMLElement;
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
function mount() {
  act(() => render(
    <ViewStack>
      <ViewStack.View id="root"><button commandfor="detail" command="--show">Open</button></ViewStack.View>
      <ViewStack.View id="detail">{() => <Counter />}</ViewStack.View>
      <ViewStack.View id="last"><p>Last</p></ViewStack.View>
    </ViewStack>, host));
  const root = host.firstElementChild!;
  settle(root, 0);
  return root;
}

describe('ViewStack', () => {
  it('renders plain children eagerly and function children lazily, including during SSR', () => {
    const lazy = vi.fn(() => <p>Lazy</p>);
    const html = renderToString(<ViewStack><ViewStack.View>Root</ViewStack.View><ViewStack.View>{lazy}</ViewStack.View></ViewStack>);
    expect(html).toContain('Root');
    expect(lazy).not.toHaveBeenCalled();
    const root = mount();
    expect(root.children).toHaveLength(3);
    expect(root.children[1].textContent).toBe('');
    expect(root.children[2].textContent).toBe('Last');
  });

  it('makes only the majority-visible view interactive', () => {
    const root = mount();
    expect(Array.from(root.children, v => content(v).inert)).toEqual([false, true, true]);
    // The view shells stay focusable: focus is how navigation happens.
    for (const view of Array.from(root.children)) {
      expect(view.hasAttribute('inert')).toBe(false);
      expect(view.getAttribute('tabindex')).toBe('-1');
    }
    visible(root.children[2], 0.6);
    visible(root.children[0], 0.4);
    expect(Array.from(root.children, v => content(v).inert)).toEqual([true, true, false]);
  });

  it('navigates by focus, rendering the destination before any scrolling', () => {
    const root = mount();
    const detail = root.children[1] as HTMLElement;
    act(() => detail.focus());
    // Rendered on focus, while the destination is still inert and off-screen.
    expect(detail.textContent).toBe('0');
    expect(content(detail).inert).toBe(true);
    settle(root, 1);
    expect(content(detail).inert).toBe(false);
  });

  it('turns any command targeting a view into focus', () => {
    const root = mount();
    navigate(root.children[2]);
    expect(document.activeElement).toBe(root.children[2]);
  });

  it('works with the commandfor polyfill via declarative buttons', () => {
    const root = mount();
    act(() => (root.querySelector('[commandfor]') as HTMLButtonElement).click());
    expect(document.activeElement).toBe(root.children[1]);
    expect(root.children[1].textContent).toBe('0');
  });

  it('renders a lazy view reached by swiping, and retains its state', () => {
    const root = mount();
    const detail = root.children[1];
    settle(root, 1);
    expect(detail.textContent).toBe('0');
    act(() => (detail.querySelector('button') as HTMLButtonElement).click());
    settle(root, 0);
    settle(root, 1);
    expect(detail.textContent).toBe('1');
  });

  it('renders a lazy view once, and skips re-rendering on later visits', () => {
    const lazy = vi.fn(() => <p>Lazy</p>);
    act(() => render(<ViewStack><ViewStack.View>Home</ViewStack.View><ViewStack.View>{lazy}</ViewStack.View></ViewStack>, host));
    const root = host.firstElementChild!;
    const view = root.children[1] as HTMLElement;
    act(() => view.focus());
    settle(root, 1);
    settle(root, 0);
    act(() => (root.children[0] as HTMLElement).focus());
    act(() => view.focus());
    settle(root, 1);
    expect(lazy).toHaveBeenCalledTimes(1);
  });

  it('updates retained content when application props change', () => {
    function App({label}: {label: string}) {
      return <ViewStack><ViewStack.View>Home</ViewStack.View><ViewStack.View>{() => <p>{label}</p>}</ViewStack.View></ViewStack>;
    }
    act(() => render(<App label="one" />, host));
    const root = host.firstElementChild!;
    settle(root, 1);
    act(() => render(<App label="two" />, host));
    expect(root.children[1].textContent).toBe('two');
  });

  it('observes views added later and disconnects removed ones', () => {
    function App({n}: {n: number}) {
      return <ViewStack>{Array.from({length: n}, (_, i) => <ViewStack.View key={i}>{() => <p>{i}</p>}</ViewStack.View>)}</ViewStack>;
    }
    act(() => render(<App n={1} />, host));
    const root = host.firstElementChild!;
    expect(observers.size).toBe(1);
    act(() => render(<App n={3} />, host));
    expect(observers.size).toBe(3);
    expect(observers.get(root.children[1])!.init).toEqual({root, threshold: 0.5});
    settle(root, 2);
    expect(root.children[2].textContent).toBe('2');
    act(() => render(<App n={1} />, host));
    expect(observers.size).toBe(1);
  });

  it('hydrates without mounting lazy content or stealing focus', () => {
    const lazy = vi.fn(() => <p>Lazy</p>);
    const app = <ViewStack><ViewStack.View>Home</ViewStack.View><ViewStack.View>{lazy}</ViewStack.View></ViewStack>;
    host.innerHTML = renderToString(app);
    act(() => hydrate(app, host));
    settle(host.firstElementChild!, 0);
    expect(lazy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(document.body);
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
    expect(disconnect).toHaveBeenCalled();
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
    navigate(root.children[1]);
    expect(document.activeElement).toBe(root.children[1]);
    visible(root.children[1], 1);
    expect(content(root.children[1]).inert).toBe(false);
  });
});
