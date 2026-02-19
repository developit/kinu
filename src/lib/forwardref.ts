import { options, type ComponentType } from 'preact';

declare module 'preact' {
  interface Options {
    __b?: (vnode: VNode<any>) => void;
  }
}

const oldDiff = options.__b;
options.__b = (vnode) => {
  const type = vnode.type;
  if (typeof type === 'function' && '_pf' in type) {
    const ref = vnode.ref;
    if (ref) {
      vnode.props.ref = ref;
      vnode.ref = null;
    }
  }
  if (oldDiff) oldDiff(vnode);
};

export function forwardRef<Ref, Props>(fn: (props: Props, ref?: Ref) => JSX.Element): ComponentType<Props & {ref?: Ref}> {
  function F(this: ComponentInstance, props: Props & {ref?: Ref}) {
    const ref = props.ref;
    if (ref) props.ref = undefined;
    return fn.call(this, props, ref);
  }
  return F._pf = F;
}
