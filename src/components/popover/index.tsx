import {
  createContext,
  createRef,
  type ComponentChildren,
  type RefObject,
} from 'preact';
import {useRef, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const PopoverCtx = createContext<RefObject<HTMLDialogElement>>(createRef());

export function Popover({children}: {children: ComponentChildren}) {
  const popoverRef = useRef<HTMLDialogElement>(null);
  return (
    <span p="popover">
      <PopoverCtx.Provider value={popoverRef}>{children}</PopoverCtx.Provider>
    </span>
  );
}

export function PopoverTrigger({children}: JSX.ElementChildrenAttribute) {
  const popoverRef = useContext(PopoverCtx);
  const handleClick = () => popoverRef.current?.show();
  return applyPropsToChildren(children, {onClick: handleClick});
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

export function PopoverContent(props: JSX.IntrinsicElements['dialog']) {
  const popoverRef = useContext(PopoverCtx);
  return <dialog p="popover-content" {...props} ref={popoverRef} />;
}

function popoverCloseClick(e: Event) {
  (e.currentTarget as HTMLButtonElement).closest('dialog')?.close();
}

export function PopoverClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {onClick: popoverCloseClick});
}
