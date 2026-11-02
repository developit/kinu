import {h} from 'preact';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands} from '../../lib/commands';
import type {ViewStackOwnProps, ViewStackViewOwnProps} from './types';
import './style.css';

declare global {
  interface ComponentInstance {
    /** Set once the view has been scrolled into the viewport. */
    $_v?: 1;
  }
}
type Cmd = Event & {command: string};

const View = /*#__PURE__*/ createSimpleComponent<'div', ViewStackViewOwnProps>(
  'view-stack-view',
  function (props) {
    const c = props.children;
    // Function children are deferred until the view first becomes visible.
    props.children = h('div', {k: 'view-stack-content'}, typeof c == 'function' ? this.$_v && c() : c);
    return 'div';
  },
  {tabIndex: -1},
  function (el) {
    installCommands();
    const stack = el.parentNode as HTMLElement;
    // One observer per view: views added later register themselves, removed
    // views clean up after themselves, and the stack needs no JS at all.
    const io = new IntersectionObserver(([e]) => {
      const r = e.intersectionRatio;
      // The majority-visible view is active; the rest are inert. Moving focus
      // in only on later activations (the initial one has not rendered yet).
      if (!(el.inert = r < .5) && this.$_v) el.focus({preventScroll: true});
      if (r && !this.$_v) {
        this.$_v = 1;
        this.forceUpdate();
      }
    }, {root: stack, threshold: [.01, .5]});
    const command = (e: Event) => {
      const c = (e as Cmd).command;
      if (e.target == stack && (
        c == '--view-' + el.id
        // The active view is the only non-inert one. With no neighbour, fall
        // back to `el` itself: active means a zero-length scroll, else no-op.
        || c == '--next' && !(el.previousElementSibling as HTMLElement || el).inert
        || c == '--prev' && !(el.nextElementSibling as HTMLElement || el).inert
      // An absolute scroll: scrollBy() is directional, and scroll-snap-stop
      // would halt a multi-view jump at the adjacent view.
      )) stack.scrollTo(stack.scrollLeft + el.getBoundingClientRect().left - stack.getBoundingClientRect().left, 0);
    };
    io.observe(el);
    stack.addEventListener('command', command);
    return () => {
      io.disconnect();
      stack.removeEventListener('command', command);
    };
  },
);

const Stack = /*#__PURE__*/ createSimpleComponent<'div', ViewStackOwnProps>('view-stack');

export const ViewStack = /*#__PURE__*/ Object.assign(Stack, {View});
