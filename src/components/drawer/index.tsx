import {type ComponentChildren} from 'preact';
import {useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {delegate} from '../../lib/dom';
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
  return applyPropsToChildren(children, {p: 'drawer-trigger'});
}

export function DrawerContent(props: JSX.IntrinsicElements['dialog']) {
  return <dialog p="drawer-content" {...props} />;
}

export function DrawerClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {p: 'drawer-close'});
}

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Close = DrawerClose;

delegate('click', 'drawer-trigger', (trigger) => {
  const root = trigger.closest('[p="drawer"]');
  const dialog = root?.querySelector('[p="drawer-content"]') as
    | HTMLDialogElement
    | null;
  dialog?.showModal();
});

delegate('click', 'drawer-close', (btn) => {
  btn.closest('dialog')?.close();
});

delegate<HTMLDialogElement>(
  'click',
  'drawer-content',
  (dialog, e) => {
    if (e.target !== dialog) return;
    dialog.close();
  },
  undefined,
  {capture: true},
);
