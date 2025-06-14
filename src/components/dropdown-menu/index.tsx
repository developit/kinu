import {
  createContext,
  createRef,
  type ComponentChildren,
  type RefObject,
} from 'preact';
import {useRef, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

const DropdownCtx = createContext<RefObject<HTMLDialogElement>>(createRef());

export function DropdownMenu({children}: {children: ComponentChildren}) {
  const dropdownRef = useRef<HTMLDialogElement>(null);
  return (
    <span p="dropdown">
      <DropdownCtx.Provider value={dropdownRef}>
        {children}
      </DropdownCtx.Provider>
    </span>
  );
}

export function DropdownMenuTrigger({children}: JSX.ElementChildrenAttribute) {
  const dropdownRef = useContext(DropdownCtx);
  const handleClick = () => dropdownRef.current?.show();
  return applyPropsToChildren(children, {onClick: handleClick});
}

addEventListener(
  'click',
  (e: MouseEvent) => {
    const dialogs = new Set(
      Array.from(document.querySelectorAll('[p="dropdown-content"]')),
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

export function DropdownMenuContent(props: JSX.IntrinsicElements['dialog']) {
  const dropdownRef = useContext(DropdownCtx);
  return <dialog p="dropdown-content" {...props} ref={dropdownRef} />;
}

export const DropdownMenuItem = createSimpleComponent(
  'dropdown-menu-item',
  'button',
);
