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
  defaultProps?:
    | Partial<JSX.IntrinsicElements[T]>
    | ((props: P & JSX.IntrinsicElements[T]) => Partial<JSX.IntrinsicElements[T]>),
  ref?: RefCallbackWithCleanup<HTMLElementTagNameMap[T]>,
) {
  type Props = Omit<JSX.IntrinsicElements[T], keyof P> &
    P & {
      k?: never; // Don't allow overriding the k attribute
      ref?: Ref<HTMLElementTagNameMap[T]>;
    };

  // When defaultProps is a function, we call it per-render and use its return
  // value as the full final props. When it's an object, descriptors (with
  // getters) are merged as fallbacks (props win).
  const defaultDescriptors = Object.getOwnPropertyDescriptors(
    typeof defaultProps == 'function' ? {} : defaultProps || {},
  );

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
    let normalizedProps: any = props;
    if (defaultProps || ref) {
      normalizedProps =
        typeof defaultProps == 'function'
          ? (defaultProps as any)(props)
          : Object.assign({}, Object.create(props, defaultDescriptors), props);
      normalizedProps.ref =
        this.$_ref || (this.$_ref = proxyRef.bind(fwdRef || props.ref as any) as any);
    }
    normalizedProps.k = name;
    const resolvedTag = typeof tag === 'function' ? tag(props) : tag;
    return h(resolvedTag, normalizedProps);
  });

  Wrap.displayName = name;
  return Wrap;
}
