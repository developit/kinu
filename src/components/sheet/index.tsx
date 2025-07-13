import {type ComponentChildren} from 'preact';
import {useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {closestFromEvent} from '../../lib/dom';
import './style.css';

export function Sheet({children}: {children: ComponentChildren}) {
  const id = useId();
  return (
    <div p="sheet" pi={id}>
      {children}
    </div>
  );
}

export function SheetTrigger({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {"data-sheet-trigger": ''});
}

export function SheetContent(props: JSX.IntrinsicElements['dialog']) {
  return <dialog p="sheet-content" {...props} />;
}

export function SheetClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {"data-sheet-close": ''});
}

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Close = SheetClose;

addEventListener('click', (e) => {
  const trigger = closestFromEvent<HTMLElement>(e, '[data-sheet-trigger]');
  if (!trigger) return;
  const root = trigger.closest('[p="sheet"]');
  const dialog = root?.querySelector('[p="sheet-content"]') as
    | HTMLDialogElement
    | null;
  dialog?.showModal();
});

addEventListener('click', (e) => {
  const closeEl = closestFromEvent<HTMLElement>(e, '[data-sheet-close]');
  if (!closeEl) return;
  closeEl.closest('dialog')?.close();
});

addEventListener(
  'click',
  (e) => {
    const dialog = closestFromEvent<HTMLDialogElement>(e, '[p="sheet-content"]');
    if (!dialog || e.target !== dialog) return;
    (dialog as HTMLDialogElement).close();
  },
  true,
);
