// import type {JSX} from 'preact';
import {createContext, createRef, type RefObject} from 'preact';
import {useRef, useEffect, useContext} from 'preact/hooks';
// import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
import './style.css';

interface DialogProps extends Omit<JSX.IntrinsicElements['dialog'], 'p'> {
  defaultOpen?: boolean;
}

const DialogCtx = createContext<RefObject<HTMLDialogElement>>(createRef());

export function Dialog({defaultOpen, children}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (defaultOpen) dialogRef.current?.showModal();
  }, [defaultOpen]);
  return <DialogCtx.Provider value={dialogRef}>{children}</DialogCtx.Provider>;
}

// export function Dialog({defaultOpen, ...props}: DialogProps) {
//   const dialogRef = useRef<HTMLDialogElement>(null);
//   useEffect(() => {
//     if (defaultOpen) dialogRef.current?.showModal();
//   }, [defaultOpen]);
//   return (
//     <dialog
//       ref={dialogRef}
//       p="dialog"
//       onClick={dialogBackdropClick}
//       {...props}
//     />
//   );
// }

// export const Dialog = createSimpleComponent(
//   'Dialog',
//   'dialog',
//   {
//     onClick: dialogBackdropClick,
//   },
//   (el) => {
//     if (el.hasAttribute('defaultopen')) {
//       el.showModal();
//     }
//   },
// );

export function DialogTrigger({children}: JSX.ElementChildrenAttribute) {
  const dialogRef = useContext(DialogCtx);
  const handleClick = () => {
    dialogRef.current?.showModal();
  };
  return applyPropsToChildren(children, {onClick: handleClick});
  // const kids = [children]
  //   .flat(2)
  //   .map((child) => cloneElement(child, {onClick: handleClick}));
  // return kids.length > 1 ? kids : kids[0];
}

// export const DialogTrigger = createSimpleComponent('DialogTrigger', 'button', {
//   onClick(e) {
//     const dialog = (e.currentTarget as HTMLButtonElement).closest('dialog');
//     dialog?.showModal();
//   },
// });

function dialogBackdropClick(this: HTMLDialogElement, e: MouseEvent) {
  if (e.target === this) this.close();
}

interface DialogContentProps
  extends Omit<JSX.IntrinsicElements['dialog'], 'p'> {
  defaultOpen?: boolean;
}

export function DialogContent(props: DialogContentProps) {
  const dialogRef = useContext(DialogCtx);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (props.defaultOpen && dialog) {
      dialog.showModal();
    }
    dialog?.addEventListener('click', dialogBackdropClick);
    return () => {
      dialog?.removeEventListener('click', dialogBackdropClick);
    };
  }, []);
  return <dialog p="dialog-content" {...props} ref={dialogRef} />;
}

// export const DialogContent = createSimpleComponent(
//   'dialog-content',
//   'dialog',
//   {
//     onClick: dialogBackdropClick,
//   },
//   (el) => {
//     if (el.hasAttribute('defaultopen')) {
//       el.showModal();
//     }
//   },
// );

function dialogCloseClick(this: HTMLButtonElement) {
  this.closest('dialog')?.close();
}

export function DialogClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {onClick: dialogCloseClick});
}

// Attach compound components
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;
