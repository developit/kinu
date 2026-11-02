import {h, type VNode} from 'preact';
import '../../lib/forwardref';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands} from '../../lib/commands';
import type {ViewStackOwnProps, ViewStackViewOwnProps} from './types';
import './style.css';

declare global {
  interface ComponentInstance {
    /** Retained render state; lives with the keyed factory instance. */
    $_visited?: boolean;
  }
}
type Screen = HTMLDivElement & {$_render?: () => void; $_focus?: HTMLElement};

const View = createSimpleComponent<'div', ViewStackViewOwnProps>(
  'view-stack-view',
  function (props) {
    // The stack seeds SSR only. All subsequent activity belongs to the DOM.
    const initial = props as typeof props & {$_first?: boolean};
    const children = props.children;
    this.$_visited ||= initial.$_first;
    initial.$_first = undefined;
    props.inert = (this.base as Element | undefined)?.hasAttribute('inert') ?? !this.$_visited;
    props.children = h('div', {k: 'view-stack-content'}, this.$_visited
      ? typeof children === 'function' ? children() : children : null);
    return 'div';
  },
  {inert: true, tabIndex: -1},
  function (el: Screen) {
    el.$_render = () => {
      if (!this.$_visited) {
        this.$_visited = true;
        this.forceUpdate();
      }
    };
    return () => { el.$_render = undefined; };
  },
);

const Stack = createSimpleComponent<'div', ViewStackOwnProps>(
  'view-stack',
  function (props) {
    // Seed the first screen during SSR/hydration, but never reseed on updates.
    const children = [props.children as unknown].flat(Infinity).filter(child => child && typeof child === 'object') as VNode[];
    const first = children[0];
    if (!this.base && first) children[0] = h<any>(first.type, {...first.props, key: first.key, ref: first.ref, $_first: true});
    props.children = children;
    return 'div';
  },
  {},
  (el) => {
    installCommands();
    let current: Screen | undefined;
    let index = 0;
    let scrollFrame = 0;
    const views = () => Array.from(el.children) as Screen[];
    const activate = (view: Screen | undefined, restore = true) => {
      if (view && view.parentElement !== el) return;
      const focused = document.activeElement as HTMLElement;
      if (current?.contains(focused)) current.$_focus = focused;
      const changed = current !== view;
      current = view;
      index = Math.max(0, views().indexOf(view!));
      for (const child of views()) child.toggleAttribute('inert', child !== view);
      view?.$_render?.();
      // Inert changes synchronously now; no render/effect/focus scheduling.
      if (changed && restore) {
        const target = view?.$_focus;
        if (target?.isConnected && view?.contains(target)) target.focus({preventScroll: true});
        if (view && !view.contains(document.activeElement)) view.focus({preventScroll: true});
      }
    };
    const snap = (event: Event) => {
      const view = (event as Event & {snapTargetInline: Screen | null}).snapTargetInline;
      if (event.target === el && view) activate(view);
    };
    const command = (event: Event) => {
      if (event.target !== el || event.defaultPrevented) return;
      if (current?.parentElement !== el) sync();
      const cmd = (event as Event & {command: string}).command;
      const target = (cmd === '--next' ? current?.nextElementSibling : cmd === '--prev' ? current?.previousElementSibling
        : cmd?.startsWith('--view-') ? document.getElementById(cmd.slice(7)) : null) as Screen | null;
      if (!target || target.parentElement !== el) return;
      event.preventDefault();
      target.$_render?.();
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        if (target.parentElement === el) el.scrollTo({
          left: (getComputedStyle(el).direction === 'rtl' ? -1 : 1) * views().indexOf(target) * el.clientWidth,
          behavior: 'auto',
        });
      });
    };
    const observer = !('onscrollsnapchange' in HTMLElement.prototype) && typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting && entry.intersectionRatio >= 0.999) activate(entry.target as Screen);
      }, {root: el, threshold: [0.999]}) : undefined;
    const sync = () => {
      const children = views();
      activate(current?.parentElement === el ? current : children[Math.min(index, children.length - 1)], !!current);
      observer?.disconnect();
      for (const child of children) observer?.observe(child);
    };
    current = views().find(view => !view.hasAttribute('inert'));
    sync();
    const mutations = new MutationObserver(sync);
    mutations.observe(el, {childList: true});
    el.addEventListener('command', command);
    el.addEventListener('scrollsnapchange', snap);
    return () => {
      cancelAnimationFrame(scrollFrame);
      observer?.disconnect();
      mutations.disconnect();
      el.removeEventListener('command', command);
      el.removeEventListener('scrollsnapchange', snap);
    };
  },
);

export const ViewStack = /*#__PURE__*/ Object.assign(Stack, {View});
