import { h, JSX, createContext } from 'preact';
import { useContext, useRef, useEffect } from 'preact/hooks';
import './style.css';

const DialogContext = createContext<{
  dialogRef: { current: HTMLDialogElement | null };
} | null>(null);

export function Dialog({ children }: { children: JSX.Element | JSX.Element[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <DialogContext.Provider value={{ dialogRef }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, ...props }: JSX.IntrinsicElements['button']) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogTrigger must be used within Dialog');
  }

  return (
    <button
      {...props}
      onClick={() => context.dialogRef.current?.showModal()}
    >
      {children}
    </button>
  );
}

export function DialogContent({
  defaultOpen = false,
  children,
  ...props
}: JSX.IntrinsicElements['dialog'] & { defaultOpen?: boolean }) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogContent must be used within Dialog');
  }

  const { dialogRef } = context;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (defaultOpen) {
      dialog.showModal();
    }

    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleClick);
    return () => dialog.removeEventListener('click', handleClick);
  }, [defaultOpen]);

  return (
    <dialog ref={dialogRef} p="dialog" {...props}>
      <div p="dialog-content">{children}</div>
    </dialog>
  );
}

export function DialogClose({ children, ...props }: JSX.IntrinsicElements['button']) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogClose must be used within Dialog');
  }

  return (
    <button
      {...props}
      onClick={() => context.dialogRef.current?.close()}
    >
      {children}
    </button>
  );
}

// Attach compound components
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;
