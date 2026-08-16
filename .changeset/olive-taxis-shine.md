---
'kinu': patch
---

Fix two defects in the generated type declarations that made valid usage fail to compile.

- **Multi-tag components dropped every prop their tags didn't share.** `Item` and `Button` pick their element from their
  props — an `<a>` when given an `href`, a `<button>` otherwise — so the factory computed `Omit<Button | Anchor, …>`.
  `Omit` doesn't distribute over a union and `keyof (A | B)` is only the keys `A` and `B` have in common, so the result
  kept just the shared props: `target` and `rel` (anchor) and `disabled` (button) were silently missing, and the emitted
  type disagreed with the hand-written `ItemProps`/`ButtonProps`. The tag's props are now omitted per-member and
  intersected after, so every tag's props survive.
- **`ref` was uninhabitable.** Each component's `ref` was intersected with a second, bogus `ref?: HTMLElement`, which no
  value can satisfy — a correctly-typed ref was rejected along with everything else. A ref callback was rejected for a
  second reason: `ref`'s callback type was a union of two signatures, and TypeScript won't contextually type a parameter
  against a union, so `ref={el => …}` also raised an implicit `any` under `strict`. Ref callbacks are now a single
  bivariant signature, so `el` is inferred and cleanup-returning callbacks still typecheck.

`ItemProps` and `ButtonProps` are now built from the same `SimpleComponentProps` helper the components themselves use, so
the documented type and the component's real signature can no longer drift apart. A type-level regression test
(`src/__tests__/prop-types.test-d.tsx`) pins both defects down at build time.

Adds `ItemElement` and `ButtonElement` (`HTMLButtonElement | HTMLAnchorElement`) so a ref to a polymorphic component can
be annotated without spelling out the union: `useRef<ItemElement>(null)`.
