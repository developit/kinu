import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {forwardRef} from '../../lib/forwardref';
import {installCommands, installAdaptiveCommands, installDialogsDropdowns, installSwipe} from '../../lib/commands';
import type {
  PopoverOwnProps,
  PopoverTriggerOwnProps,
  PopoverContentOwnProps,
  PopoverCloseOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Popover({id: idProp, children}: PopoverOwnProps) {
  installCommands();
  installAdaptiveCommands();
  installDialogsDropdowns();
  installSwipe();
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <span k="popover">{children}</span>
    </IdCtx.Provider>
  );
}

export const PopoverTrigger = /*#__PURE__*/ forwardRef(function PopoverTrigger({
  children,
  ...props
}: PopoverTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show',
  });
});

// addEventListener(
//   'click',
//   (e: MouseEvent) => {
//     const dialogs = new Set(
//       Array.from(document.querySelectorAll('[k="popover-content"]')),
//     );
//     let el = e.target as Node | null;
//     while (el) {
//       if (el instanceof HTMLElement && dialogs.has(el)) dialogs.delete(el);
//       el = el.parentNode;
//     }
//     for (const dialog of dialogs) (dialog as HTMLDialogElement).close();
//   },
//   true,
// );

export const PopoverContent = /*#__PURE__*/ forwardRef(function PopoverContent({
  id,
  ...props
}: PopoverContentOwnProps & JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog k="popover-content" id={id ?? ctx} {...props} />;
});

export const PopoverClose = /*#__PURE__*/ forwardRef(function PopoverClose({
  children,
  ...props
}: PopoverCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'close',
  });
});
