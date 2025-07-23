import {type ComponentChildren} from 'preact';
import {useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {delegate} from '../../lib/dom';
import './style.css';

export function DropdownMenu({children}: {children: ComponentChildren}) {
  const id = useId();
  return (
    <span p="dropdown" pi={id}>
      {children}
    </span>
  );
}

export function DropdownMenuTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  return applyPropsToChildren(children, {...props, pa: 'dropdown-trigger'});
}

addEventListener(
  'click',
  (e: MouseEvent) => {
    const dialogs = new Set(
      Array.from(document.querySelectorAll('[p="dropdown-content"]')),
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

export function DropdownMenuContent(props: JSX.IntrinsicElements['dialog']) {
  return <dialog p="dropdown-content" {...props} />;
}

export const DropdownMenuItem = createSimpleComponent(
  'dropdown-menu-item',
  'button',
);

delegate('click', 'dropdown-trigger', (trigger) => {
  const root = trigger.closest('[pi]');
  const dialog = root?.querySelector('[p="dropdown-content"]') as HTMLDialogElement | null;
  dialog?.show();
});
