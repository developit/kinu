import {
  createContext,
  createRef,
  type ComponentChildren,
  type RefObject,
} from 'preact';
import {useRef, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const SheetCtx = createContext<RefObject<HTMLDialogElement>>(createRef());

export function Sheet({children}: {children: ComponentChildren}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <SheetCtx.Provider value={dialogRef}>{children}</SheetCtx.Provider>;
}

export function SheetTrigger({children}: JSX.ElementChildrenAttribute) {
  const dialogRef = useContext(SheetCtx);
  const handleClick = () => dialogRef.current?.showModal();
  return applyPropsToChildren(children, {onClick: handleClick});
}

function sheetBackdropClick(e: MouseEvent) {
  const dialog = e.currentTarget as HTMLDialogElement;
  if (e.target === dialog) dialog.close();
}

export function SheetContent(props: JSX.IntrinsicElements['dialog']) {
  const dialogRef = useContext(SheetCtx);
  return (
    <dialog
      p="sheet-content"
      {...props}
      ref={dialogRef}
      onClickCapture={sheetBackdropClick}
    />
  );
}

export function SheetClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {
    onClick: (e: Event) => {
      (e.currentTarget as HTMLButtonElement).closest('dialog')?.close();
    },
  });
}

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Close = SheetClose;
