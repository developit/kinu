import {h, type JSX, type RefObject, type Component} from 'preact';

type RefCallbackWithCleanup<T> = (el: T) => (() => void) | void;
type RefCallback<T> = ((el: T | null) => void) | ((el: T) => () => void);
type Ref<T> = RefObject<T> | RefCallback<T>;

declare global {
  interface ComponentInstance extends Component {
    $_ref?: RefCallbackWithCleanup<HTMLElement>;
  }
}

export function createSimpleComponent<
  T extends keyof HTMLElementTagNameMap & keyof JSX.IntrinsicElements,
>(
  name: string,
  tag: T = 'div' as T,
  defaultProps?: Partial<JSX.IntrinsicElements[T]>,
  ref?: RefCallbackWithCleanup<HTMLElementTagNameMap[T]>,
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

  function Wrap(this: ComponentInstance, props: Props) {
    let normalizedProps = props;
    if (defaultProps || ref) {
      normalizedProps = Object.assign({}, defaultProps || {}, props);
      normalizedProps.ref =
        this.$_ref || (this.$_ref = proxyRef.bind(props.ref as any) as any);
    }
    (normalizedProps as any).p = name;
    return h(tag, normalizedProps);
  }

  Wrap.displayName = name;
  return Wrap;
}
