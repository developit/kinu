import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {installCommands, installDialogsDropdowns} from '../../lib/commands';
import type {
  DrawerOwnProps,
  DrawerTriggerOwnProps,
  DrawerContentOwnProps,
  DrawerCloseOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Drawer({id: idProp, children}: DrawerOwnProps) {
  installCommands();
  installDialogsDropdowns();
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <div k="drawer">{children}</div>
    </IdCtx.Provider>
  );
}

export function DrawerTrigger({
  children,
  ...props
}: DrawerTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
}

export function DrawerContent({
  id,
  ...props
}: DrawerContentOwnProps & JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog k="drawer-content" id={id ?? ctx} {...props} />;
}

export function DrawerClose({
  children,
  ...props
}: DrawerCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'close',
  });
}

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Close = DrawerClose;
