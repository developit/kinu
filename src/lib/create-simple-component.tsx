import {h, type JSX, type RefObject} from 'preact';

type RefCallback<T> = ((el: T | null) => void) | ((el: T) => () => void);
type Ref<T> = RefObject<T> | RefCallback<T>;

export function createSimpleComponent<
  T extends keyof HTMLElementTagNameMap & keyof JSX.IntrinsicElements,
>(
  name: string,
  tag: T = 'div' as T,
  defaultProps?: Partial<JSX.IntrinsicElements[T]>,
  ref?: RefCallback<HTMLElementTagNameMap[T]>,
) {
  type Props = JSX.IntrinsicElements[T] & {
    p?: never; // Don't allow overriding the p attribute
    ref?: Ref<T>;
    [key: string]: any; // allow custom attributes for styling
  };

  function proxyRef(
    this: Ref<HTMLElementTagNameMap[T]>,
    el: HTMLElementTagNameMap[T],
  ) {
    let ret: (() => void) | undefined | void;
    if (this) {
      if (typeof this === 'function') ret = this(el);
      else this.current = el;
    }
    const internalRet = ref?.(el);
    if (!ret && !internalRet) return;
    return () => {
      if (ret) ret();
      if (internalRet) internalRet();
    };
  }

  function Component(props: Props) {
    let normalizedProps = props;
    if (defaultProps || ref) {
      normalizedProps = Object.assign({}, defaultProps || {}, props);
      normalizedProps.ref = proxyRef.bind(props.ref as any) as any;
    }
    (normalizedProps as any).p = name;
    return h(tag, normalizedProps);
  }

  Component.displayName = name;
  return Component;
}
