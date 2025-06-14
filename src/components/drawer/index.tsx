import {
  createContext,
  createRef,
  type ComponentChildren,
  type RefObject,
} from 'preact';
import {useRef, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const DrawerCtx = createContext<RefObject<HTMLDialogElement>>(createRef());

export function Drawer({children}: {children: ComponentChildren}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <DrawerCtx.Provider value={dialogRef}>{children}</DrawerCtx.Provider>;
}

export function DrawerTrigger({children}: JSX.ElementChildrenAttribute) {
  const dialogRef = useContext(DrawerCtx);
  const handleClick = () => dialogRef.current?.showModal();
  return applyPropsToChildren(children, {onClick: handleClick});
}

function drawerBackdropClick(e: MouseEvent) {
  const dialog = e.currentTarget as HTMLDialogElement;
  if (e.target === dialog) dialog.close();
}

export function DrawerContent(props: JSX.IntrinsicElements['dialog']) {
  const dialogRef = useContext(DrawerCtx);
  return (
    <dialog
      p="drawer-content"
      {...props}
      ref={dialogRef}
      onClickCapture={drawerBackdropClick}
    />
  );
}

export function DrawerClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {
    onClick: (e: Event) => {
      (e.currentTarget as HTMLButtonElement).closest('dialog')?.close();
    },
  });
}

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Close = DrawerClose;
