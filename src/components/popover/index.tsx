import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import {installCommands, installAdaptiveCommands, installDialogsDropdowns} from '../../lib/commands';
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
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <span k="popover">{children}</span>
    </IdCtx.Provider>
  );
}

export function PopoverTrigger({
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
}

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

export const PopoverContent = createSimpleComponent<
  'dialog',
  PopoverContentOwnProps
>('popover-content', 'dialog', (p: any) => ({
  ...p,
  id: p.id ?? useContext(IdCtx),
}));

export function PopoverClose({
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
}
