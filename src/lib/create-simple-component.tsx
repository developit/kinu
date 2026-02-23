import {h, type JSX, type RefObject, type Component} from 'preact';
import {forwardRef} from './forwardref';

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
  P extends object = Record<string, never>,
>(
  name: string,
  tag: T | ((props: P & JSX.IntrinsicElements[T]) => T) = 'div' as T,
  defaultProps?: Partial<JSX.IntrinsicElements[T]>,
  ref?: RefCallbackWithCleanup<HTMLElementTagNameMap[T]>,
) {
  type Props = Omit<JSX.IntrinsicElements[T], keyof P> &
    P & {
      p?: never; // Don't allow overriding the p attribute
      ref?: Ref<HTMLElementTagNameMap[T]>;
    };

  const defaultDescriptors = Object.getOwnPropertyDescriptors(defaultProps || {});

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
    return () => {
      if (ret) ret();
      if (internalRet) internalRet();
    };
  }

  const Wrap = forwardRef<HTMLElementTagNameMap[T], Props>(function Wrap(this: ComponentInstance, props, fwdRef) {
    let normalizedProps = props;
    if (defaultProps || ref) {
      normalizedProps = Object.assign(
        {},
        Object.create(props, defaultDescriptors),
      );
      normalizedProps.ref =
        this.$_ref || (this.$_ref = proxyRef.bind(fwdRef || props.ref as any) as any);
    }
    (normalizedProps as any).p = name;
    const resolvedTag = typeof tag === 'function' ? tag(props) : tag;
    return h(resolvedTag, normalizedProps);
  });

  Wrap.displayName = name;
  return Wrap;
}
