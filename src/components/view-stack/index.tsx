import {h} from 'preact';
import '../../lib/forwardref';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands} from '../../lib/commands';
import type {ViewStackOwnProps, ViewStackViewOwnProps} from './types';
import './style.css';

declare global {
  interface ComponentInstance {
    /** Set on the view's first visit. */
    $_v?: 1;
  }
}

const View = /*#__PURE__*/ createSimpleComponent<'div', ViewStackViewOwnProps>(
  'view-stack-view',
  function (props) {
    const c = props.children;
    // Function children wait for the first visit. The visit's re-render reuses
    // any other VNodes from the caller, which Preact skips by identity.
    props.children = h('div', {k: 'view-stack-content'}, typeof c === 'function' ? this.$_v && c() : c);
    return 'div';
  },
  // Navigation is focus: focusing a view scrolls it into its snap position
  // natively. Any custom command targeting a view just focuses it.
  {tabIndex: -1, oncommand: (e: Event) => (e.currentTarget as HTMLElement).focus()} as Record<string, unknown>,
  function (el) {
    installCommands();
    const show = () => {
      if (!this.$_v) {
        this.$_v = 1;
        this.forceUpdate();
      }
    };
    // Render on navigation intent, before the scroll animation's first frame.
    el.onfocus = show;
    // The majority-visible view is active; the others' content is inert.
    // Activation also renders views reached by swiping rather than focus.
    const io = new IntersectionObserver(([e]) => {
      if (!((el.firstChild as HTMLElement).inert = e.intersectionRatio < .5)) show();
    }, {root: el.parentNode as Element, threshold: .5});
    io.observe(el);
    return () => io.disconnect();
  },
);

const Stack = /*#__PURE__*/ createSimpleComponent<'div', ViewStackOwnProps>('view-stack');

export const ViewStack = /*#__PURE__*/ Object.assign(Stack, {View});
