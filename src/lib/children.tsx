import {cloneElement, type ComponentChildren} from 'preact';

export function applyPropsToChildren(
  children: ComponentChildren,
  props: object,
): ComponentChildren {
  if (!children || typeof children !== 'object') return children;
  if (!Array.isArray(children)) {
    return cloneElement(children as any, props);
  }
  // return children.flat(2).map((child) => cloneElement(child, props));
  const out = [];
  for (const child of children) {
    out.push(applyPropsToChildren(child, props));
  }
  return out;
}
