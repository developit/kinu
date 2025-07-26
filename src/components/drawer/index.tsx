import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Drawer({id: idProp, children}: {id?: string; children: ComponentChildren}) {
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <div p="drawer">{children}</div>
    </IdCtx.Provider>
  );
}

export function DrawerTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
}

export function DrawerContent({id, ...props}: JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog p="drawer-content" id={id ?? ctx} {...props} />;
}

export function DrawerClose({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
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

