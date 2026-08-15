import {options, type VNode} from 'preact';

declare module 'preact' {
  interface Options {
    /** `_diff`: called for every vnode, before it is diffed. */
    __b?: (vnode: VNode<any>) => void;
  }
}

/**
 * A component that takes `ref` as a normal prop. Deliberately *not*
 * `FunctionComponent<P>`: that widens props with `ref?: Ref<any>`, which
 * collides with the element-specific `ref` a component already declares.
 */
export type RefForwardingComponent<P> = ((props: P) => VNode<any> | null) & {
  displayName?: string;
  /**
   * The tag {@link forwardRef} sets. Assigning it directly is equivalent, and
   * is what factories that build their own component function should do:
   * `forwardRef()` mutates its argument, which bundlers read as a side effect,
   * making the factory call itself unshakeable.
   */
  _pf?: unknown;
};

const oldDiff = options.__b;
options.__b = (vnode) => {
  const type = vnode.type as RefForwardingComponent<any>;
  // Preact hoists `ref` out of props onto the vnode. For tagged components we
  // put it back, so `ref` behaves like any other prop: it rides along with
  // `{...props}` down to whichever DOM element the component renders.
  if (type && type._pf && vnode.ref) {
    (vnode.props as {ref?: unknown}).ref = vnode.ref;
    vnode.ref = null;
  }
  if (oldDiff) oldDiff(vnode);
};

/**
 * Tag a component as forwarding `ref` to the DOM element it renders.
 *
 * Unlike React's `forwardRef`, `ref` is passed as part of props rather than as
 * a second argument — spread it onto the root element (or destructure it) and
 * Preact applies it natively, cleanup functions and all.
 *
 * ```tsx
 * const Box = forwardRef((props: JSX.IntrinsicElements['div']) => <div {...props} />);
 * ```
 */
export function forwardRef<P>(fn: (props: P) => any): RefForwardingComponent<P> {
  return ((fn as RefForwardingComponent<P>)._pf = fn);
}
