import {type ComponentChildren} from 'preact';
import {useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {closestFromEvent} from '../../lib/dom';
import './style.css';

export function Drawer({children}: {children: ComponentChildren}) {
  const id = useId();
  return (
    <div p="drawer" pi={id}>
      {children}
    </div>
  );
}

export function DrawerTrigger({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {"data-drawer-trigger": ''});
}

export function DrawerContent(props: JSX.IntrinsicElements['dialog']) {
  return <dialog p="drawer-content" {...props} />;
}

export function DrawerClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {"data-drawer-close": ''});
}

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Close = DrawerClose;

addEventListener('click', (e) => {
  const trigger = closestFromEvent<HTMLElement>(e, '[data-drawer-trigger]');
  if (!trigger) return;
  const root = trigger.closest('[p="drawer"]');
  const dialog = root?.querySelector('[p="drawer-content"]') as
    | HTMLDialogElement
    | null;
  dialog?.showModal();
});

addEventListener('click', (e) => {
  const closeEl = closestFromEvent<HTMLElement>(e, '[data-drawer-close]');
  if (!closeEl) return;
  closeEl.closest('dialog')?.close();
});

addEventListener(
  'click',
  (e) => {
    const dialog = closestFromEvent<HTMLDialogElement>(
      e,
      '[p="drawer-content"]',
    );
    if (!dialog || e.target !== dialog) return;
    (dialog as HTMLDialogElement).close();
  },
  true,
);
