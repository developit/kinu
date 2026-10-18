import {cloneElement, type ComponentChildren} from 'preact';

export function applyPropsToChildren(
  children: ComponentChildren,
  props: object,
): ComponentChildren {
  if (!children || typeof children !== 'object') return children;
  if (!Array.isArray(children)) {
    return cloneElement(children as any, props);
  }
  return children.map((child) => applyPropsToChildren(child, props));
}
