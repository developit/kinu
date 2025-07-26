import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Popover({id: idProp, children}: {id?: string; children: ComponentChildren}) {
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <span p="popover">{children}</span>
    </IdCtx.Provider>
  );
}

export function PopoverTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show',
  });
}

addEventListener(
  'click',
  (e: MouseEvent) => {
    const dialogs = new Set(
      Array.from(document.querySelectorAll('[p="popover-content"]')),
    );
    let el = e.target as Node | null;
    while (el) {
      if (el instanceof HTMLElement && dialogs.has(el)) dialogs.delete(el);
      el = el.parentNode;
    }
    for (const dialog of dialogs) (dialog as HTMLDialogElement).close();
  },
  true,
);

export function PopoverContent({id, ...props}: JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  return <dialog p="popover-content" id={id ?? ctx} {...props} />;
}

export function PopoverClose({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'close',
  });
}

