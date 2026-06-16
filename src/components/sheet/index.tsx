import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {installCommands, installDialogsDropdowns, installSwipe} from '../../lib/commands';
import type {
  SheetOwnProps,
  SheetTriggerOwnProps,
  SheetContentOwnProps,
  SheetCloseOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Sheet({id: idProp, children}: SheetOwnProps) {
  installCommands();
  installDialogsDropdowns();
  installSwipe();
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <div k="sheet">{children}</div>
    </IdCtx.Provider>
  );
}

export function SheetTrigger({
  children,
  ...props
}: SheetTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
}

export function SheetContent({
  id,
  ...props
}: SheetContentOwnProps & JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog k="sheet-content" id={id || ctx} {...props} />;
}

export function SheetClose({
  children,
  ...props
}: SheetCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'close',
  });
}

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Close = SheetClose;
