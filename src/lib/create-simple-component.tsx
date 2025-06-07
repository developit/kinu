import { h, JSX } from 'preact';

export function createSimpleComponent<T extends keyof JSX.IntrinsicElements>(
  name: string,
  tag: T = 'div' as T
) {
  type Props = JSX.IntrinsicElements[T] & {
    p?: never; // Don't allow overriding the p attribute
  };

  function Component(props: Props) {
    // Mutate props directly - no need to clone for performance
    (props as any).p = name;
    return h(tag, props);
  }
  
  Component.displayName = name;
  return Component;
}
