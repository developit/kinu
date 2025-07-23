import {type ComponentChildren} from 'preact';
import {useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {delegate} from '../../lib/dom';
import './style.css';

export function Sheet({children}: {children: ComponentChildren}) {
  const id = useId();
  return (
    <div p="sheet" pi={id}>
      {children}
    </div>
  );
}

export function SheetTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  return applyPropsToChildren(children, {...props, pa: 'sheet-trigger'});
}

export function SheetContent(props: JSX.IntrinsicElements['dialog']) {
  return <dialog p="sheet-content" {...props} />;
}

export function SheetClose({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  return applyPropsToChildren(children, {...props, pa: 'sheet-close'});
}

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Close = SheetClose;

delegate('click', 'sheet-trigger', (trigger) => {
  const root = trigger.closest('[pi]');
  const dialog = root?.querySelector('[p="sheet-content"]') as HTMLDialogElement | null;
  dialog?.showModal();
});

delegate('click', 'sheet-close', (btn) => {
  btn.closest('dialog')?.close();
});

delegate<HTMLDialogElement>(
  'click',
  'sheet-content',
  (dialog, e) => {
    if (e.target !== dialog) return;
    dialog.close();
  },
  undefined,
  {capture: true},
);
