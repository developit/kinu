import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {forwardRef} from '../../lib/forwardref';
import {
  installAdaptiveCommands,
  installCommands,
  installDialogsDropdowns,
} from '../../lib/commands';
import type {
  DialogOwnProps,
  DialogTriggerOwnProps,
  DialogContentOwnProps,
  DialogCloseOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Dialog({id: idProp, children}: DialogOwnProps) {
  const gen = useId();
  const id = idProp ?? gen;
  return <IdCtx.Provider value={id}>{children}</IdCtx.Provider>;
}

export const DialogTrigger = /*#__PURE__*/ forwardRef(function DialogTrigger({
  children,
  ...props
}: DialogTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  installCommands();
  installAdaptiveCommands();
  installDialogsDropdowns();
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
});

export const DialogContent = /*#__PURE__*/ forwardRef(function DialogContent({
  id,
  ...props
}: DialogContentOwnProps & JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog k="dialog-content" id={id ?? ctx} {...props} />;
});

export const DialogClose = /*#__PURE__*/ forwardRef(function DialogClose({
  children,
  ...props
}: DialogCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'close',
  });
});

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;
