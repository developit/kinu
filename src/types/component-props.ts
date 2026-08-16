import type {ComponentChildren, JSX, RefObject} from 'preact';

/**
 * A ref callback. May return a cleanup function, which is run in place of the
 * `null` call — anything else it returns is ignored, so the return type stays
 * `void` and leaves both forms assignable.
 *
 * Written as a method so its parameter stays bivariant: both
 * `el => el?.focus()` and `(el: HTMLButtonElement) => …` are valid. Keeping it
 * to a *single* signature is what lets TypeScript contextually type
 * `ref={el => …}`; against a union of signatures `el` infers as `any`.
 */
export type RefCallback<T> = {
  ref(el: T | null): void;
}['ref'];

/** Either shape of ref a component accepts. */
export type Ref<T> = RefObject<T> | RefCallback<T>;

/** Collapses a union to the intersection of its members. */
type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends
  (x: infer I) => void ? I : never;

/**
 * The props of the intrinsic element(s) a component renders, minus `Omitted`.
 *
 * `T` is a union for the components that pick their tag from their props —
 * `Item` and `Button` render `<a>` when given an `href` and `<button>`
 * otherwise. `Omit` does not distribute, and `keyof (A | B)` is only the keys
 * `A` and `B` share, so `Omit<A | B, K>` quietly drops everything specific to
 * either one: `target` and `rel` from the anchor, `disabled` from the button.
 * Distributing first and intersecting after keeps every tag's props.
 */
export type IntrinsicProps<
  T extends keyof JSX.IntrinsicElements,
  Omitted extends PropertyKey,
> = UnionToIntersection<T extends unknown ? Omit<JSX.IntrinsicElements[T], Omitted> : never>;

/**
 * The full prop surface of a component built by `createSimpleComponent`: every
 * tag's DOM props, the component's own props, and a single `ref`.
 *
 * `ref` is omitted from the DOM props and redeclared rather than merged with
 * them: preact's `RefCallback` has no cleanup-function return, and for a
 * multi-tag component intersecting one `ref` per tag yields a type no ref can
 * satisfy. Each component's hand-written `…Props` alias is built from this too,
 * so the documented type and the component's own signature cannot drift apart.
 */
export type SimpleComponentProps<
  T extends keyof HTMLElementTagNameMap & keyof JSX.IntrinsicElements,
  P extends object,
> = IntrinsicProps<T, keyof P | 'ref'> &
  P & {
    /** Set by the component itself; not overridable. */
    k?: never;
    ref?: Ref<HTMLElementTagNameMap[T]>;
  };

/**
 * Shared props for components that accept children.
 */
export interface BaseProps {
  /**
   * A command to invoke on `commandFor` target.
   * Custom commands begin with `--` and fire a "command" event on the target.
   */
  command?: 'show-modal' | 'close' | 'show-popover' | 'hide-popover' | 'toggle-popover' | `--${string}` | null;

  /**
   * ID of a DOM element or kinu component to invoke `command` on.
   */
  commandFor?: string | null;

  /**
   * Component contents.
   */
  children?: ComponentChildren;
}

/**
 * Shared props for components that require children.
 */
export interface RequiredChildrenProps extends BaseProps {
  /**
   * Component contents.
   */
  children: ComponentChildren;
}
