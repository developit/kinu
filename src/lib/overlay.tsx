import {h, type ComponentChildren, type Context, type VNode} from 'preact';
import {useContext, useId} from 'preact/hooks';
import {applyPropsToChildren} from './children';
import {installOverlays} from './commands';
import {forwardRef, type RefForwardingComponent} from './forwardref';

/*
 * The overlay families — Dialog, AlertDialog, Drawer, Sheet, Popover,
 * DropdownMenu, ContextMenu — are each a Root that hands an id down through
 * context, plus parts that read it back. Writing those parts out once per
 * family repeated the same three bodies seven times over; these build them.
 *
 * Every factory call site is marked `/*#__PURE__*\/`, so a family an app never
 * imports still tree-shakes away entirely.
 */

type Ctx = Context<string | undefined>;

/**
 * The Root: installs the overlay document listeners, then publishes
 * the overlay's id — the caller's, or a generated one — to its parts. `k`
 * renders a wrapper element carrying that name, for families whose CSS keys
 * off one (Popover and DropdownMenu anchor their trigger through it).
 */
export function overlayRoot<P extends {id?: string; children?: ComponentChildren}>(
  ctx: Ctx,
  k?: string,
  tag = 'span',
) {
  return function Root({id, children}: P): VNode<any> {
    installOverlays();
    const gen = useId();
    return h(ctx.Provider, {value: id || gen}, k ? h(tag, {k}, children) : children);
  };
}

/**
 * A Trigger or Close. Adds nothing to the DOM: it stamps `commandfor` (the
 * overlay's id) and `command` onto its child, and the command polyfill in
 * lib/commands does the rest on click.
 */
export function commandChild<P>(ctx: Ctx, command: string): RefForwardingComponent<P> {
  return forwardRef(({children, ...props}: P & {children?: ComponentChildren}) =>
    applyPropsToChildren(children, {...props, commandfor: useContext(ctx), command}),
  ) as RefForwardingComponent<P>;
}

/**
 * The Content: the `<dialog>` itself, light-dismissable by default. `defaults`
 * sit between kinu's attributes and the caller's, so a family can change the
 * defaults (AlertDialog's `closedby`, Popover's `popover`) and the caller can
 * still override either.
 */
export function overlayContent<P extends {id?: string}>(
  ctx: Ctx,
  k: string,
  defaults?: object,
): RefForwardingComponent<P> {
  return forwardRef(({id, ...props}: P) => {
    const ctxId = useContext(ctx);
    return h('dialog', {k, id: id || ctxId, closedby: 'any', ...defaults, ...props});
  }) as RefForwardingComponent<P>;
}
