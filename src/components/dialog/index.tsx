import { h, JSX, createContext } from 'preact';
import { useContext, useRef, useEffect } from 'preact/hooks';
import './style.css';

const DialogContext = createContext<{
  dialogRef: { current: HTMLDialogElement | null };
  open: () => void;
  close: () => void;
} | null>(null);

interface DialogProps extends Omit<JSX.IntrinsicElements['dialog'], 'p'> {
  defaultOpen?: boolean;
}

export function Dialog({ defaultOpen = false, children, ...props }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const open = () => {
    dialogRef.current?.showModal();
  };
  
  const close = () => {
    dialogRef.current?.close();
  };
  
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    if (defaultOpen) {
      dialog.showModal();
    }
    
    // Close on backdrop click
    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        dialog.close();
      }
    };
    
    dialog.addEventListener('click', handleClick);
    
    return () => {
      dialog.removeEventListener('click', handleClick);
    };
  }, [defaultOpen]);
  
  return (
    <DialogContext.Provider value={{ dialogRef, open, close }}>
      <dialog ref={dialogRef} p="dialog" {...props}>
        {children}
      </dialog>
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, ...props }: JSX.IntrinsicElements['button']) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogTrigger must be used within Dialog');
  }
  
  return (
    <button {...props} onClick={context.open}>
      {children}
    </button>
  );
}

export function DialogContent({ children, ...props }: JSX.IntrinsicElements['div']) {
  return (
    <div p="dialog-content" {...props}>
      {children}
    </div>
  );
}

export function DialogClose({ children, ...props }: JSX.IntrinsicElements['button']) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogClose must be used within Dialog');
  }
  
  return (
    <button {...props} onClick={context.close}>
      {children}
    </button>
  );
}

// Attach compound components
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;
