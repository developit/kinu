import {
  createContext,
  createRef,
  type ComponentChildren,
  type RefObject,
} from 'preact';
import {useRef, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

const DialogCtx = createContext<RefObject<HTMLDialogElement>>(createRef());

export function Dialog({children}: {children: ComponentChildren}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <DialogCtx.Provider value={dialogRef}>{children}</DialogCtx.Provider>;
}

export function DialogTrigger({children}: JSX.ElementChildrenAttribute) {
  const dialogRef = useContext(DialogCtx);
  const handleClick = () => dialogRef.current?.showModal();
  return applyPropsToChildren(children, {onClick: handleClick});
}

function dialogBackdropClick(e: MouseEvent) {
  const dialog = e.currentTarget as HTMLDialogElement;
  if (e.target === dialog) dialog.close();
}

export function DialogContent(props: JSX.IntrinsicElements['dialog']) {
  const dialogRef = useContext(DialogCtx);
  return (
    <dialog
      p="dialog-content"
      {...props}
      ref={dialogRef}
      onClickCapture={dialogBackdropClick}
    />
  );
}

function dialogCloseClick(e: Event) {
  (e.currentTarget as HTMLButtonElement).closest('dialog')?.close();
}

export function DialogClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {onClick: dialogCloseClick});
}

// Attach compound components
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;
