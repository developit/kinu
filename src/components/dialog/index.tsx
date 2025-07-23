import {type ComponentChildren} from 'preact';
import {useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {delegate} from '../../lib/dom';
import './style.css';

export function Dialog({children}: {children: ComponentChildren}) {
  const id = useId();
  return (
    <div p="dialog" pi={id}>
      {children}
    </div>
  );
}

export function DialogTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  return applyPropsToChildren(children, {...props, pa: 'dialog-trigger'});
}

export function DialogContent(props: JSX.IntrinsicElements['dialog']) {
  return <dialog p="dialog-content" {...props} />;
}

export function DialogClose({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  return applyPropsToChildren(children, {...props, pa: 'dialog-close'});
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;

delegate('click', 'dialog-trigger', (trigger) => {
  const root = trigger.closest('[pi]');
  const dialog = root?.querySelector('[p="dialog-content"]') as HTMLDialogElement | null;
  dialog?.showModal();
});

delegate('click', 'dialog-close', (btn) => {
  btn.closest('dialog')?.close();
});

delegate<HTMLDialogElement>(
  'mouseup',
  'dialog-content',
  (dialog, e) => {
    if (e.target !== dialog) return;
    const {clientX, clientY} = e as MouseEvent;
    const {left, right, top, bottom} = dialog.getBoundingClientRect();
    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      dialog.close();
    }
  },
  undefined,
  {capture: true},
);
