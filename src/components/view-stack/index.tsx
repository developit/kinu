import {createContext, toChildArray} from 'preact';
import {useContext, useLayoutEffect, useMemo, useRef, useState} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {forwardRef} from '../../lib/forwardref';
import {installCommands} from '../../lib/commands';
import type {ViewStackProps, ViewStackViewProps} from './types';
import './style.css';

// Stable values keep unrelated, retained screens out of navigation updates.
const ACTIVE = {active: true, render: true};
const REQUESTED = {active: false, render: true};
const INACTIVE = {active: false, render: false};
const ViewContext = createContext(ACTIVE);
const StackElement = createSimpleComponent<'div', object>('view-stack', 'div');
const ViewElement = createSimpleComponent<'div', object>('view-stack-view', 'div', {tabIndex: -1});

const View = /*#__PURE__*/ forwardRef(function View({children, ...props}: ViewStackViewProps) {
  const state = useContext(ViewContext);
  const visited = useRef(false);
  if (state.render) visited.current = true;
  return (
    <ViewElement {...props} inert={!state.active}>
      <div k="view-stack-content">
        {visited.current && (typeof children === 'function' ? children() : children)}
      </div>
    </ViewElement>
  );
});

const ViewStackRoot = /*#__PURE__*/ forwardRef(function ViewStack({children, ref, ...props}: ViewStackProps) {
  installCommands();
  const element = useRef<HTMLDivElement | null>(null);
  const current = useRef(0);
  const items = toChildArray(children);
  const keys: (string | number)[] = items.map((child, index) =>
    typeof child === 'object' ? child.key ?? index : index,
  );
  const [activeKey, setActive] = useState<string | number | undefined>(() => keys[0]);
  const [requestedKey, request] = useState<string | number | null>(null);
  // Identity survives insertions/removals ahead of the active or pending view.
  const retained = activeKey === undefined ? -1 : keys.indexOf(activeKey);
  const active = retained < 0 ? Math.max(0, Math.min(current.current, keys.length - 1)) : retained;
  const requested = requestedKey === null ? -1 : keys.indexOf(requestedKey);
  const initialFocus = useRef(true);
  const returnFocus = useRef(new WeakMap<Element, HTMLElement>());
  const mergedRef = useMemo(() => (el: HTMLDivElement | null) => {
    element.current = el;
    const cleanup: unknown = typeof ref === 'function' ? ref(el) : undefined;
    if (ref && typeof ref !== 'function') ref.current = el;
    return () => {
      element.current = null;
      if (typeof cleanup === 'function') cleanup();
      else if (typeof ref === 'function') ref(null);
      else if (ref) ref.current = null;
    };
  }, [ref]);

  useLayoutEffect(() => {
    const el = element.current!;
    const views = Array.from(el.children) as HTMLElement[];
    current.current = active;
    if (activeKey !== keys[active]) setActive(keys[active]);
    const commit = (view: Element | null) => {
      const index = views.indexOf(view as HTMLElement);
      if (index < 0 || index === current.current) return;
      const previous = views[current.current];
      const focused = document.activeElement as HTMLElement | null;
      if (focused && previous?.contains(focused)) returnFocus.current.set(previous, focused);
      current.current = index;
      setActive(keys[index]);
    };
    const snap = (event: Event) => {
      if (event.target === el) commit((event as Event & {snapTargetInline: Element | null}).snapTargetInline);
    };
    const command = (event: Event) => {
      if (event.target !== el || event.defaultPrevented) return;
      const cmd = (event as Event & {command: string}).command;
      const index = cmd === '--next' ? current.current + 1
        : cmd === '--prev' ? current.current - 1
        : cmd?.startsWith('--view-') && cmd.length > 7 ? views.findIndex((view) => view.id === cmd.slice(7)) : -1;
      if (index < 0 || index >= views.length) return;
      event.preventDefault();
      request(keys[index]);
    };
    el.addEventListener('scrollsnapchange', snap);
    el.addEventListener('command', command);
    let observer: IntersectionObserver | undefined;
    if (!('onscrollsnapchange' in HTMLElement.prototype) && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.999) commit(entry.target);
        }
      }, {root: el, threshold: [0.999]});
      for (const view of views) observer.observe(view);
    }
    return () => {
      el.removeEventListener('scrollsnapchange', snap);
      el.removeEventListener('command', command);
      observer?.disconnect();
    };
  }, [children]);

  // Render the destination before scrolling. CSS decides smooth vs reduced motion.
  useLayoutEffect(() => {
    if (requestedKey === null) return;
    if (requested < 0) {
      request(null);
      return;
    }
    // Like focus, scrolling must wait for context consumers to commit. Otherwise
    // reduced-motion navigation can jump to a still-empty destination.
    const frame = requestAnimationFrame(() => {
      const el = element.current!;
      if (requested < el.children.length) {
        const direction = getComputedStyle(el).direction === 'rtl' ? -1 : 1;
        el.scrollTo({left: direction * requested * el.clientWidth, behavior: 'auto'});
      }
      request(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [requestedKey, children]);

  useLayoutEffect(() => {
    if (initialFocus.current) {
      initialFocus.current = false;
      return;
    }
    // Context consumers may commit after the provider's layout effects. Wait
    // until the destination's inert attribute has been removed before focusing.
    const frame = requestAnimationFrame(() => {
      const view = element.current?.children[current.current] as HTMLElement | undefined;
      if (!view) return;
      const stored = returnFocus.current.get(view);
      if (stored?.isConnected && view.contains(stored)) stored.focus({preventScroll: true});
      if (!view.contains(document.activeElement)) view.focus({preventScroll: true});
    });
    return () => cancelAnimationFrame(frame);
  }, [activeKey]);

  return (
    <StackElement {...props} ref={mergedRef}>
      {items.map((child, index) => (
        <ViewContext.Provider key={keys[index]}
          value={active === index ? ACTIVE : requested === index ? REQUESTED : INACTIVE}>
          {child}
        </ViewContext.Provider>
      ))}
    </StackElement>
  );
});

export const ViewStack = /*#__PURE__*/ Object.assign(ViewStackRoot, {View});
