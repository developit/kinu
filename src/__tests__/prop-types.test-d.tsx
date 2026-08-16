/**
 * Type-level regression tests. Nothing here runs — `tsc` (via `pnpm lint` and
 * `pnpm build`) is the assertion, so a declaration regression fails the build.
 *
 * Two defects shipped in 0.2.0's generated `.d.ts` and are pinned down here:
 *
 * 1. `createSimpleComponent` collapsed a multi-tag component's props with a
 *    non-distributive `Omit<Button | Anchor, K>`, which keeps only the keys
 *    both tags share — so `target`/`rel` (anchor) and `disabled` (button)
 *    vanished from `Item`, and the generated type disagreed with the
 *    hand-written `ItemProps`.
 * 2. Every component's `ref` was intersected with a bogus `ref?: HTMLElement`,
 *    which no value can satisfy: `ref` was uninhabitable.
 */
import {createRef} from 'preact';
import {Button} from '../components/button';
import {Item} from '../components/item';
import type {ItemElement, ItemProps} from '../components/item/types';

/** Fails to compile unless `T` is assignable to `U`, and reports both types. */
const assignable = <U,>() => <T extends U>(_value?: T) => {};

type PropsOf<C> = C extends (props: infer P) => unknown ? P : never;
type ItemComponentProps = PropsOf<typeof Item>;

// 1. Tag-specific props survive on components that pick their tag from props.
// These are the exact usages that failed against 0.2.0.
const anchorItem = <Item href="/docs" target="_blank" rel="noopener noreferrer" />;
const buttonItem = <Item disabled />;
const anchorButton = <Button href="/docs" target="_blank" rel="noopener noreferrer" />;
const buttonButton = <Button disabled />;

// The generated props and the hand-written `ItemProps` must agree, in both
// directions — 0.2.0's generated type was a strict subset.
assignable<ItemProps>()<ItemComponentProps>();
assignable<ItemComponentProps>()<ItemProps>();

// 2. `ref` accepts the refs callers actually hold: an object ref for either
// tag, and a callback ref, contextually typed and free to return a cleanup.
const objectRef = createRef<ItemElement>();
const withObjectRef = <Item ref={objectRef} />;
const withNarrowObjectRef = <Item ref={createRef<HTMLButtonElement>()} />;
const withCallbackRef = <Item ref={(el) => el?.focus()} />;
const withCleanupRef = (
  <Item
    ref={(el: ItemElement) => {
      el.scrollIntoView();
      return () => {};
    }}
  />
);

export {
  anchorItem,
  buttonItem,
  anchorButton,
  buttonButton,
  withObjectRef,
  withNarrowObjectRef,
  withCallbackRef,
  withCleanupRef,
};
