import {type ComponentChildren} from 'preact';
import {useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {delegate} from '../../lib/dom';
import './style.css';

export function Popover({children}: {children: ComponentChildren}) {
  const id = useId();
  return (
    <span p="popover" pi={id}>
      {children}
    </span>
  );
}

export function PopoverTrigger({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {p: 'popover-trigger'});
}

addEventListener(
  'click',
  (e: MouseEvent) => {
    const dialogs = new Set(
      Array.from(document.querySelectorAll('[p="popover-content"]')),
    );
    let el = e.target as Node | null;
    while (el) {
      if (el instanceof HTMLElement && dialogs.has(el)) dialogs.delete(el);
      el = el.parentNode;
    }
    for (const dialog of dialogs) (dialog as HTMLDialogElement).close();
  },
  true,
);

export function PopoverContent(props: JSX.IntrinsicElements['dialog']) {
  return <dialog p="popover-content" {...props} />;
}

export function PopoverClose({children}: JSX.ElementChildrenAttribute) {
  return applyPropsToChildren(children, {p: 'popover-close'});
}

delegate('click', 'popover-trigger', (trigger) => {
  const root = trigger.closest('[p="popover"]');
  const dialog = root?.querySelector('[p="popover-content"]') as
    | HTMLDialogElement
    | null;
  dialog?.show();
});

delegate('click', 'popover-close', (btn) => {
  btn.closest('dialog')?.close();
});
