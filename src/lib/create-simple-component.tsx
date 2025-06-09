import {h, type JSX} from 'preact';

export function createSimpleComponent<T extends keyof JSX.IntrinsicElements>(
  name: string,
  tag: T = 'div' as T,
  defaultProps?: Partial<JSX.IntrinsicElements[T]>,
  ref?: (
    el: JSX.IntrinsicElements[T],
  ) => ((el: JSX.IntrinsicElements[T]) => void) | undefined,
) {
  type Props = JSX.IntrinsicElements[T] & {
    p?: never; // Don't allow overriding the p attribute
  };

  function proxyRef(this: any, el: HTMLElementTagNameMap[T]) {
    let ret: ((el: HTMLElementTagNameMap[T]) => void) | undefined;
    if (this.ref) {
      if (typeof this.ref === 'function') {
        ret = this.ref(el);
      }
    }
    const internalRet = ref?.(el);
    if (!ret && !internalRet) return;
    return () => {
      if (ret) ret(el);
      if (internalRet) internalRet(el);
    };
  }

  function Component(props: Props) {
    let normalizedProps = props;
    if (defaultProps || ref) {
      normalizedProps = Object.assign({}, defaultProps || {}, props);
      normalizedProps.ref = proxyRef;
    }
    (normalizedProps as any).p = name;
    return h(tag, normalizedProps);
  }

  Component.displayName = name;
  return Component;
}
