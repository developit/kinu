import {h, type JSX, type Component} from 'preact';
import type {RefForwardingComponent} from './forwardref';
import type {Ref, SimpleComponentProps} from '../types/component-props';

/** Whatever a ref callback returned — only honored when it's a function. */
type RefCleanup = unknown;
type RefCallbackWithCleanup<T> = (el: T) => (() => void) | void;
/** Any ref callback, normalized to the widest attach/detach signature. */
type AnyRefCallback<T> = (el: T | null) => RefCleanup;

declare global {
  interface ComponentInstance extends Component {
    /** Ref callback handed to the DOM element, bound to `$_user`. */
    $_ref?: (el: any) => void;
    /** The caller's ref as of the last render, for change detection. */
    $_user?: Ref<any>;
    /** Cleanup returned by the caller's ref callback. */
    $_uc?: RefCleanup;
    /** Cleanup returned by the component's own ref callback. */
    $_ic?: RefCleanup;
  }
}

/**
 * Attach (or detach, when `el` is null) one ref, following Preact's own
 * semantics: when the previous attach returned a cleanup function, run that
 * instead of invoking the callback again with `null`.
 */
function applyRef<T>(
  r: Ref<T> | RefCallbackWithCleanup<T> | undefined,
  el: T | null,
  cleanup: RefCleanup,
): RefCleanup {
  if (typeof r === 'function') {
    if (typeof cleanup === 'function') {
      cleanup();
      if (!el) return;
    }
    return (r as AnyRefCallback<T>)(el);
  }
  if (r) r.current = el;
}

/**
 * Fans one DOM ref out to both the caller's ref and the component's own.
 * Bound per instance, with the caller's ref baked in rather than read at call
 * time — Preact detaches the previous ref *after* the render that replaced it,
 * so reading the current one would detach the wrong ref.
 */
function proxyRef(
  this: ComponentInstance,
  own: RefCallbackWithCleanup<any>,
  user: Ref<any> | undefined,
  el: HTMLElement | null,
) {
  this.$_uc = applyRef(user, el, this.$_uc);
  // A component's own ref is only ever handed an element, never null: whatever
  // it returned on attach is its detach.
  const cleanup = this.$_ic;
  if (typeof cleanup === 'function') cleanup();
  this.$_ic = el && own(el);
  // Returning nothing keeps this out of Preact's ref-cleanup protocol, so
  // Preact calls it again with `null` on unmount — which is what detaches
  // object refs and plain callback refs.
}

export function createSimpleComponent<
  T extends keyof HTMLElementTagNameMap & keyof JSX.IntrinsicElements,
  P extends object = Record<string, never>,
>(
  name: string,
  tag: T | ((props: P & JSX.IntrinsicElements[T]) => T) = 'div' as T,
  defaultProps?: Partial<JSX.IntrinsicElements[T]>,
  ref?: RefCallbackWithCleanup<HTMLElementTagNameMap[T]>,
) {
  type Props = SimpleComponentProps<T, P>;

  const defaultDescriptors = Object.getOwnPropertyDescriptors(defaultProps || {});

  const Wrap: RefForwardingComponent<Props> = function Wrap(
    this: ComponentInstance,
    props: Props,
  ) {
    let normalizedProps = props;
    if (defaultProps || ref) {
      // `Object.create` leaves the caller's props on the prototype chain so
      // getters in `defaultProps` can read sibling props off `this`.
      normalizedProps = Object.assign(
        {},
        Object.create(props, defaultDescriptors),
        props,
      );
    }
    if (ref) {
      // Rebind — changing identity, so Preact re-runs it — only when the
      // caller's ref actually changed.
      if (!this.$_ref || this.$_user !== props.ref) {
        this.$_ref = proxyRef.bind(this, ref, (this.$_user = props.ref));
      }
      (normalizedProps as Props).ref = this.$_ref;
    }
    // Without defaults or a ref callback `normalizedProps` is still the
    // caller's props bag; `ref` is already on it (forwardRef put it back), so
    // it reaches the DOM element the same way `k` does. Cheaper than cloning.
    (normalizedProps as {k?: string}).k = name;
    const resolvedTag = typeof tag === 'function' ? tag(props) : tag;
    return h(resolvedTag, normalizedProps);
  };

  // Equivalent to wrapping in `forwardRef()`, but tagging a local keeps this
  // whole factory analyzable as side-effect free, so bundlers can drop the
  // components an app doesn't use.
  Wrap._pf = Wrap;
  Wrap.displayName = name;
  return Wrap;
}
