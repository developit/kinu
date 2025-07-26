import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Dialog({id: idProp, children}: {id?: string; children: ComponentChildren}) {
  const gen = useId();
  const id = idProp ?? gen;
  return <IdCtx.Provider value={id}>{children}</IdCtx.Provider>;
}

export function DialogTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
}

export function DialogContent({id, ...props}: JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog p="dialog-content" id={id ?? ctx} {...props} />;
}

export function DialogClose({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'close',
  });
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;

