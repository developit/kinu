import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Sheet({id: idProp, children}: {id?: string; children: ComponentChildren}) {
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <div p="sheet">{children}</div>
    </IdCtx.Provider>
  );
}

export function SheetTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
}

export function SheetContent({id, ...props}: JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog p="sheet-content" id={id ?? ctx} {...props} />;
}

export function SheetClose({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
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

