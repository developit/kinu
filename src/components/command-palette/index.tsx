import {type ComponentChildren, createContext} from 'preact';
import {useContext, useId} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {
  installCommands,
  installDialogsDropdowns,
  installMenuShortcuts,
} from '../../lib/commands';
import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function CommandPalette({
  id: idProp,
  children,
}: {
  id?: string;
  children: ComponentChildren;
}) {
  const gen = useId();
  const id = idProp ?? gen;
  return <IdCtx.Provider value={id}>{children}</IdCtx.Provider>;
}

export function CommandPaletteTrigger({
  children,
  ...props
}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  installCommands();
  installDialogsDropdowns();
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
}

export function CommandPaletteContent({
  id,
  ...props
}: JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  installMenuShortcuts();
  return <dialog p="command-palette" id={id ?? ctx} {...props} />;
}

export const CommandPaletteInput = createSimpleComponent(
  'command-palette-input',
  'input',
  {},
  (el: HTMLInputElement) => {
    const dialog = el.closest('dialog[p="command-palette"]')!;
    function filter() {
      const items = dialog.querySelectorAll<HTMLElement>(
        '[p="command-palette-item"]',
      );
      const q = el.value.toLowerCase();
      let first: HTMLElement | undefined;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const text = item.textContent!.toLowerCase();
        let qi = 0;
        for (let j = 0; j < text.length && qi < q.length; j++) {
          if (text.charCodeAt(j) === q.charCodeAt(qi)) qi++;
        }
        const show = qi === q.length;
        item.style.display = show ? '' : 'none';
        item.removeAttribute('selected');
        if (show && !first) first = item;
      }
      first?.toggleAttribute('selected', true);
    }
    el.addEventListener('input', filter);
    return () => el.removeEventListener('input', filter);
  },
);

export const CommandPaletteItem = createSimpleComponent(
  'command-palette-item',
  'button',
  {
    tabIndex: -1,
  },
);

CommandPalette.Trigger = CommandPaletteTrigger;
CommandPalette.Content = CommandPaletteContent;
CommandPalette.Input = CommandPaletteInput;
CommandPalette.Item = CommandPaletteItem;
